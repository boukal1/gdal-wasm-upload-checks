#pragma once

#include <cpl_conv.h>
#include <cpl_error.h>
#include <cpl_string.h>
#include <cpl_vsi.h>
#include <gdal.h>
#include <gdal_utils.h>
#include <ogrsf_frmts.h>

#include <stdexcept>
#include <string>
#include <vector>

/**
 * Reads vector datasets (FileGDB, GeoPackage, Shapefile, GeoJSON) with GDAL and reports them as ogrinfo JSON.
 * Exposed to JavaScript by crossbind; paths are GDAL paths, e.g. /vsizip/ over a file mounted by autoMountFiles().
 *
 * @author boukal1
 * @since 0.0.1
 */
class GdalReader {
public:
    /**
     * Registers only the vector drivers accepted by the upload, and the /vsiblob/ file system that reads
     * browser files in place (blob_file_system.cpp).
     */
    GdalReader() {
        RegisterOGROpenFileGDB();
        RegisterOGRGeoPackage();
        RegisterOGRShape();
        RegisterOGRGeoJSON();
        installBlobFileSystem();
    }

    /**
     * @return the GDAL release name, e.g. "3.13.3"
     */
    std::string version() {
        return GDALVersionInfo("RELEASE_NAME");
    }

    /**
     * Lists the files below a directory or archive.
     *
     * @param path GDAL path of the directory or archive, e.g. /vsizip//memfs/app/data.zip
     * @return one relative path per line (directories end with '/'), empty if the path does not exist
     */
    std::string listFiles(const std::string& path) {
        char** files = VSIReadDirRecursive(path.c_str());
        std::string result;
        for (int i = 0; files != nullptr && files[i] != nullptr; ++i) {
            result += files[i];
            result += '\n';
        }
        CSLDestroy(files);
        return result;
    }

    /**
     * Describes every layer of a dataset like `ogrinfo -json -so`: fields, geometry type, CRS, extent, feature count.
     *
     * @param path GDAL path of the dataset
     * @return the ogrinfo JSON report
     * @throws std::runtime_error with GDAL's message if the dataset cannot be opened or read
     */
    std::string info(const std::string& path) {
        return vectorInfo(path, {"-json", "-so"});
    }

    /**
     * Returns the first features of one layer like `ogrinfo -json -features -limit`.
     *
     * @param path GDAL path of the dataset
     * @param layer name of the layer to read
     * @param limit maximum number of features returned
     * @return the ogrinfo JSON report, features included as GeoJSON
     * @throws std::runtime_error with GDAL's message if the dataset or the layer cannot be read
     */
    std::string features(const std::string& path, const std::string& layer, int limit) {
        return vectorInfo(path, {"-json", "-features", "-limit", std::to_string(limit), layer});
    }

    /**
     * Returns the Z range of a layer only if the driver knows it without reading the features (file header).
     *
     * @param path GDAL path of the dataset
     * @param layer name of the layer
     * @return JSON object {"zMin":..,"zMax":..}, or "null" if the driver cannot tell without a full read
     * @throws std::runtime_error with GDAL's message if the dataset or the layer cannot be opened
     */
    std::string headerZRange(const std::string& path, const std::string& layer) {
        CPLErrorReset();
        GDALDataset* dataset =
            GDALDataset::Open(path.c_str(), GDAL_OF_VECTOR | GDAL_OF_READONLY | GDAL_OF_VERBOSE_ERROR, nullptr, nullptr, nullptr);
        if (dataset == nullptr) {
            fail("Unable to open " + path);
        }
        OGRLayer* source = dataset->GetLayerByName(layer.c_str());
        OGREnvelope3D envelope;
        const bool known = source != nullptr && source->GetExtent3D(0, &envelope, false) == OGRERR_NONE && envelope.Is3D();
        GDALClose(dataset);
        if (!known) {
            return "null";
        }
        return std::string("{\"zMin\":") + CPLSPrintf("%.15g", envelope.MinZ) + ",\"zMax\":" + CPLSPrintf("%.15g", envelope.MaxZ) + "}";
    }

    /**
     * Reads every feature of a layer once (attributes skipped, except the UUID field) and counts what the upload
     * checks look at, with the FID of the first offending feature: geometry families, NULL, multiparts and aggregates,
     * arcs, degenerate and corrupt geometries, single-point lines, loops, M values, Z range, Swiss and filter
     * bounding boxes, empty and duplicate UUIDs (defined in upload_checks.cpp).
     *
     * @param path GDAL path of the dataset
     * @param layer name of the layer to read
     * @param optionsJson {"zLow":180,"zHigh":3500,"swissBbox":[xmin,ymin,xmax,ymax],"filterBbox":[...],"uuidField":"uuid"};
     *        boxes in LV95 (EPSG:2056), each key optional
     * @return JSON object with the totals and one {"count","example"} counter per check
     * @throws std::runtime_error with GDAL's message if the options are invalid or the layer cannot be opened
     */
    std::string check(const std::string& path, const std::string& layer, const std::string& optionsJson);

private:
    /**
     * Installs the /vsiblob/ file system once (defined in blob_file_system.cpp).
     */
    static void installBlobFileSystem();

    /**
     * Opens the dataset read-only and runs GDALVectorInfo (the ogrinfo library entry point) on it.
     */
    static std::string vectorInfo(const std::string& path, const std::vector<std::string>& args) {
        CPLErrorReset();
        GDALDatasetH dataset =
            GDALOpenEx(path.c_str(), GDAL_OF_VECTOR | GDAL_OF_READONLY | GDAL_OF_VERBOSE_ERROR, nullptr, nullptr, nullptr);
        if (dataset == nullptr) {
            fail("Unable to open " + path);
        }

        CPLStringList arguments;
        for (const std::string& arg : args) {
            arguments.AddString(arg.c_str());
        }
        GDALVectorInfoOptions* options = GDALVectorInfoOptionsNew(arguments.List(), nullptr);
        char* report = options != nullptr ? GDALVectorInfo(dataset, options) : nullptr;
        GDALVectorInfoOptionsFree(options);
        GDALClose(dataset);
        if (report == nullptr) {
            fail("Unable to read " + path);
        }

        std::string result(report);
        CPLFree(report);
        return result;
    }

    /**
     * Throws GDAL's last error message, or the fallback when GDAL gave none.
     */
    [[noreturn]] static void fail(const std::string& fallback) {
        const std::string reason = CPLGetLastErrorMsg();
        throw std::runtime_error(reason.empty() ? fallback : reason);
    }
};
