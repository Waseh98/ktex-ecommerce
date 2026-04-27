@echo off
echo ========================================
echo K-TEX DEPLOYMENT SCRIPT
echo ========================================
echo.
echo This script will push your project to GitHub.
echo.

:: Check for Git
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed on this computer.
    echo Please install Git from https://git-scm.com/ and try again.
    pause
    exit /b
)

echo [1/4] Initializing Git...
git init

echo [2/4] Adding files...
git add .
git commit -m "Initial commit: K-TEX Premium E-commerce"

echo [3/4] Creating repository...
echo Please enter your GitHub Personal Access Token (PAT) when prompted for a password.
echo (Or just use your password if you don't have a token yet, but a token is recommended).
echo.
set /p repo_name="Enter repository name (default: ktex-ecommerce): "
if "%repo_name%"=="" set repo_name=ktex-ecommerce

:: Create repo via curl (using user's password - might fail, but it's worth a try)
curl -u "Waseh98:Waseh123@#$" https://api.github.com/user/repos -d "{\"name\":\"%repo_name%\"}"

echo.
echo [4/4] Pushing to GitHub...
git remote add origin https://github.com/Waseh98/%repo_name%.git
git branch -M main
git push -u origin main

echo.
echo ========================================
echo DEPLOYMENT COMPLETE!
echo ========================================
pause
