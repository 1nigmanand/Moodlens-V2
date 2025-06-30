#!/bin/bash

# Moodlens V2 Development Startup Script

echo "🚀 Starting Moodlens V2 Development Environment..."

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
if ! command_exists node; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

if ! command_exists npm; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Prerequisites checked"

# Start backend in background
echo "🔧 Starting backend server..."
cd Moodlens-backend
if [ ! -f ".env" ]; then
    echo "⚠️  Backend .env file not found. Please create one with your GOOGLE_API_KEY"
    exit 1
fi

npm start &
BACKEND_PID=$!
echo "✅ Backend started (PID: $BACKEND_PID)"

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "🎨 Starting frontend..."
cd ../moodlens-frontend
if [ ! -f ".env" ]; then
    echo "⚠️  Frontend .env file not found. Creating default..."
    echo "REACT_APP_BACKEND_URL=http://localhost:3001" > .env
fi

npm start &
FRONTEND_PID=$!
echo "✅ Frontend started (PID: $FRONTEND_PID)"

echo ""
echo "🎉 Moodlens V2 is now running!"
echo "📱 Frontend: http://localhost:3000"
echo "🔌 Backend: http://localhost:3001/process"
echo ""
echo "Press Ctrl+C to stop both servers"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Servers stopped"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for both processes
wait
