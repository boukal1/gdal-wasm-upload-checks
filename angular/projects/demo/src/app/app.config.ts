import { ApplicationConfig } from '@angular/core';
import { provideGdalReader } from 'gdal-wasm-reader';

/** PoC switch: ?copy=1 copies each uploaded file into the worker memory instead of reading it in place. */
const copyFiles = new URLSearchParams(location.search).get('copy') === '1';

export const appConfig: ApplicationConfig = {
  providers: [provideGdalReader({ copyFiles })],
};
