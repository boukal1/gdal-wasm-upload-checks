// Link-time replacements, enabled by the --wrap flags of crossbind.config.js. They keep out of the WebAssembly
// module what the reader never calls: the drivers linked by GDALAllRegister and the `gdal` command-line framework.
#include <ogrsf_frmts.h>

#include <cstdlib>

extern "C" {

// GDAL calls GDALAllRegister itself (e.g. the SQLite SQL dialect): register the reader's drivers only.
void __wrap_GDALAllRegister() {
    RegisterOGROpenFileGDB();
    RegisterOGRGeoPackage();
    RegisterOGRShape();
    RegisterOGRGeoJSON();
}

// GDALDriver::DeclareAlgorithm(const std::vector<std::string>&): drivers declare `gdal` subcommands, never run here.
void __wrap__ZN10GDALDriver16DeclareAlgorithmERKNSt3__26vectorINS0_12basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEENS5_IS7_EEEE(
    void*, const void*) {}

// GDALGlobalAlgorithmRegistry::GetSingleton(): the `gdal` command-line framework is not linked.
void* __wrap__ZN27GDALGlobalAlgorithmRegistry12GetSingletonEv() {
    std::abort();
}
}
