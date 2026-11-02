# Builds the measurement series: one synthetic source converted with ogr2ogr 3.13.3 (Docker) to FileGDB,
# Shapefile and GeoJSON, zipped at about 1, 10, 100 and 1000 MB each, into testdata\out\messung.
# The object count per size is calibrated per format on a sample, since each format compresses differently.
param([int[]] $SizesMb = @(1, 10, 100, 1000))
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem
$root = Split-Path $PSScriptRoot -Parent
$work = Join-Path $root 'work\messung'
$out = Join-Path $root 'out\messung'
$image = 'ghcr.io/osgeo/gdal:ubuntu-small-3.13.3'
New-Item -ItemType Directory -Force $work, $out | Out-Null

$formats = @(
    @{ key = 'gdb'; target = 'kanten.gdb'; args = @('-f', 'OpenFileGDB', '-nlt', 'MULTICURVEZ', '-lco', 'TARGET_ARCGIS_VERSION=ARCGIS_PRO_3_2_OR_LATER') },
    @{ key = 'shp'; target = 'shp'; args = @('-f', 'ESRI Shapefile', '-nlt', 'MULTILINESTRINGZ', '-lco', 'ENCODING=UTF-8') },
    @{ key = 'geojson'; target = 'geojson/kanten.geojson'; args = @('-f', 'GeoJSON', '-nlt', 'MULTILINESTRINGZ', '-lco', 'COORDINATE_PRECISION=3') }
)

function Invoke-Ogr2Ogr([string[]] $arguments) {
    docker run --rm -v "${work}:/data" -w /data $image ogr2ogr @arguments
    if ($LASTEXITCODE -ne 0) { throw "ogr2ogr failed: $arguments" }
}

# Converts the first $count lines of the source to one format and zips the result; returns the ZIP size
function New-Zip($format, [string] $source, [long] $count, [string] $zipPath) {
    $folder = Join-Path $work $format.key
    Remove-Item $folder -Recurse -Force -ErrorAction SilentlyContinue
    New-Item -ItemType Directory -Force $folder | Out-Null
    if ($format.key -eq 'geojson') { New-Item -ItemType Directory -Force (Join-Path $folder 'geojson') | Out-Null }
    $target = "$($format.key)/$($format.target)"
    Invoke-Ogr2Ogr (@($format.args) + @($target, $source, '-a_srs', 'EPSG:2056', '-nln', 'Kanten', '-limit', "$count",
        '-oo', 'GEOM_POSSIBLE_NAMES=WKT', '-oo', 'KEEP_GEOM_COLUMNS=NO'))
    Remove-Item $zipPath -Force -ErrorAction SilentlyContinue
    $content = Join-Path $folder ($format.target -replace '/[^/]+$', '')
    if ($format.key -eq 'gdb') {
        [IO.Compression.ZipFile]::CreateFromDirectory((Join-Path $folder $format.target), $zipPath, 'Optimal', $true)
    } else {
        [IO.Compression.ZipFile]::CreateFromDirectory($content, $zipPath, 'Optimal', $false)
    }
    Remove-Item $folder -Recurse -Force
    return (Get-Item $zipPath).Length
}

# Calibration on 200'000 objects
$sample = 200000
node (Join-Path $PSScriptRoot 'generate-measure-csv.mjs') (Join-Path $work 'sample.csv') $sample
$bytesPerObject = @{}
foreach ($format in $formats) {
    $size = New-Zip $format 'sample.csv' $sample (Join-Path $work "sample_$($format.key).zip")
    $bytesPerObject[$format.key] = $size / $sample
    Write-Host ('{0}: {1:N1} bytes per object zipped' -f $format.key, $bytesPerObject[$format.key])
}

$maxCount = [long](($SizesMb | Measure-Object -Maximum).Maximum * 1MB / ($bytesPerObject.Values | Measure-Object -Minimum).Minimum) + 1000
node (Join-Path $PSScriptRoot 'generate-measure-csv.mjs') (Join-Path $work 'source.csv') $maxCount

foreach ($sizeMb in $SizesMb) {
    foreach ($format in $formats) {
        $count = [long]($sizeMb * 1MB / $bytesPerObject[$format.key])
        $zip = Join-Path $out ('messung_{0}_{1:D4}mb.zip' -f $format.key, $sizeMb)
        $start = Get-Date
        $size = New-Zip $format 'source.csv' $count $zip
        Write-Host ('{0,-40} {1,12:N0} Objekte {2,10:N1} MB  ({3:N0} s)' -f (Split-Path $zip -Leaf), $count, ($size / 1MB), ((Get-Date) - $start).TotalSeconds)
    }
}
