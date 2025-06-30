#!/bin/bash

echo "Installing backend dependencies..."
(cd backend && pip install Flask flask-cors)


# Start backend
echo "Starting backend..."
(cd backend && python3 run.py) &



echo "Installing dependences..."
(cd frontend 
  npm install
) && echo "Frontend dependencies installed "

# Start frontend 
echo "Starting frontend..."
(cd frontend && npm run dev) &

# Wait for both processes to finish (CTRL+C will exit)
wait
