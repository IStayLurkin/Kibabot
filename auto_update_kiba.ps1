# Auto-update and restart KibaBot
Write-Host "`n🔁 Starting KibaBot auto-update..."

# Navigate to bot directory
Set-Location "$PSScriptRoot"

# Pull latest from GitHub using saved remote with token
try {
    git pull origin main
    Write-Host "✅ GitHub pull completed."
} catch {
    Write-Error "❌ Git pull failed: $_"
    exit 1
}

# Restart bot with PM2 (optional but recommended)
try {
    pm2 restart kibabot
    Write-Host "✅ KibaBot restarted via PM2."
} catch {
    Write-Warning "⚠️ Could not restart KibaBot via PM2. Is PM2 installed and configured?"
}

Write-Host "`n✅ Auto-update complete."

