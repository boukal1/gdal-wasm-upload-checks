import { Injectable, inject } from '@angular/core';

import { GdalCheckContext, SWISS_BBOX_LV95 } from './gdal-checks';
import { GDAL_READER_CONFIG } from './gdal-reader.config';
import { GdalDataset, GdalFeature, GdalLayer, GdalLayerCheck, GdalReaderError } from './gdal-reader.models';
import { GDAL_LOADER_FILE, InitNative, NativeGdalModule, NativeGdalReader, OgrInfoLayer, OgrInfoReport } from './gdal-runtime.model';

/** GDAL file system reading the browser files in place (gdal-wasm/src/native/blob_file_system.cpp). */
const BLOB_PREFIX = '/vsiblob/';

/** GDAL runtime once loaded: the crossbind module and the native reader instance. */
interface GdalRuntime {
  module: NativeGdalModule;
  reader: NativeGdalReader;
}

/**
 * Reads uploaded vector data (zipped FileGDB, GeoPackage, Shapefile or GeoJSON) in the browser with GDAL compiled
 * to WebAssembly. GDAL runs in a Web Worker, is downloaded on first use only, and reads the files in place.
 *
 * @author boukal1
 * @since 0.0.1
 */
@Injectable({ providedIn: 'root' })
export class GdalReaderService {
  /** Where the GDAL files are served. */
  private readonly config = inject(GDAL_READER_CONFIG);

  /** GDAL runtime, loaded on the first call and shared afterwards. */
  private runtime?: Promise<GdalRuntime>;

  /** Path of each opened file inside GDAL (/vsiblob/... or a copy), to release it on close. */
  private readonly mountedPaths = new Map<GdalDataset, string>();

  /**
   * Downloads and starts GDAL ahead of the first read, e.g. when the upload page opens.
   *
   * @returns once GDAL is ready
   * @throws GdalReaderError if the GDAL files cannot be loaded
   */
  public async preload(): Promise<void> {
    await this.load();
  }

  /**
   * @returns the GDAL release name, e.g. "3.13.3"
   * @throws GdalReaderError if the GDAL files cannot be loaded
   */
  public async version(): Promise<string> {
    const { reader } = await this.load();
    return reader.version();
  }

  /**
   * Opens an uploaded file and describes its layers.
   *
   * @param file a ZIP containing a .gdb folder, a .gpkg, Shapefiles or a .geojson; or a .gpkg / .geojson file
   * @returns the dataset with the schema of each layer
   * @throws GdalReaderError if the file contains no supported dataset or GDAL cannot read it
   */
  public async open(file: File): Promise<GdalDataset> {
    const { module, reader } = await this.load();
    const mountedPath = await this.mount(module, file);
    try {
      const path = await this.resolveDatasetPath(reader, mountedPath, file.name);
      const report = this.parse<OgrInfoReport>(await this.call(() => reader.info(path)));
      const dataset: GdalDataset = {
        fileName: file.name,
        path,
        driver: report.driverShortName ?? '',
        layers: (report.layers ?? []).map((layer) => this.toLayer(layer)),
      };
      this.mountedPaths.set(dataset, mountedPath);
      return dataset;
    } catch (error) {
      await this.unlink(module, mountedPath);
      throw error;
    }
  }

  /**
   * Reads the first features of a layer.
   *
   * @param dataset dataset returned by open()
   * @param layerName name of the layer to read
   * @param limit maximum number of features returned
   * @returns the features, empty if the layer has none
   * @throws GdalReaderError if GDAL cannot read the layer
   */
  public async readFeatures(dataset: GdalDataset, layerName: string, limit = 10): Promise<GdalFeature[]> {
    const { reader } = await this.load();
    const report = this.parse<OgrInfoReport>(await this.call(() => reader.features(dataset.path, layerName, limit)));
    const layer = report.layers?.find((candidate) => candidate.name === layerName);
    return (layer?.features ?? []).map((feature) => ({
      fid: feature.fid ?? -1,
      properties: feature.properties ?? {},
      geometryType: feature.geometry?.type ?? null,
      partCount: this.countParts(feature.geometry),
    }));
  }

  /**
   * Reads every feature of a layer once and counts what the upload checks look at (see evaluateGeometryChecks()).
   *
   * @param dataset dataset returned by open()
   * @param layerName name of the layer to read
   * @param context choices of the user: Z range, filter box, UUID field
   * @returns the counters of the layer
   * @throws GdalReaderError if GDAL cannot open the layer
   */
  public async check(dataset: GdalDataset, layerName: string, context: GdalCheckContext): Promise<GdalLayerCheck> {
    const { reader } = await this.load();
    const options = {
      zLow: context.zRange[0],
      zHigh: context.zRange[1],
      swissBbox: SWISS_BBOX_LV95,
      ...(context.filterBbox ? { filterBbox: context.filterBbox } : {}),
      uuidField: context.uuidField ?? '',
      selfIntersections: context.checkSelfIntersections ?? true,
    };
    return this.parse<GdalLayerCheck>(await this.call(() => reader.check(dataset.path, layerName, JSON.stringify(options))));
  }

  /**
   * Returns the Z range of a layer if the format stores it in its header, without reading the features.
   *
   * @param dataset dataset returned by open()
   * @param layerName name of the layer
   * @returns the lowest and highest Z, or null if the format needs a full read (see check())
   * @throws GdalReaderError if GDAL cannot open the layer
   */
  public async headerZRange(dataset: GdalDataset, layerName: string): Promise<{ zMin: number; zMax: number } | null> {
    const { reader } = await this.load();
    return this.parse<{ zMin: number; zMax: number } | null>(await this.call(() => reader.headerZRange(dataset.path, layerName)));
  }

  /**
   * Frees the copy of the uploaded file kept by GDAL; the dataset cannot be read afterwards.
   *
   * @param dataset dataset returned by open(), ignored if already closed
   */
  public async close(dataset: GdalDataset): Promise<void> {
    const mountedPath = this.mountedPaths.get(dataset);
    if (mountedPath && this.runtime) {
      this.mountedPaths.delete(dataset);
      await this.unlink((await this.runtime).module, mountedPath);
    }
  }

  /**
   * Loads the crossbind loader script once, then starts GDAL in a Web Worker.
   */
  private load(): Promise<GdalRuntime> {
    this.runtime ??= (async () => {
      const baseUrl = new URL(this.config.assetsPath.replace(/\/?$/, '/'), document.baseURI).href;
      try {
        await this.loadScript(baseUrl + GDAL_LOADER_FILE);
        const initNative = (globalThis as unknown as { initNative?: InitNative }).initNative;
        if (!initNative) {
          throw new Error('initNative is not defined by ' + GDAL_LOADER_FILE);
        }
        const module = await initNative({ path: baseUrl, useWorker: true, logHandler: () => undefined });
        return { module, reader: await new module.GdalReader() };
      } catch (error) {
        this.runtime = undefined;
        throw new GdalReaderError('GDAL could not be loaded', error);
      }
    })();
    return this.runtime;
  }

  /**
   * Adds the loader as a classic script, as required by its UMD format.
   */
  private loadScript(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.onload = (): void => resolve();
      script.onerror = (): void => reject(new Error('Unable to load ' + url));
      document.head.appendChild(script);
    });
  }

  /**
   * Finds the dataset inside the uploaded file: the .gdb folder, the .gpkg, the folder of the Shapefiles or the GeoJSON.
   */
  private async resolveDatasetPath(reader: NativeGdalReader, mountedPath: string, fileName: string): Promise<string> {
    const lowerName = fileName.toLowerCase();
    if (/\.(gpkg|geojson|json)$/.test(lowerName)) {
      return mountedPath;
    }
    if (!lowerName.endsWith('.zip')) {
      throw new GdalReaderError('Unsupported file type: ' + fileName);
    }

    const zipPath = '/vsizip/' + mountedPath;
    const entries = (await this.call(() => reader.listFiles(zipPath))).split('\n').filter((entry) => entry.length > 0);
    const gdbFolder = entries
      .map((entry) => entry.split('/'))
      .map((parts) => parts.slice(0, parts.findIndex((part) => part.toLowerCase().endsWith('.gdb')) + 1))
      .find((parts) => parts.length > 0);
    if (gdbFolder) {
      return `${zipPath}/${gdbFolder.join('/')}`;
    }
    const geoPackage = entries.find((entry) => entry.toLowerCase().endsWith('.gpkg'));
    if (geoPackage) {
      return `${zipPath}/${geoPackage}`;
    }
    const shapefile = entries.find((entry) => entry.toLowerCase().endsWith('.shp'));
    if (shapefile) {
      const folder = shapefile.substring(0, shapefile.lastIndexOf('/') + 1).replace(/\/$/, '');
      return folder ? `${zipPath}/${folder}` : zipPath;
    }
    const geoJson = entries.find((entry) => /\.(geojson|json)$/.test(entry.toLowerCase()));
    if (geoJson) {
      return `${zipPath}/${geoJson}`;
    }
    throw new GdalReaderError('The ZIP file contains no FileGDB, GeoPackage, Shapefile or GeoJSON: ' + fileName);
  }

  /**
   * Maps an ogrinfo layer to the library model.
   */
  private toLayer(layer: OgrInfoLayer): GdalLayer {
    const geometry = layer.geometryFields?.[0];
    const projJson = geometry?.coordinateSystem?.projjson;
    const extent = geometry?.extent;
    return {
      name: layer.name,
      featureCount: layer.featureCount ?? -1,
      geometryType: geometry?.type ?? null,
      crs: projJson?.id?.authority ? `${projJson.id.authority}:${projJson.id.code}` : (projJson?.name ?? null),
      extent: extent?.length === 4 ? [extent[0], extent[1], extent[2], extent[3]] : null,
      fields: (layer.fields ?? []).map(({ name, type, subType, width }) => ({ name, type, subType, width })),
    };
  }

  /**
   * Counts the parts of a GeoJSON geometry: members of a multi geometry or collection, 1 otherwise, 0 if NULL.
   */
  private countParts(geometry: { type?: string; coordinates?: unknown[]; geometries?: unknown[] } | null | undefined): number {
    if (!geometry?.type) {
      return 0;
    }
    if (geometry.type === 'GeometryCollection') {
      return geometry.geometries?.length ?? 0;
    }
    return geometry.type.startsWith('Multi') ? (geometry.coordinates?.length ?? 0) : 1;
  }

  /**
   * Runs a native call and turns a GDAL failure into a GdalReaderError carrying GDAL's message.
   */
  private async call<T>(nativeCall: () => Promise<T>): Promise<T> {
    try {
      return await nativeCall();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new GdalReaderError(message.replace(/^std::runtime_error:\s*/, ''), error);
    }
  }

  /**
   * Parses a JSON report of the native reader.
   */
  private parse<T>(json: string): T {
    try {
      return JSON.parse(json) as T;
    } catch (error) {
      throw new GdalReaderError('GDAL returned an unreadable report', error);
    }
  }

  /**
   * Makes the file readable by GDAL: handed in place to /vsiblob/ (default), or copied into the worker memory.
   */
  private async mount(module: NativeGdalModule, file: File): Promise<string> {
    if (this.config.copyFiles) {
      const [copiedPath] = await module.autoMountFiles([file]);
      return copiedPath;
    }
    const key = `${crypto.randomUUID()}/${file.name}`;
    await module.registerBlob(key, file);
    return BLOB_PREFIX + key;
  }

  /**
   * Releases a file made readable by mount(); a failure only leaves it in memory, so it is logged and not rethrown.
   */
  private async unlink(module: NativeGdalModule, mountedPath: string): Promise<void> {
    try {
      if (mountedPath.startsWith(BLOB_PREFIX)) {
        await module.releaseBlob(mountedPath.substring(BLOB_PREFIX.length));
      } else {
        await module.FS.unlink(mountedPath);
      }
    } catch (error) {
      console.warn('GdalReaderService: unable to release ' + mountedPath, error);
    }
  }
}
