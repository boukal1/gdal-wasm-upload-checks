/**
 * A vector dataset opened from an uploaded file (zipped FileGDB, GeoPackage, Shapefile or GeoJSON).
 *
 * @author boukal1
 * @since 0.0.1
 */
export interface GdalDataset {
  /** Name of the uploaded file. */
  fileName: string;
  /** GDAL path of the dataset inside the browser filesystem, e.g. /vsizip//memfs/.../data.zip/roads.gdb. */
  path: string;
  /** Short name of the GDAL driver that opened it: OpenFileGDB, GPKG, ESRI Shapefile or GeoJSON. */
  driver: string;
  /** Layers (feature classes) of the dataset. */
  layers: GdalLayer[];
}

/**
 * Schema and metadata of one layer, as reported by ogrinfo.
 */
export interface GdalLayer {
  /** Layer (feature class) name. */
  name: string;
  /** Number of features, -1 if the driver cannot count them quickly. */
  featureCount: number;
  /** OGR geometry type (e.g. LineString, MultiLineString, Point, "LineString M"), null for a table without geometry. */
  geometryType: string | null;
  /** Coordinate system, e.g. "EPSG:2056", or its name when it has no authority code; null if none. */
  crs: string | null;
  /** Extent [xmin, ymin, xmax, ymax] in the layer CRS, null if unknown or empty. */
  extent: [number, number, number, number] | null;
  /** Attribute fields, geometry and FID excluded. */
  fields: GdalField[];
}

/**
 * One attribute field of a layer.
 */
export interface GdalField {
  /** Field name. */
  name: string;
  /** OGR field type: Integer, Integer64, Real, String, Date, Time, DateTime, Binary... */
  type: string;
  /** OGR field subtype (Boolean, Int16, Float32, JSON, UUID), absent if none. */
  subType?: string;
  /** Maximum width, absent if unbounded. */
  width?: number;
}

/**
 * One feature read from a layer.
 */
export interface GdalFeature {
  /** Feature identifier given by the driver. */
  fid: number;
  /** Attribute values keyed by field name; dates come as ogrinfo text, e.g. "2021/06/17" or "2025/04/11 08:30:00+00". */
  properties: Record<string, unknown>;
  /** GeoJSON geometry type, null for a NULL geometry. */
  geometryType: string | null;
  /** Number of parts of a multi geometry, 1 for a simple one, 0 for a NULL geometry. */
  partCount: number;
}

/**
 * Number of offending features and the FID of the first one.
 */
export interface GdalCheckCounter {
  /** Number of features concerned. */
  count: number;
  /** FID of the first feature concerned, null if none. */
  example: number | null;
}

/**
 * Counters of one pass over every feature of a layer, as returned by GdalReaderService.check().
 */
export interface GdalLayerCheck {
  /** Number of features read. */
  features: number;
  /** Number of vertices, arcs and multi geometries included. */
  vertices: number;
  /** Features with a point, line, polygon or other (mixed collection) geometry. */
  points: number;
  lines: number;
  polygons: number;
  others: number;
  /** Features whose geometry has Z values, and the Z range of the layer (null if none). */
  withZ: number;
  zMin: number | null;
  zMax: number | null;
  /** Lines whose geometry carries M values, numeric or not. */
  withM: number;
  /** Coordinate system of the layer, e.g. "EPSG:2056", empty if none. */
  crs: string;
  /** Features whose envelope intersects the Swiss bounding box. */
  inSwissBox?: number;
  /** Features whose envelope intersects the filter bounding box, absent if no filter was given. */
  inFilterBox?: number;
  /** True if a UUID field was given and found. */
  uuidChecked: boolean;
  nullGeometries: GdalCheckCounter;
  /** Features GDAL could not decode (error while reading). */
  corrupt: GdalCheckCounter;
  /** Features with a NaN or infinite X, Y or Z coordinate. */
  nonFinite: GdalCheckCounter;
  /** Multi geometries or aggregates with more than one part (polygons excluded). */
  multiparts: GdalCheckCounter;
  /** Geometries with arcs. */
  curves: GdalCheckCounter;
  /** Zero-length lines, flat arcs, rings with fewer than 4 points, zero-area polygons. */
  degenerate: GdalCheckCounter;
  singlePointLines: GdalCheckCounter;
  /** Lines whose start point equals the end point. */
  loops: GdalCheckCounter;
  /** True if the self-intersections were checked (GEOS). */
  selfIntersectionsChecked: boolean;
  /** Lines crossing or touching themselves in 2D, a closed line touching itself only at its ends excluded. */
  selfIntersections: GdalCheckCounter;
  /** Lines with the same vertex twice in a row (2D), degenerate lines excluded. */
  repeatedVertices: GdalCheckCounter;
  /** Lines with NaN or infinite M values. */
  mNotNumeric: GdalCheckCounter;
  /** Lines whose M values rise and fall. */
  mNotSteady: GdalCheckCounter;
  /** Lines with two equal consecutive M values. */
  mEqual: GdalCheckCounter;
  zOutside: GdalCheckCounter;
  uuidEmpty: GdalCheckCounter;
  /** Features whose UUID value appeared on an earlier feature. */
  uuidDuplicates: GdalCheckCounter;
  /** GDAL message if reading stopped before the end, empty otherwise. */
  readError: string;
  /** First GDAL error met while reading, empty if none. */
  firstError: string;
}

/**
 * Error raised when an uploaded file cannot be read; the message is meant for the user.
 */
export class GdalReaderError extends Error {
  /**
   * @param message user-facing reason
   * @param detail underlying GDAL or runtime error, if any
   */
  constructor(
    message: string,
    public readonly detail?: unknown,
  ) {
    super(message);
    this.name = 'GdalReaderError';
  }
}
