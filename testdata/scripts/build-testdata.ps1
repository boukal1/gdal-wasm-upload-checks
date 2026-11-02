# Builds the PoC test datasets with the official GDAL 3.13.3 image, zipped as they are uploaded:
# FileGDB with ArcGIS Pro 3.2 field types (DateOnly, BigInteger), classic FileGDB, GeoPackage, Shapefile, GeoJSON,
# plus a large GeoPackage and FileGDB (200'000 Kanten) to measure reading times.
$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
$work = Join-Path $root 'work'
$out = Join-Path $root 'out'
$image = 'ghcr.io/osgeo/gdal:ubuntu-small-3.13.3'

# Only the work folder is wiped: out\ also holds test files added by hand, the archives below are overwritten one by one
Remove-Item $work -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force $work, $out | Out-Null

node (Join-Path $PSScriptRoot 'generate-geojson.mjs') (Join-Path $work 'src') 20
node (Join-Path $PSScriptRoot 'generate-geojson.mjs') (Join-Path $work 'src') 200000 gross_

function Invoke-Ogr2Ogr([string[]] $arguments) {
    docker run --rm -v "${work}:/data" -w /data $image ogr2ogr @arguments
    if ($LASTEXITCODE -ne 0) { throw "ogr2ogr failed: $arguments" }
}

# Kanten and Knoten in one dataset; $options are the layer creation options of the target format
function New-Dataset([string] $format, [string] $target, [string] $prefix, [string[]] $options) {
    $creation = $options | ForEach-Object { '-lco', $_ }
    # Kanten mix LineString and MultiLineString, as polylines do in a FileGDB
    Invoke-Ogr2Ogr (@('-f', $format, $target, "src/${prefix}kanten.geojson", '-a_srs', 'EPSG:2056', '-nln', 'Kanten', '-nlt', 'MULTILINESTRING') + $creation)
    Invoke-Ogr2Ogr (@('-f', $format, '-update', $target, "src/${prefix}knoten.geojson", '-a_srs', 'EPSG:2056', '-nln', 'Knoten') + $creation)
}

$pro32 = @('TARGET_ARCGIS_VERSION=ARCGIS_PRO_3_2_OR_LATER')
New-Dataset 'OpenFileGDB' 'fachdaten_pro32.gdb' '' $pro32
New-Dataset 'OpenFileGDB' 'fachdaten_klassisch.gdb' '' @()
New-Dataset 'GPKG' 'fachdaten.gpkg' '' @()
New-Item -ItemType Directory -Force (Join-Path $work 'shp') | Out-Null
New-Dataset 'ESRI Shapefile' 'shp' '' @('ENCODING=UTF-8')
New-Dataset 'OpenFileGDB' 'gross_pro32.gdb' 'gross_' $pro32
New-Dataset 'GPKG' 'gross.gpkg' 'gross_' @()

Compress-Archive -Path (Join-Path $work 'fachdaten_pro32.gdb') -DestinationPath (Join-Path $out 'fachdaten_pro32.gdb.zip') -Force
Compress-Archive -Path (Join-Path $work 'fachdaten_klassisch.gdb') -DestinationPath (Join-Path $out 'fachdaten_klassisch.gdb.zip') -Force
Compress-Archive -Path (Join-Path $work 'fachdaten.gpkg') -DestinationPath (Join-Path $out 'fachdaten.gpkg.zip') -Force
Compress-Archive -Path (Join-Path $work 'shp\*') -DestinationPath (Join-Path $out 'fachdaten.shp.zip') -Force
Compress-Archive -Path (Join-Path $work 'src\kanten.geojson') -DestinationPath (Join-Path $out 'kanten.geojson.zip') -Force
Copy-Item (Join-Path $work 'src\kanten.geojson') (Join-Path $out 'kanten.geojson')
Compress-Archive -Path (Join-Path $work 'gross_pro32.gdb') -DestinationPath (Join-Path $out 'gross_pro32.gdb.zip') -Force
Compress-Archive -Path (Join-Path $work 'gross.gpkg') -DestinationPath (Join-Path $out 'gross.gpkg.zip') -Force

# Error cases: a ZIP without geodata, and a ZIP whose .gpkg is not a GeoPackage
Compress-Archive -Path (Join-Path $PSScriptRoot '*') -DestinationPath (Join-Path $out 'fehler_keine_geodaten.zip') -Force
New-Item -ItemType Directory -Force (Join-Path $work 'kaputt') | Out-Null
Set-Content -Path (Join-Path $work 'kaputt\daten.gpkg') -Value 'kein GeoPackage'
Compress-Archive -Path (Join-Path $work 'kaputt\daten.gpkg') -DestinationPath (Join-Path $out 'fehler_kaputt.gpkg.zip') -Force

Get-ChildItem $out | Select-Object Name, Length
