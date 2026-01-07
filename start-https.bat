@echo off
echo Starting HTTPS server on localhost:8000...
echo.
echo Camera will work with HTTPS!
echo.
echo Open: https://localhost:8000
echo.
npx http-server -p 8000 -S -C cert.pem -K key.pem

