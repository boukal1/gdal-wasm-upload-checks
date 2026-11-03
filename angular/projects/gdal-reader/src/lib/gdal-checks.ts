import { GdalCheckCounter, GdalLayer, GdalLayerCheck } from './gdal-reader.models';

/** Types of thematic network (Fachnetz) a layer can be uploaded as. */
export type FachnetzType = 'Kanten' | 'Knoten' | 'Punkte' | 'Flaechen';

/** Geometry family expected for each Fachnetz type. */
export const EXPECTED_GEOMETRY: Record<FachnetzType, 'line' | 'point' | 'polygon'> = {
  Kanten: 'line',
  Knoten: 'point',
  Punkte: 'point',
  Flaechen: 'polygon',
};

/** Extent of Switzerland in LV95 (EPSG:2056). */
export const SWISS_BBOX_LV95: [number, number, number, number] = [2485080, 1074270, 2837120, 1299950];

/** Plausible Z range in metres; the upper bound covers the highest transport infrastructure in Switzerland. */
export const DEFAULT_Z_RANGE: [number, number] = [180, 3900];

/**
 * What the user chose in the GUI, needed by some checks.
 *
 * @author boukal1
 * @since 0.0.1
 */
export interface GdalCheckContext {
  /** Fachnetz type chosen for the layer. */
  fachnetzType: FachnetzType;
  /** Plausible [lowest, highest] Z in metres. */
  zRange: [number, number];
  /** Filter bounding box [xmin, ymin, xmax, ymax] in LV95, null if none. */
  filterBbox: [number, number, number, number] | null;
  /** Field mapped as UUID, null if the UUID is generated during processing. */
  uuidField: string | null;
  /** Checks the self-intersections of the lines (GEOS), the most expensive check; true if absent. */
  checkSelfIntersections?: boolean;
}

/** ok: passed; error: blocks the matching; warning: accepted, user informed; notChecked: not applicable here. */
export type GdalCheckStatus = 'ok' | 'error' | 'warning' | 'notChecked';

/**
 * Result of one upload check.
 */
export interface GdalCheckResult {
  /** Number of the check in the check list ("3" to "16"), or a short code for the added checks. */
  id: string;
  label: string;
  status: GdalCheckStatus;
  /** Number of features or fields concerned, null if not applicable. */
  count: number | null;
  /** FID of the first feature concerned, null if none or not applicable. */
  exampleFid: number | null;
  detail: string;
  /** False for the checks answered by the schema alone, true for those reading every feature. */
  fullRead: boolean;
}

const MAX_FIELD_NAME_LENGTH = 52;

/**
 * Checks 3 to 5 on the field names, answered by the schema alone.
 *
 * @param layer layer returned by GdalReaderService.open()
 * @returns one result per check, in the order of the check list
 */
export function checkFieldNames(layer: GdalLayer): GdalCheckResult[] {
  const names = layer.fields.map((field) => field.name);
  return [
    fieldNameResult('3', 'Feldname: 53 Zeichen oder mehr', names.filter((name) => name.length > MAX_FIELD_NAME_LENGTH)),
    fieldNameResult('4', 'Feldname: andere Zeichen als A-Z, a-z, 0-9, _', names.filter((name) => /[^A-Za-z0-9_]/.test(name))),
    fieldNameResult('5', 'Feldname: beginnt mit _ oder einer Ziffer', names.filter((name) => /^[_0-9]/.test(name))),
  ];
}

/**
 * Checks reading every feature: 6 to 16, degenerate geometries, single-point lines, Z range, arcs, loops.
 *
 * @param layer layer returned by GdalReaderService.open()
 * @param check counters returned by GdalReaderService.check()
 * @param context choices of the user in the GUI
 * @returns one result per check, in the order of the check list
 */
export function evaluateGeometryChecks(layer: GdalLayer, check: GdalLayerCheck, context: GdalCheckContext): GdalCheckResult[] {
  const expected = EXPECTED_GEOMETRY[context.fachnetzType];
  const withGeometry = check.features - check.nullGeometries.count;
  const isLine = expected === 'line';
  const results: GdalCheckResult[] = [];

  if (check.readError) {
    results.push(result('L', 'Datei vollständig lesbar', 'error', null, null, 'Lesen abgebrochen: ' + check.readError));
  }

  // 6: blocking only if no feature has a geometry
  if (check.features === 0) {
    results.push(result('6', 'NULL-Geometrien', 'error', 0, null, 'Die Featureklasse ist leer.'));
  } else if (withGeometry === 0) {
    results.push(result('6', 'NULL-Geometrien', 'error', check.nullGeometries.count, check.nullGeometries.example, 'Alle Objekte haben eine NULL-Geometrie.'));
  } else {
    results.push(
      counterResult('6', 'NULL-Geometrien', check.nullGeometries, 'warning', `${check.nullGeometries.count} Objekte ohne Geometrie werden nicht gematcht.`),
    );
  }

  // 7: every feature with a geometry must belong to the family of the Fachnetz type
  const found = { point: check.points, line: check.lines, polygon: check.polygons };
  const wrongType = withGeometry - found[expected];
  const typeDetail =
    `Erwartet ${familyLabel(expected)} (${context.fachnetzType}), gefunden: ` +
    [`${check.points} Punkte`, `${check.lines} Linien`, `${check.polygons} Flächen`, `${check.others} gemischte`].join(', ');
  results.push(result('7', 'Geometrietyp passt zum Fachnetz-Typ', wrongType > 0 ? 'error' : 'ok', wrongType, null, typeDetail));

  // 8 and 10: blocking only if no feature lies inside; the boxes are compared in the layer coordinate system
  const crsDetail = check.crs ? ` Koordinatensystem der Daten: ${check.crs}.` : ' Kein Koordinatensystem angegeben, LV95 angenommen.';
  const swissLabel = 'Schweiz-BBOX: mindestens ein Objekt innerhalb';
  const filterLabel = 'Filter-BBOX: mindestens ein Objekt innerhalb';
  if (withGeometry === 0) {
    results.push(result('8', swissLabel, 'notChecked', null, null, 'Keine Geometrien (siehe 6).'));
    results.push(result('10', filterLabel, 'notChecked', null, null, 'Keine Geometrien (siehe 6).'));
  } else {
    results.push(boxResult('8', swissLabel, check.inSwissBox, withGeometry, crsDetail));
    results.push(
      context.filterBbox
        ? boxResult('10', filterLabel, check.inFilterBox, withGeometry, crsDetail)
        : result('10', filterLabel, 'notChecked', null, null, 'Kein Filter gesetzt.'),
    );
  }

  if (expected === 'polygon') {
    results.push(result('11', 'Aggregate / Multipart', 'notChecked', null, null, 'Bei Flächen nicht geprüft.'));
  } else {
    results.push(counterResult('11', 'Aggregate / Multipart', check.multiparts, 'error', 'Objekte mit mehreren Teilen nach GeometryRefiner.'));
  }

  if (!check.uuidChecked) {
    results.push(result('12', 'UUID eindeutig', 'notChecked', null, null, 'Kein UUID-Feld zugeordnet: die UUID wird bei der Verarbeitung erzeugt.'));
  } else if (check.uuidDuplicates.count > 0) {
    const empty = check.uuidEmpty.count > 0 ? ` Zudem ${check.uuidEmpty.count} Objekte ohne UUID (z.B. FID ${check.uuidEmpty.example}).` : '';
    results.push(counterResult('12', 'UUID eindeutig', check.uuidDuplicates, 'error', `Feld ${context.uuidField}: Werte mehrfach vorhanden.${empty}`));
  } else {
    results.push(counterResult('12', 'UUID eindeutig', check.uuidEmpty, 'warning', `Feld ${context.uuidField}: ${check.uuidEmpty.count} Objekte ohne UUID.`));
  }

  if (isLine) {
    // M values are read on lines only
    const withoutM = check.lines - check.withM;
    const partial = check.withM > 0 && withoutM > 0;
    const mDetail = check.withM === 0 ? 'Keine M-Werte vorhanden.' : `${check.withM} Objekte mit M, ${withoutM} ohne.`;
    results.push(result('13', 'M-Werte: bei allen Objekten oder bei keinem', partial ? 'error' : 'ok', partial ? withoutM : 0, null, mDetail));
    results.push(counterResult('14', 'M-Werte numerisch', check.mNotNumeric, 'error', 'Linien mit M-Werten NaN oder unendlich.'));
    results.push(counterResult('15', 'M-Werte stetig steigend oder fallend', check.mNotSteady, 'error', 'Linien, deren M-Werte steigen und fallen.'));
    results.push(counterResult('16', 'M-Werte: keine zwei gleichen nacheinander', check.mEqual, 'error', 'Linien mit zwei gleichen M-Werten nacheinander.'));
  } else {
    for (const [id, label] of [
      ['13', 'M-Werte: bei allen Objekten oder bei keinem'],
      ['14', 'M-Werte numerisch'],
      ['15', 'M-Werte stetig steigend oder fallend'],
      ['16', 'M-Werte: keine zwei gleichen nacheinander'],
    ]) {
      results.push(result(id, label, 'notChecked', null, null, 'Nur bei Linien geprüft.'));
    }
  }

  const broken = check.degenerate.count + check.corrupt.count + check.nonFinite.count;
  const brokenExample = check.corrupt.example ?? check.nonFinite.example ?? check.degenerate.example;
  const brokenDetail =
    `${check.degenerate.count} degeneriert (Länge oder Fläche 0, flacher Kreisbogen, Ring mit weniger als 4 Punkten), ` +
    `${check.nonFinite.count} mit Koordinate NaN oder unendlich, ${check.corrupt.count} nicht lesbar` +
    (check.firstError ? ` (${check.firstError})` : '') +
    '.';
  results.push(result('GV', 'Degenerierte oder korrupte Geometrien', broken > 0 ? 'error' : 'ok', broken, brokenExample, brokenDetail));
  results.push(
    isLine
      ? counterResult('1P', 'Linien mit nur einem Punkt', check.singlePointLines, 'error', 'Linien mit weniger als 2 Stützpunkten.')
      : result('1P', 'Linien mit nur einem Punkt', 'notChecked', null, null, 'Nur bei Linien geprüft.'),
  );

  const zRange = `${context.zRange[0]}-${context.zRange[1]} m`;
  if (check.withZ === 0) {
    results.push(result('Z', `Z im Bereich ${zRange}`, 'ok', 0, null, 'Keine Z-Werte (2D).'));
  } else {
    results.push(
      counterResult('Z', `Z im Bereich ${zRange}`, check.zOutside, 'error', `Z von ${check.zMin} bis ${check.zMax} m. Fehler oder Verarbeitung in 2D.`),
    );
  }
  results.push(counterResult('KB', 'Kreisbögen', check.curves, 'error', 'Geometrien mit Kreisbögen werden ausgeschlossen.'));
  results.push(
    isLine
      ? counterResult('SL', 'Schleifen (Start = Ende)', check.loops, 'warning', 'Werden vom Matching ausgeschlossen.')
      : result('SL', 'Schleifen (Start = Ende)', 'notChecked', null, null, 'Nur bei Linien geprüft.'),
  );
  if (!isLine) {
    results.push(result('SÜ', 'Selbstüberschneidungen (2D)', 'notChecked', null, null, 'Nur bei Linien geprüft.'));
    results.push(result('DP', 'Doppelte Stützpunkte nacheinander', 'notChecked', null, null, 'Nur bei Linien geprüft.'));
  } else {
    results.push(
      check.selfIntersectionsChecked
        ? counterResult('SÜ', 'Selbstüberschneidungen (2D)', check.selfIntersections, 'warning', 'Linien, die sich selbst kreuzen oder berühren: werden vom Matching ausgeschlossen.')
        : result('SÜ', 'Selbstüberschneidungen (2D)', 'notChecked', null, null, 'Ausgeschaltet: bleibt in FME.'),
    );
    results.push(
      counterResult('DP', 'Doppelte Stützpunkte nacheinander', check.repeatedVertices, 'warning', 'Linien mit zwei gleichen Stützpunkten nacheinander.'),
    );
  }
  return results;
}

/**
 * Builds a result.
 */
function result(id: string, label: string, status: GdalCheckStatus, count: number | null, exampleFid: number | null, detail: string): GdalCheckResult {
  return { id, label, status, count, exampleFid, detail, fullRead: true };
}

/**
 * Builds the result of a counter: ok if no feature is concerned, the given status otherwise.
 */
function counterResult(id: string, label: string, counter: GdalCheckCounter, failStatus: GdalCheckStatus, detail: string): GdalCheckResult {
  return result(id, label, counter.count > 0 ? failStatus : 'ok', counter.count, counter.example, counter.count > 0 ? detail : '');
}

/**
 * Builds the result of a bounding box check: error if no feature lies inside, warning if some lie outside.
 */
function boxResult(id: string, label: string, inside: number | undefined, withGeometry: number, crsDetail: string): GdalCheckResult {
  const count = inside ?? 0;
  const outside = withGeometry - count;
  const status: GdalCheckStatus = count === 0 ? 'error' : outside > 0 ? 'warning' : 'ok';
  return result(id, label, status, outside, null, `${count} von ${withGeometry} Objekten innerhalb.${crsDetail}`);
}

/**
 * Builds the result of a field name check from the offending names.
 */
function fieldNameResult(id: string, label: string, offending: string[]): GdalCheckResult {
  return {
    id,
    label,
    status: offending.length > 0 ? 'error' : 'ok',
    count: offending.length,
    exampleFid: null,
    detail: offending.join(', '),
    fullRead: false,
  };
}

/**
 * German label of a geometry family.
 */
function familyLabel(family: 'line' | 'point' | 'polygon'): string {
  return { line: 'Linien', point: 'Punkte', polygon: 'Flächen' }[family];
}
