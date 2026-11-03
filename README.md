# GDAL in the browser: upload checks for vector data

![GDAL 3.13.3](https://img.shields.io/badge/GDAL-3.13.3-blue)
![Angular 17.3](https://img.shields.io/badge/Angular-17.3-red)
![crossbind 2.0.0-beta.68](https://img.shields.io/badge/crossbind-2.0.0--beta.68-orange)

GDAL 3.13.3 compiled to WebAssembly and wrapped in an Angular library. It reads a zipped Esri FileGDB, GeoPackage,
Shapefile or GeoJSON **in the browser**, lists its layers and fields, and runs a list of upload checks over every
feature in one pass. The file is never uploaded: GDAL runs in a Web Worker and reads it in place.

**Demo:** https://boukal1.github.io/gdal-wasm-upload-checks/ (user interface in German)

- [Highlights](#highlights)
- [Repository layout](#repository-layout)
- [Build](#build)
- [Using the library](#using-the-library)
- [Checks](#checks)
- [Measurements](#measurements)
- [Limitations](#limitations)
- [Licenses](#licenses)

## Highlights

- Reads FileGDB tables with the ArcGIS Pro 3.2 field types (`DateOnly`, `BigInteger`), which older readers based on
  the Esri File Geodatabase API reject.
- Reads the file in place, piece by piece (`File.slice()` + `FileReaderSync` behind a GDAL virtual file system
  `/vsiblob/`): zipped files of 1 GB work, the page stays at about 13 MB of memory.
- One pass over the features runs every geometry check, with the FID of the first offending feature per check.
- Slim module: only the OpenFileGDB, GPKG, Shapefile and GeoJSON drivers, no `gdal` command-line framework, no curl,
  OpenSSL, SpatiaLite or raster codecs. 13.9 MB of WebAssembly + 10.7 MB of PROJ data (`proj.db`), about 4.9 MB with
  Brotli, downloaded once.
- Single-threaded build: no COOP/COEP headers needed, works on any static host (GitHub Pages included).

## Repository layout

| Folder | Content |
| --- | --- |
| `gdal-wasm/` | Build of the GDAL module with [crossbind](https://crossbind.dev): `src/native/gdal_reader.h` (schema, features, header Z range), `src/native/upload_checks.cpp` (one pass over the features), `src/native/blob_file_system.cpp` (`/vsiblob/`), `src/native/link_wrappers.cpp` (link-time replacements that keep unused drivers out), `crossbind.config.js`, `crossbind.overrides.js`. |
| `angular/projects/gdal-reader/` | Angular library `gdal-wasm-reader`: `GdalReaderService`, check rules (`gdal-checks.ts`), models. Ships the GDAL files in `assets/gdal/`. |
| `angular/projects/demo/` | Demo page: load a file, layers with schema, coordinate system and feature count, the checks of the selected layer (one row per check), the first 10 features. `?messreihe=1` shows a measurement series for several files. |
| `testdata/scripts/` | Scripts generating test data with the official GDAL 3.13.3 Docker image: functional data, check cases (one feature per check), measurement series from 1 to 1000 MB. |
| `.github/workflows/pages.yml` | Builds the demo and publishes it on GitHub Pages. |

## Build

GDAL module (only after a GDAL update or a change of the C++ code; needs Docker, Node 24 is installed locally by npm):

```bash
cd gdal-wasm
npm ci
npm run build
```

The build copies `.js`, `.wasm` and `.data.txt` to `angular/projects/gdal-reader/assets/gdal/`, where they are committed.
crossbind does not always notice a changed method body in `src/native/*.h`: delete `.crossbind/build/Bridge-Release`
and `.crossbind/build/bridge` before building in that case.

Library and demo (Node 22):

```bash
cd angular
npm ci
npx ng build gdal-reader
npx ng serve demo --port 4310
```

Test data (Docker): `pwsh testdata/scripts/build-check-cases.ps1`, `build-testdata.ps1`, `build-measure-data.ps1`.

## Using the library

1. Add the GDAL files to the application assets in `angular.json`:
   `{ "glob": "**/*", "input": "<path to the library>/assets/gdal", "output": "assets/gdal" }`.
2. Inject `GdalReaderService` (`providedIn: 'root'`, works with NgModules and standalone components);
   `provideGdalReader({ assetsPath })` if the files are served elsewhere. Paths are resolved against the base href.
3. Serve `.wasm` as `application/wasm`.

```typescript
const dataset = await gdal.open(file);                       // GdalDataset: driver, layers, fields, CRS, extent
const layer = dataset.layers[0];
const context: GdalCheckContext = { fachnetzType: 'Kanten', zRange: [180, 3900], filterBbox: null, uuidField: 'uuid' };
const fieldResults = checkFieldNames(layer);                  // instant, from the schema
const counters = await gdal.check(dataset, layer.name, context); // one pass over every feature
const results = [...fieldResults, ...evaluateGeometryChecks(layer, counters, context)];
await gdal.close(dataset);
```

Other methods: `readFeatures(dataset, layer, limit)`, `headerZRange(dataset, layer)` (Z range from the FileGDB or
Shapefile header, without reading the features).

## Checks

Network types: `Kanten` (lines), `Knoten` and `Punkte` (points), `Flaechen` (polygons). Coordinates in LV95
(EPSG:2056); bounding boxes are compared in the coordinate system of the data.

| Id | Check | Result |
| --- | --- | --- |
| 3 | Field name of 53 characters or more | error |
| 4 | Field name with characters other than `A-Z a-z 0-9 _` | error |
| 5 | Field name starting with `_` or a digit | error |
| 6 | NULL geometries | error if all, warning otherwise |
| 7 | Geometry type does not match the network type | error |
| 8 | No feature inside the Swiss bounding box | error if none, warning if some outside |
| 10 | No feature inside the filter bounding box | as 8 |
| 11 | Aggregate or multipart with several parts (not for polygons) | error |
| 12 | Duplicate UUID | error; empty UUID: warning |
| 13 | M values on only some of the lines | error |
| 14 | M values NaN or infinite | error |
| 15 | M values rising and falling along a line | error |
| 16 | Two equal consecutive M values | error |
| GV | Degenerate (zero length or area, flat arc, ring with fewer than 4 points), NaN or infinite coordinate, unreadable | error |
| 1P | Line with a single vertex | error |
| Z | Z outside a plausible range (180-3900 m by default) | error |
| KB | Arcs | error |
| SL | Loop (start point = end point) | warning |
| SÜ | Self-intersection in 2D (GEOS `isSimple`, can be switched off) | warning |
| DP | Two equal consecutive vertices | warning |

## Measurements

Synthetic data (random lines in LV95 with Z, arcs, multiparts), one source converted with ogr2ogr; Chrome on an Intel
i7-1280P, 32 GB RAM, Windows 11, window in the foreground, file read in place.

| Zipped file | Features | Schema | All checks without self-intersections | with self-intersections |
| --- | ---: | ---: | ---: | ---: |
| FileGDB 100 MB | 766'753 | 0.1 s | 2.7 s | 3.9 s |
| Shapefile 100 MB | 653'031 | 0.1 s | 2.6 s | 4.0 s |
| GeoJSON 100 MB | 727'378 | 5 s | 11.8 s | 11.8 s |
| FileGDB 1000 MB | 7'667'533 | 0.4 s | 26 s | 38 s |
| Shapefile 1000 MB | 6'530'310 | 1.2 s | 26 s | 40 s |

- The time depends on the number of vertices (about 2 million per second for FileGDB and Shapefile).
- GeoJSON has no schema in a header: GDAL parses everything, even for the schema.
- Background windows are throttled by the operating system and the browser (about 2.5 times slower).
- Copying the file into the WebAssembly memory instead of reading it in place fails at 1 GB (2 GB memory limit).

## Limitations

- crossbind 2.0 is a beta; versions are pinned and the built files are self-contained. Leaving GDAL's own data files
  out of the module filters the GDAL dependency in `crossbind.config.js`, which is not a documented crossbind option.
- The first-features table shows an arc as NULL: GDAL's JSON output (GeoJSON) has no arcs. The arc check finds it.
- A NaN coordinate produces GDAL warnings in the browser console.
- The check messages are in German.

## Licenses

The code of this repository is under the [MIT license](LICENSE). The libraries linked into the WebAssembly module and their licenses (GDAL and PROJ MIT, GEOS and libiconv
LGPL-2.1, ...) are listed in [THIRD_PARTY_LICENSES](THIRD_PARTY_LICENSES/README.md).
