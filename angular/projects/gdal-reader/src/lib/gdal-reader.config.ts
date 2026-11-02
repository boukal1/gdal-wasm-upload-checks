import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';

/**
 * Where the application serves the GDAL WebAssembly files shipped in this library's assets/gdal folder.
 *
 * @author boukal1
 * @since 0.0.1
 */
export interface GdalReaderConfig {
  /** Folder of the GDAL files, relative to the document base URL (base-href) or absolute. */
  assetsPath: string;
  /** Copies each uploaded file into the worker memory instead of reading it in place (limited to about 1 GB). */
  copyFiles: boolean;
}

/** Default configuration: the application copies assets/gdal of the library to its own assets/gdal. */
export const DEFAULT_GDAL_READER_CONFIG: GdalReaderConfig = { assetsPath: 'assets/gdal', copyFiles: false };

/** Injection token of the GDAL reader configuration. */
export const GDAL_READER_CONFIG = new InjectionToken<GdalReaderConfig>('GDAL_READER_CONFIG', {
  providedIn: 'root',
  factory: () => DEFAULT_GDAL_READER_CONFIG,
});

/**
 * Overrides the GDAL reader configuration (application or NgModule providers).
 *
 * @param config where the GDAL files are served
 * @returns the providers to register
 */
export function provideGdalReader(config: Partial<GdalReaderConfig>): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: GDAL_READER_CONFIG, useValue: { ...DEFAULT_GDAL_READER_CONFIG, ...config } }]);
}
