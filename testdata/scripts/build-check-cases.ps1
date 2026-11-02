# Builds the test cases of the upload checks with the official GDAL 3.13.3 image, as zipped GeoPackages:
# pruefung_fehler.gpkg.zip triggers each check on a known feature (see the "name" field), pruefung_ok.gpkg.zip passes all.
$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
$work = Join-Path $root 'work\pruefung'
$out = Join-Path $root 'out'
$image = 'ghcr.io/osgeo/gdal:ubuntu-small-3.13.3'

Remove-Item $work -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force $work, $out | Out-Null
node (Join-Path $PSScriptRoot 'generate-check-cases.mjs') $work

function Invoke-Gdal([string] $tool, [string[]] $arguments) {
    docker run --rm -v "${work}:/data" -w /data $image $tool @arguments
    if ($LASTEXITCODE -ne 0) { throw "$tool failed: $arguments" }
}

$csv = @('-oo', 'GEOM_POSSIBLE_NAMES=WKT', '-oo', 'KEEP_GEOM_COLUMNS=NO', '-a_srs', 'EPSG:2056', '-nln', 'Kanten', '-lco', 'GEOMETRY_NAME=geom')
# No spatial index: its triggers would reject the corrupt geometry written below
Invoke-Gdal 'ogr2ogr' (@('-f', 'GPKG', 'pruefung_fehler.gpkg', 'fehler.csv', '-lco', 'SPATIAL_INDEX=NO') + $csv)
Invoke-Gdal 'ogr2ogr' (@('-f', 'GPKG', 'pruefung_ok.gpkg', 'ok.csv', '-nlt', 'LINESTRINGZM') + $csv)

# FID 20: replace the geometry with a truncated blob (GeoPackage header, then a LineString announcing 5 points and none)
Invoke-Gdal 'ogrinfo' @('pruefung_fehler.gpkg', '-sql', "UPDATE Kanten SET geom = X'47500001080800000102000000050000000000' WHERE fid = 20")

foreach ($name in 'pruefung_fehler', 'pruefung_ok') {
    Compress-Archive -Path (Join-Path $work "$name.gpkg") -DestinationPath (Join-Path $out "$name.gpkg.zip") -Force
}
Get-ChildItem (Join-Path $out 'pruefung_*') | Select-Object Name, Length
