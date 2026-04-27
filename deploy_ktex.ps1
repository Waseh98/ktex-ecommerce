Write-Host "========================================" -ForegroundColor Gold
Write-Host "K-TEX DEPLOYMENT SCRIPT" -ForegroundColor Gold
Write-Host "========================================" -ForegroundColor Gold

# Check for Git
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] Git is not installed on this computer." -ForegroundColor Red
    Write-Host "Please install Git from https://git-scm.com/ and try again."
    Read-Host "Press Enter to exit..."
    exit
}

Write-Host "[1/4] Initializing Git..."
git init

Write-Host "[2/4] Adding files..."
git add .
git commit -m "Initial commit: K-TEX Premium E-commerce"

Write-Host "[3/4] Creating repository..."
$repoName = "ktex-ecommerce"
$user = "Waseh98"
$pass = "Waseh123@#$"

$base64Auth = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("${user}:${pass}"))
$headers = @{
    "Authorization" = "Basic $base64Auth"
    "Content-Type"  = "application/json"
}

try {
    Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Method Post -Body (@{ name = $repoName } | ConvertTo-Json) -Headers $headers
    Write-Host "Repository '$repoName' created successfully." -ForegroundColor Green
} catch {
    Write-Host "Repository might already exist or API error: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host "[4/4] Pushing to GitHub..."
git remote add origin "https://github.com/$user/$repoName.git"
git branch -M main
git push -u origin main

Write-Host "========================================" -ForegroundColor Gold
Write-Host "DEPLOYMENT COMPLETE!" -ForegroundColor Gold
Write-Host "========================================" -ForegroundColor Gold
Read-Host "Press Enter to exit..."
