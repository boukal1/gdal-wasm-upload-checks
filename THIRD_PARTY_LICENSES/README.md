# Third-party licenses

The WebAssembly module (`angular/projects/gdal-reader/assets/gdal/`) statically links the libraries below, built by
[crossbind](https://crossbind.dev) (`@crossbind/port-*` packages). Their license texts are in this folder.

| Library | Version | License | File |
| --- | --- | --- | --- |
| GDAL | 3.13.3 | MIT | `gdal.txt` |
| PROJ (with `proj.db` in the `.data.txt` file) | 9.9.0 | MIT | `proj.txt` |
| GEOS | 3.15.0 | LGPL-2.1-or-later | `geos.txt` |
| libiconv | 1.19 | LGPL-2.1-or-later | `iconv.txt` |
| libtiff | 4.7.2 | libtiff license | `tiff.txt` |
| libgeotiff | 1.7.4 | MIT-style | `geotiff.txt` |
| Expat | 2.9.0 | MIT | `expat.txt` |
| Zstandard | 1.5.7 | BSD | `zstd.txt` |
| SQLite | 3.54.1 | Public domain | |
| zlib | 1.3.2 | zlib license | |
| crossbind runtime (JavaScript loader) | 2.0.0-beta.68 | MIT | `crossbind.txt` |
| Emscripten runtime (JavaScript loader) | | MIT / University of Illinois NCSA | |

Left out of the link (`gdal-wasm/crossbind.overrides.js`), so not distributed: curl, OpenSSL, SpatiaLite, WebP, LERC,
libjpeg-turbo.

GEOS and libiconv are LGPL-2.1: their sources are available from their projects
([GEOS 3.15.0](https://github.com/libgeos/geos), [libiconv 1.19](https://www.gnu.org/software/libiconv/)). The
WebAssembly module is a separate, replaceable file, and `gdal-wasm/` contains everything needed to rebuild it, also
with modified versions of these libraries (crossbind `replace` overrides).
