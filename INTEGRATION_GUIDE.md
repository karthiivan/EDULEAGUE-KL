# EduLeague - Frontend-Backend Integration Guide

## Current Status: ✅ Phase 2 Complete - Ready to Connect!

---

## 🎯 What We've Done

### ✅ Installed Packages:
- **Frontend:** axios (for API calls)
- **Backend:** express, mongoose, cors, jsonwebtoken, bcryptjs, dotenv

### ✅ Created Files:
- `src/services/api.js` - API service layer with all endpoints
- Backend already has `server/server.js` configured
- Environment variables in `server/.env` with MongoDB Atlas connection

### ✅ Updated Code:
- AuthContext now supports both mock data and real API
- Toggle variable `USE_REAL_API` to switch between modes

---

## 🚀 How to Run (Two Options)

### **Option 1: Mock Data (Current - No Backend Needed)**

Just run the frontend:
```bash
npm start
```

**Status:** Uses hardcoded data from `src/data/` files
**Good for:** Presentations, demos without database setup

---

### **Option 2: Real Backend Connection**

#### **Step 1: Start MongoDB**

**If using MongoDB Atlas (Cloud - Recommended):**
- Already configured in `.env` file!
- Connection string: `mongodb+srv://vangarukarthik1234:kar@edu.icgwsz7.mongodb.net/eduleague`
- No local MongoDB installation needed ✅

**If using Local MongoDB:**
1. Install MongoDB from: https://www.mongodb.com/try/download/community
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # Mac/Linux
   sudo systemctl start mongod
   ```
3. Update `.env` to use: `MONGODB_URI=mongodb://localhost:27017/eduleague`

---

#### **Step 2: Start Backend Server**

Open **Terminal 1**:
```bash
cd server
node server.js
```

**You should see:**
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
📡 Socket.io server ready
🌍 Environment: development
```

---

#### **Step 3: Enable Real API in Frontend**

Open `src/context/AuthContext.js` and change:
```javascript
const USE_REAL_API = false; // Change this to true
```

To:
```javascript
const USE_REAL_API = true; // Now using real backend!
```

---

#### **Step 4: Start Frontend**

Open **Terminal 2**:
```bash
npm start
```

**Frontend runs on:** http://localhost:3000
**Backend runs on:** http://localhost:5000

---

## 📊 Testing the Connection

### **1. Check Backend Health**
Open browser: http://localhost:5000/api/health

**Should see:**
```json
{
  "status": "OK",
  "message": "EduLeague API is running",
  "timestamp": "2024-11-02T..."
}
```

### **2. Test Login**
1. Go to http://localhost:3000
2. Try logging in with:
   - Email: `karthikeya@kluniversity.in`
   - Password: `password123`

**If using real API:**
- First login will fail (user not in database yet)
- Need to register first OR seed database

---

## 🌱 Seeding Database (Adding Demo Users)

Create `server/seed.js`:
```javascript
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const users = [
  {
    name: 'Karthikeya',
    email: 'karthikeya@kluniversity.in',
    password: 'password123', // Will be hashed
    rollNo: '2410030092',
    role: 'student',
    year: 2,
    branch: 'CSE',
    xp: 9999,
    streak: 150
  },
  // Add more users...
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await User.deleteMany({}); // Clear existing
    await User.create(users);
    console.log('✅ Database seeded!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
```

Run:
```bash
cd server
node seed.js
```

---

## 🔄 API Endpoints Available

### **Authentication:**
- `POST /api/users/login` - Login
- `POST /api/users/register` - Register
- `GET /api/users/profile` - Get profile

### **Problems:**
- `GET /api/problems` - Get all problems
- `GET /api/problems/:id` - Get problem by ID
- `POST /api/problems/:id/submit` - Submit solution

### **Placements:**
- `GET /api/placements` - Get all placements

### **Projects:**
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project
- `POST /api/projects/:id/join` - Join project

### **And more...**

---

## 🐛 Troubleshooting

### **Problem: Backend won't start**
**Solution:**
```bash
cd server
npm install
node server.js
```

### **Problem: MongoDB connection error**
**Solution:**
- Check if MongoDB Atlas credentials are correct in `.env`
- OR install MongoDB locally
- Check internet connection (for Atlas)

### **Problem: CORS error**
**Solution:**
- Backend already has CORS configured for `http://localhost:3000`
- Make sure frontend is running on port 3000

### **Problem: 401 Unauthorized**
**Solution:**
- Token expired or invalid
- Clear localStorage and login again

---

## 📝 Quick Switch Between Modes

### **Use Mock Data (No Backend):**
```javascript
// src/context/AuthContext.js
const USE_REAL_API = false;
```

### **Use Real Backend:**
```javascript
// src/context/AuthContext.js
const USE_REAL_API = true;
```

---

## 🎯 For Presentation

**Recommended:** Use **Mock Data** (Option 1)
- No backend setup needed
- No database issues
- Everything works instantly
- All features visible

**For Demo:** Can show both:
1. Show frontend working with mock data
2. Explain backend code and API structure
3. Show `.env` configuration
4. Explain how to connect (this guide)

---

## 📦 Project Structure

```
eduleague/
├── src/                    # Frontend (React)
│   ├── components/
│   ├── context/
│   ├── data/              # Mock data (current)
│   ├── services/
│   │   └── api.js         # ✅ NEW - API calls
│   └── App.js
│
├── server/                 # Backend (Node.js)
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API endpoints
│   ├── middleware/        # Auth, upload, etc.
│   ├── .env              # ✅ Configuration
│   └── server.js         # ✅ Main server
│
└── package.json
```

---

## ✅ Summary

**What's Working:**
- ✅ Frontend fully functional with mock data
- ✅ Backend code complete with all routes
- ✅ MongoDB Atlas connection configured
- ✅ API service layer created
- ✅ AuthContext supports both modes
- ✅ Easy toggle between mock and real API

**To Go Live:**
1. Start backend: `cd server && node server.js`
2. Change `USE_REAL_API = true`
3. Seed database with demo users
4. Test login

**For Presentation:**
- Keep `USE_REAL_API = false`
- Everything works without backend
- Show code and explain integration

---

## 🎓 Explaining to Sir

**"Sir, we have completed Phase 2 integration:**

1. **Installed axios** for API communication
2. **Created API service layer** (`src/services/api.js`) with all endpoints
3. **Updated AuthContext** to support both mock and real API
4. **Backend is ready** with MongoDB Atlas connection
5. **Easy toggle** - One variable to switch modes

**Current mode:** Mock data (for stable demo)
**Can switch to:** Real backend anytime by changing one line

**This approach gives us:**
- Stable demo without backend dependencies
- Production-ready backend code
- Easy deployment when needed"

---

Need help with anything? Just ask! 🚀
