@echo off
echo ========================================
echo Building FixedFlow Optimized APK
echo ========================================
echo.

REM Navigate to android directory
cd android

echo Building release APK...
call gradlew.bat assembleRelease
set BUILD_ERROR=%errorlevel%

if %BUILD_ERROR% neq 0 (
    echo.
    echo ========================================
    echo BUILD FAILED!
    echo ========================================
    cd ..
    pause
    exit /b %BUILD_ERROR%
)

echo.
echo ========================================
echo BUILD SUCCESSFUL!
echo ========================================
echo.

REM Navigate back to project root
cd ..

echo Copying APK to project root...
copy /Y android\app\build\outputs\apk\release\app-release.apk fixedflow-release.apk
set COPY_ERROR=%errorlevel%

if %COPY_ERROR% neq 0 (
    echo Failed to copy APK!
    pause
    exit /b %COPY_ERROR%
)

echo.
echo ========================================
echo APK created successfully!
echo Location: fixedflow-release.apk
echo ========================================
echo.

REM Display file size
setlocal enabledelayedexpansion
for %%A in (fixedflow-release.apk) do (
    set size=%%~zA
    set /a sizeMB=!size! / 1048576
    echo File size: !sizeMB! MB
)
endlocal

echo.
pause
