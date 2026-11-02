/**
 * Typings of the crossbind GDAL module (internal, not exported by the library).
 * In a browser the module runs in a Web Worker, so every native call returns a promise.
 *
 * @author boukal1
 * @since 0.0.1
 */

/** File name of the crossbind loader, also used as worker script. */
export const GDAL_LOADER_FILE = 'gdal-reader-wasm-wasm32-st-release.browser.js';

/** The C++ GdalReader class of gdal-wasm/src/native/gdal_reader.h, seen through the worker proxy. */
export interface NativeGdalReader {
  version(): Promise<string>;
  listFiles(path: string): Promise<string>;
  info(path: string): Promise<string>;
  features(path: string, layer: string, limit: number): Promise<string>;
  check(path: string, layer: string, optionsJson: string): Promise<string>;
  headerZRange(path: string, layer: string): Promise<string>;
}

/** The crossbind module returned by initNative(). */
export interface NativeGdalModule {
  /** Constructing the native class is asynchronous too: `await new module.GdalReader()`. */
  GdalReader: new () => Promise<NativeGdalReader>;
  /** Copies browser files into the module filesystem and returns their paths. */
  autoMountFiles(files: File[]): Promise<string[]>;
  /** Hands a file to the /vsiblob/ file system without copying it; GDAL then reads /vsiblob/<key>. Returns its size. */
  registerBlob(key: string, file: File): Promise<number>;
  /** Forgets a file handed with registerBlob(). */
  releaseBlob(key: string): Promise<boolean>;
  /** Emscripten filesystem, used to release mounted files. */
  FS: { unlink(path: string): Promise<void> };
}

/** Runtime options of initNative() used by the library. */
export interface InitNativeOptions {
  /** Base URL of the loader, WebAssembly and data files. */
  path: string;
  useWorker: boolean;
  logHandler?: (text: string) => void;
}

/** Global function defined by the crossbind UMD loader. */
export type InitNative = (options: InitNativeOptions) => Promise<NativeGdalModule>;

/** Subset of the `ogrinfo -json` report read by the library. */
export interface OgrInfoReport {
  driverShortName?: string;
  layers?: OgrInfoLayer[];
}

/** One layer of the `ogrinfo -json` report. */
export interface OgrInfoLayer {
  name: string;
  featureCount?: number;
  geometryFields?: {
    type?: string;
    extent?: number[];
    coordinateSystem?: { projjson?: { name?: string; id?: { authority?: string; code?: number | string } } };
  }[];
  fields?: { name: string; type: string; subType?: string; width?: number }[];
  features?: {
    fid?: number;
    properties?: Record<string, unknown>;
    geometry?: { type?: string; coordinates?: unknown[]; geometries?: unknown[] } | null;
  }[];
}
