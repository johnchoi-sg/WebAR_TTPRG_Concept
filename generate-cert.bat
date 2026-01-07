@echo off
echo Generating self-signed SSL certificate for localhost...
echo.
echo This will allow camera access in all browsers!
echo.

npx mkcert create-ca
npx mkcert create-cert

echo.
echo ✅ Certificate generated!
echo.
echo Now run: start-https.bat
echo.
pause

