// Streams synthetic Kanten in LV95 as CSV with a WKT geometry column, for the measurement series.
// Every 500th line has all Z at 0, every 1000th is an arc (CompoundCurve), every 2000th a multipart.
// Usage: node generate-measure-csv.mjs <output.csv> <count>
import { createWriteStream, writeFileSync } from 'node:fs';
import { once } from 'node:events';

const [output, countArg] = process.argv.slice(2);
const count = Number(countArg);
if (!output || !Number.isInteger(count) || count < 1) {
    throw new Error('Usage: node generate-measure-csv.mjs <output.csv> <count>');
}

// Deterministic pseudo-random generator, so every run produces the same data
let seed = 7;
const random = () => ((seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296);
const hex = (length) => Array.from({ length }, () => ((random() * 16) | 0).toString(16)).join('');
const round = (value) => Math.round(value * 1000) / 1000;

const walk = (vertexCount, flat) => {
    let e = 2490000 + random() * 330000;
    let n = 1080000 + random() * 200000;
    let z = 400 + random() * 800;
    const points = [];
    for (let i = 0; i < vertexCount; i++) {
        points.push(`${round(e)} ${round(n)} ${flat ? 0 : round(z)}`);
        e += (random() - 0.3) * 150;
        n += (random() - 0.3) * 150;
        z += (random() - 0.5) * 5;
    }
    return points;
};

const geometry = (i) => {
    if (i % 2000 === 2) {
        return `MULTILINESTRING Z ((${walk(4, false).join(',')}),(${walk(4, false).join(',')}))`;
    }
    const line = walk(3 + Math.floor(random() * 8), i % 500 === 0);
    if (i % 1000 === 1) {
        // Arc through the first three vertices, followed by the rest of the line
        return `COMPOUNDCURVE Z (CIRCULARSTRING Z (${line.slice(0, 3).join(',')}),(${line.slice(2).join(',')}))`;
    }
    return `LINESTRING Z (${line.join(',')})`;
};

writeFileSync(output.replace(/\.csv$/, '.csvt'), '"WKT","String","String","Integer","Real","Date","Integer64"');
const stream = createWriteStream(output);
stream.write('WKT,uuid,name,typ,laenge,gueltig_ab,anzahl\n');
for (let i = 1; i <= count; i++) {
    const uuid = `${hex(8)}-${hex(4)}-4${hex(3)}-a${hex(3)}-${hex(12)}`;
    const date = `20${10 + Math.floor(random() * 15)}-0${1 + Math.floor(random() * 9)}-1${Math.floor(random() * 9)}`;
    const line = `"${geometry(i)}",${uuid},Strasse ${i},${1 + Math.floor(random() * 5)},${round(random() * 1000)},${date},${5000000000 + i}\n`;
    if (!stream.write(line)) {
        await once(stream, 'drain');
    }
}
stream.end();
await once(stream, 'finish');
console.log(`${count} Kanten -> ${output}`);
