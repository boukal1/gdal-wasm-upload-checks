// Generates synthetic Fachdaten in LV95 around Bern: Kanten (lines) and Knoten (points) as GeoJSON.
// Usage: node generate-geojson.mjs <outputDir> <lineCount> [prefix]
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const [outputDir, countArg, prefix = ''] = process.argv.slice(2);
const lineCount = Number(countArg ?? 20);
if (!outputDir || !Number.isInteger(lineCount) || lineCount < 3) {
    throw new Error('Usage: node generate-geojson.mjs <outputDir> <lineCount >= 3> [prefix]');
}

// Deterministic pseudo-random generator, so every run produces the same data
let seed = 42;
const random = () => ((seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296);
const uuid = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => ((c === 'x' ? random() * 16 : (random() * 4) + 8) | 0).toString(16));

const walk = (vertexCount) => {
    let e = 2590000 + random() * 20000;
    let n = 1190000 + random() * 20000;
    const coordinates = [];
    for (let i = 0; i < vertexCount; i++) {
        coordinates.push([Math.round(e * 100) / 100, Math.round(n * 100) / 100]);
        e += (random() - 0.3) * 150;
        n += (random() - 0.3) * 150;
    }
    return coordinates;
};

const kanten = [];
const knoten = [];
for (let i = 1; i <= lineCount; i++) {
    const line = walk(3 + Math.floor(random() * 8));
    // Feature 2 is a real multipart, feature 3 has a NULL geometry: both are rejected by the upload checks
    const geometry = i === 2 ? { type: 'MultiLineString', coordinates: [line, walk(4)] } : i === 3 ? null : { type: 'LineString', coordinates: line };
    kanten.push({
        type: 'Feature',
        properties: {
            uuid: uuid(),
            name: `Strasse ${i}`,
            typ: 1 + Math.floor(random() * 5),
            laenge: Math.round(random() * 100000) / 100,
            gueltig_ab: `20${10 + Math.floor(random() * 15)}-0${1 + Math.floor(random() * 9)}-1${Math.floor(random() * 9)}`,
            erfasst: `2025-0${1 + Math.floor(random() * 9)}-1${Math.floor(random() * 9)}T08:30:00`,
            anzahl: 5000000000 + i,
        },
        geometry,
    });
    if (geometry?.type === 'LineString') {
        knoten.push({ type: 'Feature', properties: { uuid: uuid(), kante: i }, geometry: { type: 'Point', coordinates: line[0] } });
    }
}

mkdirSync(outputDir, { recursive: true });
const write = (name, features) =>
    writeFileSync(join(outputDir, `${prefix}${name}.geojson`), JSON.stringify({ type: 'FeatureCollection', name, features }));
write('kanten', kanten);
write('knoten', knoten);
console.log(`${kanten.length} Kanten, ${knoten.length} Knoten -> ${outputDir}`);
