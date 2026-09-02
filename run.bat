@echo off
title A-Frame Visuals Client Hub Setup & Runner
echo ========================================================
echo       A-Frame Visuals Client Hub Desktop Application    
echo ========================================================
echo.

:: Check for Node.js installation
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] Node.js is not installed or not in your PATH!
    echo.
    echo Node.js is required to run the Electron desktop app.
    echo Opening the download page in your browser...
    start "" "https://nodejs.org/"
    echo.
    echo Please download and install Node.js (LTS version), 
    echo then close and reopen this folder, and run 'run.bat' again.
    echo.
    pause
    exit /b
)

echo [OK] Node.js environment detected.
echo.

:: Check for node_modules directory to see if dependencies are installed
if not exist node_modules (
    echo [INFO] First time run: Installing Electron dependencies...
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install dependencies. Please check your internet connection and try running 'npm install' manually.
        pause
        exit /b
    )
)

echo.
echo [INFO] Launching Desktop App...
echo.
call npm start
