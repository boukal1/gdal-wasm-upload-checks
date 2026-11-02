import gdalWasm from '@crossbind/port-gdal-wasm/crossbind.config.js';

// Symbols replaced by src/native/link_wrappers.cpp
const WRAPPED = [
    'GDALAllRegister',
    '_ZN10GDALDriver16DeclareAlgorithmERKNSt3__26vectorINS0_12basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEENS5_IS7_EEEE',
    '_ZN27GDALGlobalAlgorithmRegistry12GetSingletonEv',
];

// GDAL's own data files (DXF, S-57, NITF, ECW tables...) serve none of the reader's drivers: they are not preloaded.
// PROJ's data, with proj.db to identify coordinate systems, is still preloaded through GDAL's PROJ dependency.
const gdalWithoutData = {
    ...gdalWasm,
    targetSpecs: gdalWasm.targetSpecs.map(({ specs, ...filter }) => {
        const { data, ...otherSpecs } = specs ?? {};
        return { ...filter, specs: otherSpecs };
    }),
};

/**
 * Build configuration of the GDAL WebAssembly module that reads uploaded vector data in the browser.
 * Runtime options (worker, filesystem) are passed to initNative() by the Angular library, not here.
 */
export default {
    general: { name: 'gdal-reader' },
    dependencies: [gdalWithoutData],
    paths: { config: import.meta.url },
    targetSpecs: [
        {
            platform: 'wasm',
            specs: {
                // Single-threaded build: the GeoPackage driver must not start threads of its own
                env: { OGR_GPKG_NUM_THREADS: '1', SPATIALITE_LOAD: 'FALSE' },
                binary: { emccFlags: ['-Oz', ...WRAPPED.map((symbol) => `-Wl,--wrap=${symbol}`)] },
            },
        },
    ],
};
