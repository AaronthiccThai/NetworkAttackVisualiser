#!/bin/bash
set -e  # Exit on error

echo "Checking and installing dependencies..."

# Update package list
sudo apt update

# Install pip3 if missing
if ! command -v pip3 &> /dev/null; then
  echo "pip3 not found, installing..."
  sudo apt install -y python3-pip
else
  echo "pip3 already installed."
fi

# Install npm if missing
if ! command -v npm &> /dev/null; then
  echo "npm not found, installing..."
  sudo apt install -y npm
else
  echo "npm already installed."
fi

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
