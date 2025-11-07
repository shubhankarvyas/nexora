# 🚀 Quick Start Guide

## Step 1: Install Dependencies
```bash
npm install
cd server && npm install && cd ..
cd client && npm install && cd ..
```

## Step 2: Make sure MongoDB is running
```bash
brew services start mongodb/brew/mongodb-community
```

## Step 3: Start the app
```bash
./run-app.sh
```

## Step 4: Open your browser
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000

## Alternative: Manual start
If the script doesn't work, run manually:

**Terminal 1 (Backend):**
```bash
cd server
node index.js
```

**Terminal 2 (Frontend):**
```bash
cd client
npm start
```

## Test the API
```bash
curl http://localhost:8000/api/products
```

That's it! The app should be running with 8 products, full cart functionality, and checkout process.