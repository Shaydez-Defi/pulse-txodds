# Run once from project root: powershell -ExecutionPolicy Bypass -File scripts/download-hero-videos.ps1
$out = Join-Path $PSScriptRoot "..\public\videos"
New-Item -ItemType Directory -Force -Path $out | Out-Null

$videos = @{
  "wembley.mp4"  = "https://cdn.mixkit.co/videos/preview/mixkit-aerial-view-of-a-soccer-field-4379-large.mp4"
  "camp-nou.mp4" = "https://cdn.mixkit.co/videos/preview/mixkit-soccer-ball-in-the-grass-1464-large.mp4"
  "san-siro.mp4" = "https://cdn.mixkit.co/videos/preview/mixkit-football-stadium-at-night-4387-large.mp4"
  "maracana.mp4" = "https://cdn.mixkit.co/videos/preview/mixkit-soccer-player-dribbling-the-ball-4350-large.mp4"
  "lusail.mp4"   = "https://cdn.mixkit.co/videos/preview/mixkit-people-watching-a-soccer-game-4378-large.mp4"
}

foreach ($entry in $videos.GetEnumerator()) {
  $dest = Join-Path $out $entry.Key
  Write-Host "Downloading $($entry.Key)..."
  curl.exe -L --fail -o $dest $entry.Value
  if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed: $($entry.Key)"
    exit 1
  }
}

Write-Host "Done. Refresh the app to see hero videos."