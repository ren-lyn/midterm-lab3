# MongoDB Installation Guide

## Option 1: Local MongoDB Installation (Windows)

### Step 1: Download MongoDB Community Server

1. **Visit MongoDB Download Center:**
   - Go to: https://www.mongodb.com/try/download/community
   - Select "Windows" as your platform
   - Choose "Windows x64" version
   - Click "Download"

### Step 2: Install MongoDB

1. **Run the installer** (`.msi` file)
2. **Choose "Complete" installation** when prompted
3. **Install MongoDB as a Service** (recommended - check this option)
4. **Install MongoDB Compass** (GUI tool - optional but helpful)

### Step 3: Verify Installation

Open PowerShell as Administrator and run:
```powershell
# Check if MongoDB service is running
Get-Service -Name MongoDB

# If not running, start it
Start-Service -Name MongoDB

# Test MongoDB connection
mongod --version
```

### Step 4: Start MongoDB Service

MongoDB should start automatically if installed as a service. If not:

```powershell
# Start MongoDB service
net start MongoDB

# Or using Services.msc
# 1. Press Win + R, type "services.msc"
# 2. Find "MongoDB Server" service
# 3. Right-click and select "Start"
```

### Step 5: Test Connection

```powershell
# Connect to MongoDB shell
mongosh

# You should see something like:
# Current Mongosh Log ID: ...
# Connecting to: mongodb://127.0.0.1:27017/
# test>
```

### Default Connection Details:
- **Host:** localhost (127.0.0.1)
- **Port:** 27017
- **Connection String:** `mongodb://localhost:27017`

---

## Option 2: MongoDB Atlas (Cloud) Setup

### Step 1: Create MongoDB Atlas Account

1. **Visit:** https://www.mongodb.com/atlas
2. **Click "Try Free"** and create an account
3. **Verify your email address**

### Step 2: Create a Cluster

1. **Choose "Build a Database"**
2. **Select "Shared" (Free tier)**
3. **Choose a cloud provider** (AWS recommended)
4. **Select a region** (closest to your location)
5. **Keep cluster name** as "Cluster0" or choose your own
6. **Click "Create Cluster"**

### Step 3: Create Database User

1. **Set up authentication:**
   - Choose "Username and Password"
   - Create a username (e.g., "admin")
   - Generate a secure password (SAVE THIS!)
   - Click "Create User"

### Step 4: Set up Network Access

1. **Add IP Address:**
   - Click "Add IP Address"
   - Choose "Add Current IP Address"
   - Or click "Allow Access from Anywhere" (0.0.0.0/0) for development
   - Click "Confirm"

### Step 5: Get Connection String

1. **Click "Connect" on your cluster**
2. **Choose "Connect your application"**
3. **Select "Node.js" and version "4.1 or later"**
4. **Copy the connection string** - it looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 6: Update Your Application

Replace the placeholder values in your connection string:
- `<username>`: Your database username
- `<password>`: Your database password

---

## Quick Setup Commands

### For Local MongoDB (Windows):
```powershell
# Download MongoDB Community Server from:
# https://www.mongodb.com/try/download/community

# After installation, verify:
Get-Service -Name MongoDB
mongod --version
mongosh
```

### For MongoDB Atlas:
```javascript
// Update your .env file with Atlas connection string:
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/mern_crud_app?retryWrites=true&w=majority
```