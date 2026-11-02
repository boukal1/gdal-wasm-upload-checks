// Copies the built GDAL module (loader, WebAssembly, GDAL/PROJ data) into the Angular library assets.
import { copyFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const buildDir = new URL('../.crossbind/build/', import.meta.url);
const targetDir = new URL('../../angular/projects/gdal-reader/assets/gdal/', import.meta.url);

mkdirSync(targetDir, { recursive: true });
const artifacts = readdirSync(buildDir).filter((name) => /\.browser\.(js|wasm|data\.txt)$/.test(name));
if (artifacts.length !== 3) {
    throw new Error(`Expected 3 browser artifacts in ${buildDir.pathname}, found: ${artifacts.join(', ')}`);
}
for (const name of artifacts) {
    copyFileSync(new URL(name, buildDir), new URL(name, targetDir));
    console.log(`copied ${join('assets/gdal', name)}`);
}
