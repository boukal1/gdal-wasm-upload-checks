import { Component, OnInit, inject, signal } from '@angular/core';
import {
  DEFAULT_Z_RANGE,
  EXPECTED_GEOMETRY,
  FachnetzType,
  GDAL_READER_CONFIG,
  GdalCheckContext,
  GdalCheckResult,
  GdalDataset,
  GdalFeature,
  GdalLayer,
  GdalLayerCheck,
  GdalReaderService,
  SWISS_BBOX_LV95,
  checkFieldNames,
  evaluateGeometryChecks,
} from 'gdal-wasm-reader';

/** Timings of the last upload, in milliseconds. */
interface ReadTimings {
  open: number;
  read: number;
}

/** One row of the measurement series: one layer of one file. */
interface MeasureRow {
  file: string;
  sizeMb: number;
  driver: string;
  layer: string;
  /** Feature count from the schema (-1 if the driver cannot count quickly). */
  featureCount: number;
  /** Hand-over (or copy) to the worker, dataset detection and schema of all layers, in ms. */
  schemaMs: number;
  /** Z range from the file header, null if the format needs a full read. */
  headerZ: { zMin: number; zMax: number } | null;
  /** Time to get the header Z range, in ms. */
  headerZMs: number | null;
  /** One pass over every feature with all upload checks, in ms. */
  checkMs: number | null;
  check: GdalLayerCheck | null;
  /** Number of checks failing with an error. */
  errorChecks: number | null;
  error: string | null;
}

/**
 * PoC page: loads a FileGDB, GeoPackage, Shapefile or GeoJSON in the browser with GDAL (WebAssembly), shows the
 * schema of each layer, the first 10 features and the upload checks of the selected one, and measures schema and
 * check times over a series of files.
 *
 * @author boukal1
 * @since 0.0.1
 */
@Component({
  selector: 'demo-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  /** Number of features shown for the selected layer. */
  protected readonly rowLimit = 10;

  /** Fachnetz types offered in the check panel. */
  protected readonly fachnetzTypes = Object.keys(EXPECTED_GEOMETRY) as FachnetzType[];

  /** True if uploaded files are copied into the worker memory instead of being read in place. */
  protected readonly copyFiles = inject(GDAL_READER_CONFIG).copyFiles;

  /** Shows the measurement series, only with ?messreihe=1 (performance measurements, not part of the upload). */
  protected readonly showMeasurements = new URLSearchParams(location.search).get('messreihe') === '1';

  /** GDAL release, null until GDAL is loaded. */
  protected readonly gdalVersion = signal<string | null>(null);

  /** Time to download and start GDAL, in milliseconds. */
  protected readonly startupMs = signal<number | null>(null);

  /** True while a file is read. */
  protected readonly busy = signal(false);

  /** User-facing error of the last action, null if none. */
  protected readonly error = signal<string | null>(null);

  /** Dataset of the last uploaded file. */
  protected readonly dataset = signal<GdalDataset | null>(null);

  /** Layer whose features and checks are shown. */
  protected readonly selectedLayer = signal<GdalLayer | null>(null);

  /** First features of the selected layer. */
  protected readonly features = signal<GdalFeature[]>([]);

  /** Timings of the last upload. */
  protected readonly timings = signal<ReadTimings | null>(null);

  /** Fachnetz type chosen for the selected layer. */
  protected readonly fachnetzType = signal<FachnetzType>('Kanten');

  /** Field mapped as UUID, null if none. */
  protected readonly uuidField = signal<string | null>(null);

  /** Filter bounding box in LV95, null if no filter; defaults to the Swiss extent. */
  protected readonly filterBbox = signal<[number, number, number, number] | null>([...SWISS_BBOX_LV95]);

  /** Plausible Z range in metres. */
  protected readonly zRange = signal<[number, number]>([...DEFAULT_Z_RANGE]);

  /** Checks the self-intersections of the lines (GEOS); used by the check panel and the measurement series. */
  protected readonly checkSelfIntersections = signal(true);

  /** Results of the upload checks of the selected layer, in the order of the check list. */
  protected readonly checkResults = signal<GdalCheckResult[]>([]);

  /** True while the checks reading every feature run. */
  protected readonly checking = signal(false);

  /** Duration of the pass over every feature, in ms. */
  protected readonly checkMs = signal<number | null>(null);

  /** Rows of the measurement series. */
  protected readonly measurements = signal<MeasureRow[]>([]);

  /** Reads the files with GDAL in a Web Worker. */
  private readonly gdal = inject(GdalReaderService);

  /**
   * Starts GDAL as soon as the page opens and measures its startup time.
   */
  public async ngOnInit(): Promise<void> {
    const start = performance.now();
    try {
      this.gdalVersion.set(await this.gdal.version());
      this.startupMs.set(Math.round(performance.now() - start));
    } catch (error) {
      this.showError(error);
    }
  }

  /**
   * Opens the selected file and shows the features of its first layer.
   *
   * @param event change event of the file input
   */
  protected async onFileSelected(event: Event): Promise<void> {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) {
      return;
    }
    const previous = this.dataset();
    if (previous) {
      await this.gdal.close(previous);
    }
    this.reset();
    this.busy.set(true);
    try {
      const start = performance.now();
      const dataset = await this.gdal.open(file);
      const open = Math.round(performance.now() - start);
      this.dataset.set(dataset);
      const read = dataset.layers.length > 0 ? await this.showLayer(dataset.layers[0]) : 0;
      this.timings.set({ open, read });
    } catch (error) {
      this.showError(error);
    } finally {
      this.busy.set(false);
    }
  }

  /**
   * Shows the first features of another layer of the current dataset.
   *
   * @param layer layer chosen by the user
   */
  protected async onLayerSelected(layer: GdalLayer): Promise<void> {
    this.error.set(null);
    this.busy.set(true);
    try {
      const read = await this.showLayer(layer);
      this.timings.update((timings) => (timings ? { ...timings, read } : null));
    } catch (error) {
      this.showError(error);
    } finally {
      this.busy.set(false);
    }
  }

  /**
   * Runs the upload checks on the selected layer: field names at once, then one pass over every feature.
   */
  protected async onRunChecks(): Promise<void> {
    const dataset = this.dataset();
    const layer = this.selectedLayer();
    if (!dataset || !layer) {
      return;
    }
    const context = this.checkContext();
    this.error.set(null);
    this.checkMs.set(null);
    this.checkResults.set(checkFieldNames(layer));
    this.checking.set(true);
    this.busy.set(true);
    try {
      const start = performance.now();
      const counters = await this.gdal.check(dataset, layer.name, context);
      this.checkMs.set(Math.round(performance.now() - start));
      this.checkResults.update((results) => [...results, ...evaluateGeometryChecks(layer, counters, context)]);
    } catch (error) {
      this.showError(error);
    } finally {
      this.checking.set(false);
      this.busy.set(false);
    }
  }

  /**
   * @param event change event of the Fachnetz type select
   */
  protected onFachnetzTypeChange(event: Event): void {
    this.fachnetzType.set((event.target as HTMLSelectElement).value as FachnetzType);
  }

  /**
   * @param event change event of the UUID field select; the empty option means no UUID field
   */
  protected onUuidFieldChange(event: Event): void {
    this.uuidField.set((event.target as HTMLSelectElement).value || null);
  }

  /**
   * @param event change event of the filter checkbox
   */
  protected onFilterToggle(event: Event): void {
    this.filterBbox.set((event.target as HTMLInputElement).checked ? [...SWISS_BBOX_LV95] : null);
  }

  /**
   * @param index position in [xmin, ymin, xmax, ymax]
   * @param event change event of the coordinate input
   */
  protected onFilterChange(index: number, event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    this.filterBbox.update((box) => (box ? (box.map((current, i) => (i === index ? value : current)) as [number, number, number, number]) : box));
  }

  /**
   * @param event change event of the self-intersection checkbox
   */
  protected onSelfIntersectionsToggle(event: Event): void {
    this.checkSelfIntersections.set((event.target as HTMLInputElement).checked);
  }

  /**
   * @param index 0 for the lowest Z, 1 for the highest
   * @param event change event of the Z input
   */
  protected onZRangeChange(index: number, event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    this.zRange.update((range) => (index === 0 ? [value, range[1]] : [range[0], value]));
  }

  /**
   * Measures each selected file: schema, header Z range, then one pass with all upload checks per layer.
   * The rows are also exposed as window.gdalMeasurements for scripted runs.
   *
   * @param event change event of the multiple file input
   */
  protected async onMeasureFiles(event: Event): Promise<void> {
    const files = Array.from((event.target as HTMLInputElement).files ?? []);
    const previous = this.dataset();
    if (previous) {
      await this.gdal.close(previous);
    }
    this.reset();
    this.measurements.set([]);
    this.busy.set(true);
    for (const file of files) {
      await this.measureFile(file);
    }
    this.busy.set(false);
    const scripted = window as unknown as { gdalMeasurements?: MeasureRow[]; gdalMeasurementsDone?: boolean };
    scripted.gdalMeasurements = this.measurements();
    scripted.gdalMeasurementsDone = true;
  }

  /**
   * Formats an attribute value for the table.
   *
   * @param value attribute value as read by GDAL
   * @returns the text to display, empty for NULL
   */
  protected format(value: unknown): string {
    if (value === null || value === undefined) {
      return '';
    }
    return typeof value === 'object' ? JSON.stringify(value) : String(value);
  }

  /**
   * @param status status of a check
   * @returns its German label
   */
  protected statusLabel(status: GdalCheckResult['status']): string {
    return { ok: 'OK', error: 'Fehler', warning: 'Hinweis', notChecked: 'nicht geprüft' }[status];
  }

  /**
   * Measures one file of the series and appends one row per layer, or one error row.
   */
  private async measureFile(file: File): Promise<void> {
    const sizeMb = Math.round((file.size / 1048576) * 10) / 10;
    const row: MeasureRow = {
      file: file.name,
      sizeMb,
      driver: '',
      layer: '',
      featureCount: -1,
      schemaMs: 0,
      headerZ: null,
      headerZMs: null,
      checkMs: null,
      check: null,
      errorChecks: null,
      error: null,
    };
    const start = performance.now();
    let dataset: GdalDataset;
    try {
      dataset = await this.gdal.open(file);
    } catch (error) {
      this.addRow({ ...row, error: this.message(error) });
      return;
    }
    const schemaMs = Math.round(performance.now() - start);
    for (const layer of dataset.layers) {
      const layerRow: MeasureRow = { ...row, driver: dataset.driver, layer: layer.name, featureCount: layer.featureCount, schemaMs };
      const context: GdalCheckContext = {
        fachnetzType: this.defaultFachnetzType(layer),
        zRange: [...DEFAULT_Z_RANGE],
        filterBbox: null,
        uuidField: this.defaultUuidField(layer),
        checkSelfIntersections: this.checkSelfIntersections(),
      };
      try {
        const headerStart = performance.now();
        layerRow.headerZ = await this.gdal.headerZRange(dataset, layer.name);
        layerRow.headerZMs = Math.round(performance.now() - headerStart);
        const checkStart = performance.now();
        layerRow.check = await this.gdal.check(dataset, layer.name, context);
        layerRow.checkMs = Math.round(performance.now() - checkStart);
        const results = [...checkFieldNames(layer), ...evaluateGeometryChecks(layer, layerRow.check, context)];
        layerRow.errorChecks = results.filter((result) => result.status === 'error').length;
      } catch (error) {
        layerRow.error = this.message(error);
      }
      this.addRow(layerRow);
    }
    await this.gdal.close(dataset);
  }

  /**
   * Appends a row to the measurement series.
   */
  private addRow(row: MeasureRow): void {
    this.measurements.update((rows) => [...rows, row]);
  }

  /**
   * Reads the first features of a layer, presets the check panel and returns the read time in milliseconds.
   */
  private async showLayer(layer: GdalLayer): Promise<number> {
    const dataset = this.dataset();
    if (!dataset) {
      return 0;
    }
    const start = performance.now();
    this.selectedLayer.set(layer);
    this.fachnetzType.set(this.defaultFachnetzType(layer));
    this.uuidField.set(this.defaultUuidField(layer));
    this.checkResults.set([]);
    this.checkMs.set(null);
    this.features.set(await this.gdal.readFeatures(dataset, layer.name, this.rowLimit));
    return Math.round(performance.now() - start);
  }

  /**
   * Fachnetz type matching the declared geometry type of a layer, Kanten if unknown.
   */
  private defaultFachnetzType(layer: GdalLayer): FachnetzType {
    const type = (layer.geometryType ?? '').toLowerCase();
    if (type.includes('point')) {
      return 'Knoten';
    }
    return type.includes('polygon') || type.includes('surface') ? 'Flaechen' : 'Kanten';
  }

  /**
   * Field named "uuid" (any case), null if the layer has none.
   */
  private defaultUuidField(layer: GdalLayer): string | null {
    return layer.fields.find((field) => field.name.toLowerCase() === 'uuid')?.name ?? null;
  }

  /**
   * Current choices of the check panel.
   */
  private checkContext(): GdalCheckContext {
    return {
      fachnetzType: this.fachnetzType(),
      zRange: this.zRange(),
      filterBbox: this.filterBbox(),
      uuidField: this.uuidField(),
      checkSelfIntersections: this.checkSelfIntersections(),
    };
  }

  /**
   * Clears the results of the previous file.
   */
  private reset(): void {
    this.error.set(null);
    this.dataset.set(null);
    this.selectedLayer.set(null);
    this.features.set([]);
    this.timings.set(null);
    this.checkResults.set([]);
    this.checkMs.set(null);
  }

  /**
   * Shows an error message; the full error goes to the console.
   */
  private showError(error: unknown): void {
    console.error(error);
    this.error.set(this.message(error));
  }

  /**
   * Returns the message of an error.
   */
  private message(error: unknown): string {
    return error instanceof Error ? error.message : String(error);
  }
}
