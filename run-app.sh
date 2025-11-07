#!/bin/bash

echo "🚀 Starting Vibe Commerce App..."

# Kill any existing processes
pkill -f "node index.js" 2>/dev/null
pkill -f "nodemon" 2>/dev/null
pkill -f "react-scripts" 2>/dev/null

echo "🔧 Starting backend on port 8000..."
cd server
node index.js &
BACKEND_PID=$!
cd ..

echo "⏳ Waiting 3 seconds for backend to start..."
sleep 3

echo "🎨 Starting frontend on port 3000..."
cd client
npm start &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ App is starting!"
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop"

# Keep script running
trap "echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT
wait