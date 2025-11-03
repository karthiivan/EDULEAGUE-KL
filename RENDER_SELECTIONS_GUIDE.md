# 🎯 RENDER DEPLOYMENT - STEP BY STEP SELECTIONS

## Current Step: Language Selection

You're seeing the **Language Selection** dropdown on Render.com

---

## ✅ WHAT TO SELECT

### For Backend Deployment:

**Language/Runtime:** Select **Node** ✅

This is correct because:
- Your backend is built with Node.js + Express
- Your server.js runs on Node.js
- All your backend dependencies are npm packages

---

## 📋 Complete Selection Flow for Backend

### Step 1: Create Web Service
- Click **+ New** 
- Select **Web Service** ✅

### Step 2: Connect Repository
- Click **Connect** 
- Select your **EDULEAGUE-KL** repository ✅
- Select branch: **main** ✅

### Step 3: Configuration Form
Fill in these fields:

```
Name:                eduleague-api
Environment:         Node  ✅ SELECT THIS
Region:              Use default
Branch:              main
```

### Step 4: Build Command
```
cd server && npm install
```

### Step 5: Start Command
```
cd server && npm start
```

### Step 6: Environment Variables
Click **Add Environment Variable** and add:

```
MONGODB_URI          mongodb+srv://eduleague_user:PASSWORD@cluster...
PORT                 5000
NODE_ENV             production
GITHUB_CLIENT_ID     YOUR_ID
GITHUB_CLIENT_SECRET YOUR_SECRET
SESSION_SECRET       random_string
JWT_SECRET           random_string
JWT_EXPIRE           7d
MAX_FILE_SIZE        5242880
UPLOAD_DIR           uploads
```

### Step 7: Deploy
- Click **Create Web Service** ✅
- Wait 3-5 minutes

---

## 🎨 FOR FRONTEND (Different Platform - Vercel)

Frontend goes to **Vercel** (NOT Render):

1. Go to https://vercel.com
2. Click **New Project**
3. Import **EDULEAGUE-KL** repository
4. Framework: **Create React App** ✅
5. Add environment variable:
   ```
   REACT_APP_API_URL    https://eduleague-api.onrender.com
   ```
6. Click **Deploy**

---

## 📸 QUICK REFERENCE - WHAT EACH FIELD MEANS

| Field | What to Enter | Why |
|-------|---------------|-----|
| **Language** | **Node** | Your backend is Node.js/Express |
| **Name** | eduleague-api | Name for your service |
| **Region** | Default | Closest to your users |
| **Branch** | main | Your main git branch |
| **Build Command** | `cd server && npm install` | Navigate to server folder and install dependencies |
| **Start Command** | `cd server && npm start` | Run your server.js file |
| **Environment** | Your variables | Database, secrets, etc. |

---

## ✨ QUICK CHECKLIST - BACKEND ONLY

- [ ] Go to https://render.com
- [ ] Click **+ New** → **Web Service**
- [ ] Select your GitHub repo
- [ ] Fill in form (see above)
- [ ] Select **Node** for Language
- [ ] Add environment variables
- [ ] Click **Create Web Service**
- [ ] Wait for deployment (3-5 min)
- [ ] Copy backend URL when done

---

## 🚀 NEXT AFTER BACKEND IS DEPLOYED

Once backend is done:
1. Copy your backend URL (e.g., https://eduleague-api.onrender.com)
2. Go to Vercel for frontend
3. Add that URL to `REACT_APP_API_URL` environment variable
4. Deploy frontend

---

## ⚠️ IMPORTANT NOTES

### Render Free Tier:
- ✅ Free for 750 hours per month
- ✅ Auto-deploys on git push
- ⚠️ Service sleeps after 15 min inactivity
- ⚠️ First request after sleep takes 30 sec

### Your Backend Structure:
```
EDULEAGUE-KL/
├── server/                   ← This goes to Render
│   ├── server.js
│   ├── package.json
│   ├── routes/
│   ├── models/
│   └── ... (other backend files)
│
├── src/                      ← This goes to Vercel
├── public/
├── package.json
└── README.md
```

---

## 📞 COMMON ISSUES

**Q: Which platform for backend?**
A: **Render.com** ✅

**Q: Which platform for frontend?**
A: **Vercel** ✅

**Q: What language/runtime?**
A: **Node** ✅ (for backend only)

**Q: Where does database go?**
A: **MongoDB Atlas** (different platform, but linked via connection string)

---

## 🎯 SUMMARY

You're at the right place! Here's what to do:

```
✅ GO TO: Render.com
✅ ACTION: New Web Service
✅ SELECT: Your EDULEAGUE-KL repo
✅ LANGUAGE: Node ✅ ← SELECT THIS ONE
✅ BUILD: cd server && npm install
✅ START: cd server && npm start
✅ ENV VARS: Add your MongoDB, GitHub, JWT secrets
✅ DEPLOY: Click Create Web Service
⏳ WAIT: 3-5 minutes
🎉 DONE: Backend is live!
```

---

**Next Step:** Follow these selections and click through!

Need help with specific fields? Let me know! 🚀

