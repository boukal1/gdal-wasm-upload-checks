// GDAL virtual file system /vsiblob/: reads browser File objects in place, piece by piece, without copying them into
// the WebAssembly memory. The page hands a File to the worker with Module.registerBlob(key, file); GDAL then opens
// /vsiblob/<key> and every read becomes a synchronous FileReaderSync over File.slice(), available in a Web Worker only.
#include "gdal_reader.h"

#include <emscripten.h>
#include <sys/stat.h>

#include <algorithm>
#include <cstring>
#include <string>

namespace {

// Worker-side registry of the files handed over by the page, keyed by the part of the path after /vsiblob/
EM_JS(void, blob_registry_install, (), {
    Module['blobFiles'] = Module['blobFiles'] || new Map();
    Module['registerBlob'] = function(key, file) {
        Module['blobFiles'].set(key, file);
        return file.size;
    };
    Module['releaseBlob'] = function(key) { return Module['blobFiles'].delete(key); };
});

// Size of a registered file in bytes, -1 if unknown
EM_JS(double, blob_size, (const char* key), {
    const file = Module['blobFiles'].get(UTF8ToString(key));
    return file ? file.size : -1;
});

// Copies size bytes from offset into buffer; returns the number of bytes read, -1 if the file is unknown
EM_JS(int, blob_read, (const char* key, double offset, void* buffer, int size), {
    const file = Module['blobFiles'].get(UTF8ToString(key));
    if (!file) {
        return -1;
    }
    const bytes = new FileReaderSync().readAsArrayBuffer(file.slice(offset, offset + size));
    HEAPU8.set(new Uint8Array(bytes), buffer);
    return bytes.byteLength;
});

const char* const PREFIX = "/vsiblob/";

// One open file: registry key, size and read position
struct BlobHandle {
    std::string key;
    vsi_l_offset size;
    vsi_l_offset offset;
    bool eof;
};

// GDAL hands the callbacks the path without the /vsiblob/ prefix, i.e. the registry key
int blobStat(void*, const char* filename, VSIStatBufL* stat, int) {
    const double size = blob_size(filename);
    if (size < 0) {
        return -1;
    }
    std::memset(stat, 0, sizeof(VSIStatBufL));
    stat->st_size = static_cast<vsi_l_offset>(size);
    stat->st_mode = S_IFREG;
    return 0;
}

void* blobOpen(void*, const char* filename, const char* access) {
    if (std::strpbrk(access, "wa+") != nullptr) {
        return nullptr;
    }
    const double size = blob_size(filename);
    if (size < 0) {
        return nullptr;
    }
    return new BlobHandle{filename, static_cast<vsi_l_offset>(size), 0, false};
}

vsi_l_offset blobTell(void* file) {
    return static_cast<BlobHandle*>(file)->offset;
}

int blobSeek(void* file, vsi_l_offset offset, int whence) {
    auto* handle = static_cast<BlobHandle*>(file);
    if (whence == SEEK_SET) {
        handle->offset = offset;
    } else if (whence == SEEK_CUR) {
        handle->offset += offset;
    } else if (whence == SEEK_END) {
        handle->offset = handle->size + offset;
    } else {
        return -1;
    }
    handle->eof = false;
    return 0;
}

size_t blobRead(void* file, void* buffer, size_t size, size_t count) {
    auto* handle = static_cast<BlobHandle*>(file);
    const vsi_l_offset wanted = static_cast<vsi_l_offset>(size) * count;
    if (wanted == 0) {
        return 0;
    }
    const vsi_l_offset available = handle->offset < handle->size ? handle->size - handle->offset : 0;
    const vsi_l_offset toRead = std::min(wanted, available);
    int read = toRead > 0 ? blob_read(handle->key.c_str(), static_cast<double>(handle->offset), buffer, static_cast<int>(toRead)) : 0;
    if (read < 0) {
        read = 0;
    }
    handle->offset += read;
    if (static_cast<vsi_l_offset>(read) < wanted) {
        handle->eof = true;
    }
    return static_cast<size_t>(read) / size;
}

int blobEof(void* file) {
    return static_cast<BlobHandle*>(file)->eof ? 1 : 0;
}

int blobClose(void* file) {
    delete static_cast<BlobHandle*>(file);
    return 0;
}

}  // namespace

void GdalReader::installBlobFileSystem() {
    static bool installed = false;
    if (installed) {
        return;
    }
    installed = true;
    blob_registry_install();
    VSIFilesystemPluginCallbacksStruct* callbacks = VSIAllocFilesystemPluginCallbacksStruct();
    callbacks->stat = blobStat;
    callbacks->open = blobOpen;
    callbacks->tell = blobTell;
    callbacks->seek = blobSeek;
    callbacks->read = blobRead;
    callbacks->eof = blobEof;
    callbacks->close = blobClose;
    // GDAL groups small reads into 1 MB pieces and keeps up to 16 MB of them per open file
    callbacks->nBufferSize = 1 << 20;
    callbacks->nCacheSize = 16 << 20;
    VSIInstallPluginHandler(PREFIX, callbacks);
    VSIFreeFilesystemPluginCallbacksStruct(callbacks);
}
