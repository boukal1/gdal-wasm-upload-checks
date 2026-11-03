// Upload checks, computed in one pass over the features: GdalReader::check() counts each problem and
// keeps the FID of the first offending feature; the rules themselves (thresholds, error or warning) live in the
// Angular library (gdal-checks.ts).
#include "gdal_reader.h"

#include <cpl_json.h>
#include <geos_c.h>
#include <ogr_spatialref.h>

#include <algorithm>
#include <cmath>
#include <cstdint>
#include <memory>
#include <string>
#include <vector>

namespace {

// Number of offending features and the FID of the first one
struct Counter {
    long long count = 0;
    GIntBig example = -1;

    void add(GIntBig fid) {
        if (count++ == 0) {
            example = fid;
        }
    }

    CPLJSONObject toJson() const {
        CPLJSONObject json;
        json.Add("count", static_cast<GInt64>(count));
        if (example >= 0) {
            json.Add("example", static_cast<GInt64>(example));
        } else {
            json.AddNull("example");
        }
        return json;
    }
};

// What one feature shows, gathered over its parts
struct FeatureFlags {
    bool singlePoint = false;
    bool degenerate = false;
    bool nonFinite = false;
    bool loop = false;
    bool selfIntersects = false;
    bool repeatedVertex = false;
    bool measured = false;
    bool nanM = false;
    bool mNotSteady = false;
    bool mEqual = false;
};

// All counters of one layer
struct Counters {
    long long features = 0;
    long long vertices = 0;
    long long points = 0;
    long long lines = 0;
    long long polygons = 0;
    long long others = 0;
    long long withZ = 0;
    double zMin = 0;
    double zMax = 0;
    long long inSwissBox = 0;
    long long inFilterBox = 0;
    long long withM = 0;
    Counter nullGeometries, corrupt, nonFinite, multiparts, curves, degenerate, singlePointLines, loops;
    Counter selfIntersections, repeatedVertices;
    Counter mNotNumeric, mNotSteady, mEqual, zOutside, uuidEmpty, uuidDuplicates;
};

// Two 64-bit hashes of a UUID value with its FID: collisions between different values are negligible
struct UuidKey {
    uint64_t high;
    uint64_t low;
    GIntBig fid;

    bool operator<(const UuidKey& other) const {
        return high != other.high ? high < other.high : low < other.low;
    }

    bool sameValue(const UuidKey& other) const {
        return high == other.high && low == other.low;
    }
};

uint64_t fnv1a(const char* text, uint64_t hash) {
    for (const char* c = text; *c != '\0'; ++c) {
        hash = (hash ^ static_cast<unsigned char>(*c)) * 1099511628211ULL;
    }
    return hash;
}

// GDAL errors raised while reading, counted to spot corrupt features
struct ErrorLog {
    int count = 0;
    std::string first;
};

void CPL_STDCALL collectErrors(CPLErr level, CPLErrorNum, const char* message) {
    if (level >= CE_Failure) {
        auto* log = static_cast<ErrorLog*>(CPLGetErrorHandlerUserData());
        if (log->count++ == 0) {
            log->first = message;
        }
    }
}

bool readBox(const CPLJSONObject& options, const char* name, OGREnvelope& box) {
    const CPLJSONArray values = options.GetArray(name);
    if (!values.IsValid() || values.Size() != 4) {
        return false;
    }
    box.MinX = values[0].ToDouble();
    box.MinY = values[1].ToDouble();
    box.MaxX = values[2].ToDouble();
    box.MaxY = values[3].ToDouble();
    return true;
}

// Expresses a box given in LV95 in the layer coordinate system, so that the feature envelopes can be compared as read
OGREnvelope fromLv95(const OGREnvelope& box, const OGRSpatialReference* layerCrs) {
    if (layerCrs == nullptr) {
        return box;
    }
    OGRSpatialReference lv95;
    lv95.importFromEPSG(2056);
    lv95.SetAxisMappingStrategy(OAMS_TRADITIONAL_GIS_ORDER);
    if (lv95.IsSame(layerCrs)) {
        return box;
    }
    OGRSpatialReference target(*layerCrs);
    target.SetAxisMappingStrategy(OAMS_TRADITIONAL_GIS_ORDER);
    std::unique_ptr<OGRCoordinateTransformation> transformation(OGRCreateCoordinateTransformation(&lv95, &target));
    OGREnvelope result = box;
    if (!transformation ||
        !transformation->TransformBounds(box.MinX, box.MinY, box.MaxX, box.MaxY, &result.MinX, &result.MinY, &result.MaxX,
                                         &result.MaxY, 21)) {
        return box;
    }
    return result;
}

long long countVertices(const OGRGeometry& geometry) {
    const OGRwkbGeometryType type = wkbFlatten(geometry.getGeometryType());
    if (type == wkbPoint) {
        return 1;
    }
    long long count = 0;
    if (type == wkbCompoundCurve) {
        for (const OGRCurve* curve : *geometry.toCompoundCurve()) {
            count += countVertices(*curve);
        }
    } else if (OGR_GT_IsCurve(type)) {
        count = geometry.toSimpleCurve()->getNumPoints();
    } else if (type == wkbPolygon || type == wkbCurvePolygon || type == wkbTriangle) {
        for (const OGRCurve* ring : *geometry.toCurvePolygon()) {
            count += countVertices(*ring);
        }
    } else if (OGR_GT_IsSubClassOf(type, wkbGeometryCollection)) {
        for (const OGRGeometry* part : *geometry.toGeometryCollection()) {
            count += countVertices(*part);
        }
    }
    return count;
}

// True if three points of an arc lie on a straight line (zero curvature); a full circle (start = end) is not flat
bool isFlatArc(double x0, double y0, double x1, double y1, double x2, double y2) {
    if (x0 == x2 && y0 == y2) {
        return false;
    }
    const double cross = (x1 - x0) * (y2 - y0) - (y1 - y0) * (x2 - x0);
    return std::fabs(cross) <= 1e-10 * std::hypot(x1 - x0, y1 - y0) * std::hypot(x2 - x0, y2 - y0);
}

// Vertex by vertex on a LineString or CircularString: NaN or infinite coordinates, flat arcs, and, on lines,
// repeated consecutive vertices and M values
void inspectVertices(const OGRSimpleCurve& curve, bool isLine, FeatureFlags& flags) {
    const int pointCount = curve.getNumPoints();
    const bool hasZ = curve.Is3D();
    const bool hasM = isLine && curve.IsMeasured();
    bool rises = false;
    bool falls = false;
    bool hasPrevious = false;
    double previous = 0;
    for (int i = 0; i < pointCount; ++i) {
        if (!std::isfinite(curve.getX(i)) || !std::isfinite(curve.getY(i)) || (hasZ && !std::isfinite(curve.getZ(i)))) {
            flags.nonFinite = true;
        }
        if (isLine && i > 0 && curve.getX(i) == curve.getX(i - 1) && curve.getY(i) == curve.getY(i - 1)) {
            flags.repeatedVertex = true;
        }
        if (!hasM) {
            continue;
        }
        const double m = curve.getM(i);
        if (!std::isfinite(m)) {
            flags.nanM = true;
            continue;
        }
        if (hasPrevious) {
            if (m > previous) {
                rises = true;
            } else if (m < previous) {
                falls = true;
            } else {
                flags.mEqual = true;
            }
        }
        previous = m;
        hasPrevious = true;
    }
    if (hasM) {
        flags.measured = true;
    }
    if (rises && falls) {
        flags.mNotSteady = true;
    }
    if (wkbFlatten(curve.getGeometryType()) == wkbCircularString) {
        for (int i = 0; i + 2 < pointCount; i += 2) {
            if (isFlatArc(curve.getX(i), curve.getY(i), curve.getX(i + 1), curve.getY(i + 1), curve.getX(i + 2), curve.getY(i + 2))) {
                flags.degenerate = true;
            }
        }
    }
}

// Every LineString or CircularString of a curve, the parts of a CompoundCurve included
void inspectCurveVertices(const OGRCurve& curve, bool isLine, FeatureFlags& flags) {
    if (wkbFlatten(curve.getGeometryType()) == wkbCompoundCurve) {
        for (const OGRCurve* part : *curve.toCompoundCurve()) {
            inspectCurveVertices(*part, isLine, flags);
        }
    } else {
        inspectVertices(*curve.toSimpleCurve(), isLine, flags);
    }
}

// One line part: single point, zero length, loop (start = end), its vertices, then self-intersections with GEOS
// (geos null: not checked). A closed line touching itself only at its ends is simple: that case is the loop check.
void inspectCurve(const OGRCurve& curve, GEOSContextHandle_t geos, FeatureFlags& flags) {
    const int pointCount = curve.getNumPoints();
    if (pointCount < 2) {
        flags.singlePoint = true;
    } else {
        OGRPoint start;
        OGRPoint end;
        curve.StartPoint(&start);
        curve.EndPoint(&end);
        // Only a closed line can have a zero length: the length is computed for those only
        if (start.getX() == end.getX() && start.getY() == end.getY()) {
            if (curve.get_Length() == 0) {
                flags.degenerate = true;
            } else if (pointCount >= 3) {
                flags.loop = true;
            }
        }
    }
    inspectCurveVertices(curve, true, flags);
    // Two segments cannot cross: GEOS only for lines of 3 vertices or more, and not on NaN or infinite coordinates
    // (already an error, and GEOS would report it through GDAL's error handler)
    if (geos != nullptr && pointCount >= 3 && !flags.nonFinite) {
        GEOSGeom line = curve.exportToGEOS(geos);
        if (line != nullptr) {
            if (GEOSisSimple_r(geos, line) == 0) {
                flags.selfIntersects = true;
            }
            GEOSGeom_destroy_r(geos, line);
        }
    }
}

// Points: NaN or infinite coordinates
void inspectPoints(const OGRGeometry& geometry, FeatureFlags& flags) {
    const OGRwkbGeometryType type = wkbFlatten(geometry.getGeometryType());
    if (type == wkbPoint) {
        const OGRPoint* point = geometry.toPoint();
        if (!std::isfinite(point->getX()) || !std::isfinite(point->getY()) || (point->Is3D() && !std::isfinite(point->getZ()))) {
            flags.nonFinite = true;
        }
    } else if (OGR_GT_IsSubClassOf(type, wkbGeometryCollection)) {
        for (const OGRGeometry* part : *geometry.toGeometryCollection()) {
            inspectPoints(*part, flags);
        }
    }
}

void inspectLines(const OGRGeometry& geometry, GEOSContextHandle_t geos, FeatureFlags& flags) {
    const OGRwkbGeometryType type = wkbFlatten(geometry.getGeometryType());
    if (OGR_GT_IsCurve(type)) {
        inspectCurve(*geometry.toCurve(), geos, flags);
    } else if (OGR_GT_IsSubClassOf(type, wkbGeometryCollection)) {
        for (const OGRGeometry* part : *geometry.toGeometryCollection()) {
            inspectLines(*part, geos, flags);
        }
    }
}

// Polygons: a ring with fewer than 4 points or a zero area is degenerate
void inspectSurfaces(const OGRGeometry& geometry, FeatureFlags& flags) {
    const OGRwkbGeometryType type = wkbFlatten(geometry.getGeometryType());
    if (type == wkbPolygon || type == wkbCurvePolygon || type == wkbTriangle) {
        const OGRCurvePolygon* polygon = geometry.toCurvePolygon();
        for (const OGRCurve* ring : *polygon) {
            if (ring->getNumPoints() < 4) {
                flags.degenerate = true;
            }
            inspectCurveVertices(*ring, false, flags);
        }
        if (polygon->get_Area() == 0) {
            flags.degenerate = true;
        }
    } else if (OGR_GT_IsSubClassOf(type, wkbGeometryCollection)) {
        for (const OGRGeometry* part : *geometry.toGeometryCollection()) {
            inspectSurfaces(*part, flags);
        }
    }
}

void inspect(const OGRGeometry& geometry, GIntBig fid, double zLow, double zHigh, const OGREnvelope* swissBox,
             const OGREnvelope* filterBox, GEOSContextHandle_t geos, Counters& counters) {
    const OGRwkbGeometryType type = wkbFlatten(geometry.getGeometryType());
    const bool isPolygon = OGR_GT_IsSurface(type) || OGR_GT_IsSubClassOf(type, wkbMultiSurface);
    const bool isLine = OGR_GT_IsCurve(type) || OGR_GT_IsSubClassOf(type, wkbMultiCurve);
    if (type == wkbPoint || type == wkbMultiPoint) {
        ++counters.points;
    } else if (isLine) {
        ++counters.lines;
    } else if (isPolygon) {
        ++counters.polygons;
    } else {
        ++counters.others;
    }
    counters.vertices += countVertices(geometry);

    // GeometryRefiner turns a multi geometry of one part into a simple one; more parts or an aggregate remain
    if (!isPolygon && OGR_GT_IsSubClassOf(type, wkbGeometryCollection) &&
        geometry.toGeometryCollection()->getNumGeometries() > 1) {
        counters.multiparts.add(fid);
    }
    if (geometry.hasCurveGeometry()) {
        counters.curves.add(fid);
    }

    OGREnvelope3D envelope;
    geometry.getEnvelope(&envelope);
    if (geometry.Is3D()) {
        counters.zMin = counters.withZ == 0 ? envelope.MinZ : std::min(counters.zMin, envelope.MinZ);
        counters.zMax = counters.withZ == 0 ? envelope.MaxZ : std::max(counters.zMax, envelope.MaxZ);
        ++counters.withZ;
        if (envelope.MinZ < zLow || envelope.MaxZ > zHigh) {
            counters.zOutside.add(fid);
        }
    }
    // OGREnvelope3D hides the 2D Intersects(): compare through the 2D base
    const OGREnvelope& envelope2D = envelope;
    if (swissBox != nullptr && envelope2D.Intersects(*swissBox)) {
        ++counters.inSwissBox;
    }
    if (filterBox != nullptr && envelope2D.Intersects(*filterBox)) {
        ++counters.inFilterBox;
    }

    FeatureFlags flags;
    if (isLine || type == wkbGeometryCollection) {
        inspectLines(geometry, geos, flags);
    }
    if (isPolygon || type == wkbGeometryCollection) {
        inspectSurfaces(geometry, flags);
    }
    if (type == wkbPoint || type == wkbMultiPoint || type == wkbGeometryCollection) {
        inspectPoints(geometry, flags);
    }
    if (flags.singlePoint) {
        counters.singlePointLines.add(fid);
    }
    if (flags.degenerate) {
        counters.degenerate.add(fid);
    }
    if (flags.nonFinite) {
        counters.nonFinite.add(fid);
    }
    if (flags.loop) {
        counters.loops.add(fid);
    }
    if (flags.selfIntersects) {
        counters.selfIntersections.add(fid);
    }
    // A degenerate line (all vertices equal) is reported as such, not as repeated vertices
    if (flags.repeatedVertex && !flags.degenerate) {
        counters.repeatedVertices.add(fid);
    }
    // A line has M when its geometry carries M values, whatever they are; NaN or infinite values are check 14
    if (flags.measured) {
        ++counters.withM;
    }
    if (flags.nanM) {
        counters.mNotNumeric.add(fid);
    }
    if (flags.mNotSteady) {
        counters.mNotSteady.add(fid);
    }
    if (flags.mEqual) {
        counters.mEqual.add(fid);
    }
}

// Counts the features whose UUID value appeared before; the example is the second feature with a repeated value
void countDuplicates(std::vector<UuidKey>& uuids, Counter& duplicates) {
    std::sort(uuids.begin(), uuids.end());
    for (size_t i = 1; i < uuids.size(); ++i) {
        if (uuids[i].sameValue(uuids[i - 1])) {
            duplicates.add(uuids[i].fid);
        }
    }
}

}  // namespace

std::string GdalReader::check(const std::string& path, const std::string& layer, const std::string& optionsJson) {
    CPLJSONDocument document;
    if (!document.LoadMemory(optionsJson)) {
        fail("Invalid check options");
    }
    const CPLJSONObject options = document.GetRoot();
    const double zLow = options.GetDouble("zLow", 180);
    const double zHigh = options.GetDouble("zHigh", 3900);
    const std::string uuidField = options.GetString("uuidField", "");
    const bool checkSelfIntersections = options.GetBool("selfIntersections", true);

    CPLErrorReset();
    GDALDataset* dataset =
        GDALDataset::Open(path.c_str(), GDAL_OF_VECTOR | GDAL_OF_READONLY | GDAL_OF_VERBOSE_ERROR, nullptr, nullptr, nullptr);
    if (dataset == nullptr) {
        fail("Unable to open " + path);
    }
    OGRLayer* source = dataset->GetLayerByName(layer.c_str());
    if (source == nullptr) {
        GDALClose(dataset);
        fail("Unknown layer " + layer);
    }

    // Only the UUID field is read: the drivers then decode little more than the geometries
    OGRFeatureDefn* definition = source->GetLayerDefn();
    const int uuidIndex = uuidField.empty() ? -1 : definition->GetFieldIndex(uuidField.c_str());
    CPLStringList ignored;
    for (int i = 0; i < definition->GetFieldCount(); ++i) {
        if (i != uuidIndex) {
            ignored.AddString(definition->GetFieldDefn(i)->GetNameRef());
        }
    }
    source->SetIgnoredFields(const_cast<const char**>(ignored.List()));

    OGREnvelope swissBox;
    OGREnvelope filterBox;
    const bool hasSwissBox = readBox(options, "swissBbox", swissBox);
    const bool hasFilterBox = readBox(options, "filterBbox", filterBox);
    // The coordinate system belongs to the layer: its name is copied before the dataset is closed
    const OGRSpatialReference* crs = source->GetSpatialRef();
    const std::string crsName = crs == nullptr ? std::string()
                                : crs->GetAuthorityName(nullptr) != nullptr && crs->GetAuthorityCode(nullptr) != nullptr
                                    ? std::string(crs->GetAuthorityName(nullptr)) + ":" + crs->GetAuthorityCode(nullptr)
                                    : std::string(crs->GetName());
    if (hasSwissBox) {
        swissBox = fromLv95(swissBox, crs);
    }
    if (hasFilterBox) {
        filterBox = fromLv95(filterBox, crs);
    }

    Counters counters;
    // One GEOS context for the whole pass: creating one per feature would cost more than the check itself
    GEOSContextHandle_t geos = checkSelfIntersections ? OGRGeometry::createGEOSContext() : nullptr;
    std::vector<UuidKey> uuids;
    const GIntBig expected = source->GetFeatureCount(FALSE);
    if (uuidIndex >= 0 && expected > 0) {
        uuids.reserve(static_cast<size_t>(expected));
    }

    ErrorLog errors;
    bool readAborted = false;
    CPLPushErrorHandlerEx(collectErrors, &errors);
    source->ResetReading();
    while (true) {
        const int errorsBefore = errors.count;
        OGRFeatureUniquePtr feature(source->GetNextFeature());
        if (!feature) {
            readAborted = errors.count > errorsBefore;
            break;
        }
        const GIntBig fid = feature->GetFID();
        ++counters.features;
        if (errors.count > errorsBefore) {
            counters.corrupt.add(fid);
        }
        if (uuidIndex >= 0) {
            if (feature->IsFieldSetAndNotNull(uuidIndex) && feature->GetFieldAsString(uuidIndex)[0] != '\0') {
                const char* value = feature->GetFieldAsString(uuidIndex);
                uuids.push_back({fnv1a(value, 14695981039346656037ULL), fnv1a(value, 0x9E3779B97F4A7C15ULL), fid});
            } else {
                counters.uuidEmpty.add(fid);
            }
        }
        const OGRGeometry* geometry = feature->GetGeometryRef();
        if (geometry == nullptr || geometry->IsEmpty()) {
            counters.nullGeometries.add(fid);
            continue;
        }
        inspect(*geometry, fid, zLow, zHigh, hasSwissBox ? &swissBox : nullptr, hasFilterBox ? &filterBox : nullptr, geos, counters);
    }
    CPLPopErrorHandler();
    if (geos != nullptr) {
        OGRGeometry::freeGEOSContext(geos);
    }
    GDALClose(dataset);
    countDuplicates(uuids, counters.uuidDuplicates);

    CPLJSONObject result;
    result.Add("features", static_cast<GInt64>(counters.features));
    result.Add("vertices", static_cast<GInt64>(counters.vertices));
    result.Add("points", static_cast<GInt64>(counters.points));
    result.Add("lines", static_cast<GInt64>(counters.lines));
    result.Add("polygons", static_cast<GInt64>(counters.polygons));
    result.Add("others", static_cast<GInt64>(counters.others));
    result.Add("withZ", static_cast<GInt64>(counters.withZ));
    if (counters.withZ > 0) {
        result.Add("zMin", counters.zMin);
        result.Add("zMax", counters.zMax);
    } else {
        result.AddNull("zMin");
        result.AddNull("zMax");
    }
    result.Add("withM", static_cast<GInt64>(counters.withM));
    result.Add("crs", crsName);
    if (hasSwissBox) {
        result.Add("inSwissBox", static_cast<GInt64>(counters.inSwissBox));
    }
    if (hasFilterBox) {
        result.Add("inFilterBox", static_cast<GInt64>(counters.inFilterBox));
    }
    result.Add("uuidChecked", uuidIndex >= 0);
    result.Add("nullGeometries", counters.nullGeometries.toJson());
    result.Add("corrupt", counters.corrupt.toJson());
    result.Add("nonFinite", counters.nonFinite.toJson());
    result.Add("multiparts", counters.multiparts.toJson());
    result.Add("curves", counters.curves.toJson());
    result.Add("degenerate", counters.degenerate.toJson());
    result.Add("singlePointLines", counters.singlePointLines.toJson());
    result.Add("loops", counters.loops.toJson());
    result.Add("selfIntersectionsChecked", checkSelfIntersections);
    result.Add("selfIntersections", counters.selfIntersections.toJson());
    result.Add("repeatedVertices", counters.repeatedVertices.toJson());
    result.Add("mNotNumeric", counters.mNotNumeric.toJson());
    result.Add("mNotSteady", counters.mNotSteady.toJson());
    result.Add("mEqual", counters.mEqual.toJson());
    result.Add("zOutside", counters.zOutside.toJson());
    result.Add("uuidEmpty", counters.uuidEmpty.toJson());
    result.Add("uuidDuplicates", counters.uuidDuplicates.toJson());
    result.Add("readError", readAborted ? errors.first : std::string());
    result.Add("firstError", errors.first);
    return result.Format(CPLJSONObject::PrettyFormat::Plain);
}
