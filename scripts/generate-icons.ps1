Add-Type -AssemblyName System.Drawing

$monoPath = "d:\talenty website\public\images\talenty-monogram.png"
$logoPath = "d:\talenty website\public\images\talenty-logo-full.png"

$monoImg = [System.Drawing.Image]::FromFile($monoPath)
$logoImg = [System.Drawing.Image]::FromFile($logoPath)

function Resize-Image {
    param(
        [System.Drawing.Image]$src,
        [int]$targetW,
        [int]$targetH,
        [string]$bgHex,
        [string]$outputPath
    )
    $bmp = New-Object System.Drawing.Bitmap($targetW, $targetH)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    if ($bgHex) {
        $color = [System.Drawing.ColorTranslator]::FromHtml($bgHex)
        $brush = New-Object System.Drawing.SolidBrush($color)
        $g.FillRectangle($brush, 0, 0, $targetW, $targetH)
    } else {
        $g.Clear([System.Drawing.Color]::Transparent)
    }

    $margin = [int]($targetW * 0.08)
    $availW = $targetW - ($margin * 2)
    $availH = $targetH - ($margin * 2)

    $ratio = [Math]::Min($availW / $src.Width, $availH / $src.Height)
    $newW = [int]($src.Width * $ratio)
    $newH = [int]($src.Height * $ratio)

    $posX = [int](($targetW - $newW) / 2)
    $posY = [int](($targetH - $newH) / 2)

    $g.DrawImage($src, $posX, $posY, $newW, $newH)
    $bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
}

# 1. Favicon files
Resize-Image -src $monoImg -targetW 32 -targetH 32 -bgHex "#F7F2E4" -outputPath "d:\talenty website\public\favicon.ico"
Resize-Image -src $monoImg -targetW 32 -targetH 32 -bgHex $null -outputPath "d:\talenty website\public\icon.png"
Resize-Image -src $monoImg -targetW 32 -targetH 32 -bgHex $null -outputPath "d:\talenty website\public\icon-light-32x32.png"
Resize-Image -src $monoImg -targetW 32 -targetH 32 -bgHex $null -outputPath "d:\talenty website\public\icon-dark-32x32.png"
Resize-Image -src $monoImg -targetW 32 -targetH 32 -bgHex $null -outputPath "d:\talenty website\app\icon.png"

# 2. Apple Touch Icon files
Resize-Image -src $monoImg -targetW 180 -targetH 180 -bgHex "#F7F2E4" -outputPath "d:\talenty website\public\apple-touch-icon.png"
Resize-Image -src $monoImg -targetW 180 -targetH 180 -bgHex "#F7F2E4" -outputPath "d:\talenty website\public\apple-icon.png"
Resize-Image -src $monoImg -targetW 180 -targetH 180 -bgHex "#F7F2E4" -outputPath "d:\talenty website\app\apple-icon.png"

# 3. PWA Icons (192x192 and 512x512)
Resize-Image -src $monoImg -targetW 192 -targetH 192 -bgHex "#F7F2E4" -outputPath "d:\talenty website\public\android-chrome-192x192.png"
Resize-Image -src $monoImg -targetW 192 -targetH 192 -bgHex "#F7F2E4" -outputPath "d:\talenty website\public\icon-192.png"
Resize-Image -src $monoImg -targetW 512 -targetH 512 -bgHex "#F7F2E4" -outputPath "d:\talenty website\public\android-chrome-512x512.png"
Resize-Image -src $monoImg -targetW 512 -targetH 512 -bgHex "#F7F2E4" -outputPath "d:\talenty website\public\icon-512.png"

# 4. 1200x630 Social Preview og-image.png
$ogBmp = New-Object System.Drawing.Bitmap(1200, 630)
$ogG = [System.Drawing.Graphics]::FromImage($ogBmp)
$ogG.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$ogG.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

$creamColor = [System.Drawing.ColorTranslator]::FromHtml('#F7F2E4')
$ogG.FillRectangle((New-Object System.Drawing.SolidBrush($creamColor)), 0, 0, 1200, 630)

$logoW = 480
$logoRatio = $logoW / $logoImg.Width
$logoH = [int]($logoImg.Height * $logoRatio)
$logoX = [int]((1200 - $logoW) / 2)
$logoY = [int]((630 - $logoH) / 2)

$ogG.DrawImage($logoImg, $logoX, $logoY, $logoW, $logoH)
$ogBmp.Save("d:\talenty website\public\og-image.png", [System.Drawing.Imaging.ImageFormat]::Png)
$ogG.Dispose()
$ogBmp.Dispose()

$monoImg.Dispose()
$logoImg.Dispose()
Write-Host "Brand icons generated successfully!"
