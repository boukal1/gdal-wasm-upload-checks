// Writes the test cases of the upload checks as CSV with a WKT geometry column, in LV95 around Bern:
// fehler.csv triggers each check on a known feature (FID = line number), ok.csv passes every check.
// Usage: node generate-check-cases.mjs <outputDir>
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const [outputDir] = process.argv.slice(2);
if (!outputDir) {
    throw new Error('Usage: node generate-check-cases.mjs <outputDir>');
}

// Line of 4 vertices starting at (e, n), with the given Z and M per vertex (M null: line without M)
const line = (e, n, z, m) => {
    const points = [0, 1, 2, 3].map((i) => {
        const zValue = Array.isArray(z) ? z[i] : z;
        const coordinates = `${e + i * 40} ${n + i * 25} ${zValue}`;
        return m ? `${coordinates} ${m[i]}` : coordinates;
    });
    return `LINESTRING ${m ? 'ZM' : 'Z'} (${points.join(',')})`;
};
const steady = [0, 10, 20, 30];
const uuid = (i) => `00000000-0000-4000-a000-${String(i).padStart(12, '0')}`;

const longName = 'ein_sehr_langer_feldname_der_mehr_als_zweiundfuenfzig_zeichen_lang_ist';
const errorCases = [
    ['OK', line(2600000, 1200000, 550, steady)],
    ['OK', line(2600200, 1200000, 560, steady)],
    ['11 Multipart', `MULTILINESTRING ZM ((2600400 1200000 550 0,2600440 1200025 551 10),(2600500 1200100 552 0,2600540 1200125 553 10))`],
    ['6 NULL-Geometrie', ''],
    ['1P Linie mit einem Punkt', 'LINESTRING ZM (2600800 1200000 550 0)'],
    ['GV Länge 0', 'LINESTRING ZM (2601000 1200000 550 0,2601000 1200000 550 10)'],
    ['SL Schleife', 'LINESTRING ZM (2601200 1200000 550 0,2601260 1200000 551 10,2601230 1200050 552 20,2601200 1200000 550 30)'],
    ['KB Kreisbogen', 'COMPOUNDCURVE ZM (CIRCULARSTRING ZM (2601400 1200000 550 0,2601450 1200050 551 10,2601500 1200000 552 20),(2601500 1200000 552 20,2601560 1200000 553 30))'],
    ['Z gleich 0', line(2601600, 1200000, 0, steady)],
    ['Z 5000 m', line(2601800, 1200000, 5000, steady)],
    ['OK M fallend', line(2602000, 1200000, 570, [30, 20, 10, 0])],
    ['15 M steigt und fällt', line(2602200, 1200000, 570, [0, 20, 10, 30])],
    ['16 M zweimal gleich', line(2602400, 1200000, 570, [0, 10, 10, 30])],
    ['14 M nicht numerisch', line(2602600, 1200000, 570, [0, 'nan', 20, 30])],
    ['13 ohne M', line(2602800, 1200000, 570, null)],
    ['12 UUID doppelt (wie FID 1)', line(2603000, 1200000, 570, steady)],
    ['12 UUID leer', line(2603200, 1200000, 570, steady)],
    ['7 Punkt statt Linie', 'POINT ZM (2603400 1200000 570 0)'],
    ['8 ausserhalb der Schweiz', line(2900000, 1200000, 570, steady)],
    ['GV korrupt (Blob nach dem Erzeugen ersetzt)', line(2603600, 1200000, 570, steady)],
];

const csv = (rows) => rows.map((row) => row.map((value) => (/[",]/.test(String(value)) ? `"${String(value).replaceAll('"', '""')}"` : value)).join(',')).join('\n') + '\n';

mkdirSync(outputDir, { recursive: true });
const errorRows = errorCases.map(([label, wkt], index) => {
    const fid = index + 1;
    const id = fid === 16 ? uuid(1) : fid === 17 ? '' : uuid(fid);
    return [wkt, id, label, 'x', fid, 'y', 'z'];
});
writeFileSync(join(outputDir, 'fehler.csv'), csv([['WKT', 'uuid', 'name', '_intern', '1_feld', 'strassen-name', longName], ...errorRows]));
writeFileSync(join(outputDir, 'fehler.csvt'), '"WKT","String","String","String","Integer","String","String"');

const okRows = Array.from({ length: 10 }, (_, i) => [line(2600000 + i * 200, 1201000, 550 + i, steady), uuid(i + 1), `Strasse ${i + 1}`, i + 1]);
writeFileSync(join(outputDir, 'ok.csv'), csv([['WKT', 'uuid', 'name', 'typ'], ...okRows]));
writeFileSync(join(outputDir, 'ok.csvt'), '"WKT","String","String","Integer"');
console.log(`${errorRows.length} Prüffälle, ${okRows.length} fehlerfreie Kanten -> ${outputDir}`);
