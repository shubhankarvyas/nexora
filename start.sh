#!/bin/bash

echo "🚀 Starting Vibe Commerce Application..."

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first:"
    echo "   brew services start mongodb/brew/mongodb-community"
    echo "   or run: mongod"
    exit 1
fi

echo "📦 Installing dependencies..."
npm install
cd server && npm install && cd ..
cd client && npm install && cd ..

echo "🔧 Starting backend server..."
cd server
npm run dev &
SERVER_PID=$!
cd ..

echo "⏳ Waiting for backend to start..."
sleep 3

echo "🎨 Starting frontend..."
cd client
npm start &
CLIENT_PID=$!
cd ..

echo "✅ Application started!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:5001"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
trap "kill $SERVER_PID $CLIENT_PID; exit" INT
wait