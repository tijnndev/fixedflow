@echo off
echo ========================================
echo Building FixedFlow Optimized APK
echo ========================================
echo.

if not defined JAVA_HOME (
    if exist "C:\Program Files\Eclipse Adoptium\jdk-17.0.20.101-hotspot" (
        set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.20.101-hotspot"
    ) else (
        for /d %%J in ("C:\Program Files\Eclipse Adoptium\jdk-17*") do set "JAVA_HOME=%%~fJ"
    )
)
if defined JAVA_HOME set "PATH=%JAVA_HOME%\bin;%PATH%"

if not defined ANDROID_HOME if exist "%LOCALAPPDATA%\Android\Sdk" set "ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk"
if not defined ANDROID_SDK_ROOT if defined ANDROID_HOME set "ANDROID_SDK_ROOT=%ANDROID_HOME%"

echo JAVA_HOME=%JAVA_HOME%
echo ANDROID_HOME=%ANDROID_HOME%
echo.

if exist scripts\generate-icons.js (
    echo Generating PNG assets...
    node scripts\generate-icons.js
    echo.
)

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
