@echo off
echo Starting MERN CRUD Application...
echo.

echo Checking if MongoDB is running...
echo Please make sure MongoDB is installed and running on your system.
echo If using MongoDB Atlas, ensure your connection string is correct in .env file.
echo.

echo Starting backend server...
start cmd /k "cd /d %~dp0 && npm run server"

echo Waiting for backend to start...
timeout /t 3 /nobreak >nul

echo Starting frontend React app...
start cmd /k "cd /d %~dp0\frontend && npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit this window...
pause >nul