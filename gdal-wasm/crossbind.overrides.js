// Libraries left out of the link. A page has no raw sockets, so curl and OpenSSL can never fetch anything;
// SpatiaLite is only loaded when SPATIALITE_LOAD is not FALSE; the reader decodes no WebP, LERC or JPEG.
// Calling into an excluded library aborts.
export default {
    curl: { exclude: true },
    openssl: { exclude: true },
    spatialite: { exclude: true },
    webp: { exclude: true },
    Lerc: { exclude: true },
    jpeg: { exclude: true },
};
