# ⚡ QUICK START - Deploy to Render in 30 Minutes

**Fast-track guide to get your app live on Render.com**

---

## 📝 Quick Checklist (Do These Now!)

### Step 1: MongoDB Setup (5 min)
- [ ] Go to https://www.mongodb.com/cloud/atlas
- [ ] Create free account
- [ ] Create M0 free cluster
- [ ] Create database user: `eduleague_user`
- [ ] Save password securely
- [ ] Allow access from `0.0.0.0/0`
- [ ] Get connection string
- [ ] Test connection locally

### Step 2: Prepare Repository (5 min)
```bash
# In your project root
cd "c:\Users\vanga\OneDrive\Desktop\eduleague kl"

# Remove node_modules from git (IMPORTANT!)
git rm -r --cached node_modules/ server/node_modules/
git commit -m "chore: Remove node_modules from git"
git push origin main
```

### Step 3: Create Render Account (2 min)
- [ ] Go to https://render.com
- [ ] Click "Sign up"
- [ ] Choose "GitHub" authentication
- [ ] Authorize Render to access your GitHub

### Step 4: Deploy Backend (10 min)
1. Click **+ New** → **Web Service**
2. Click **Connect** and select `EDULEAGUE-KL` repo
3. Fill in form:
   ```
   Name:            eduleague-api
   Environment:     Node
   Build Command:   cd server && npm install
   Start Command:   cd server && npm start
   ```
4. Click **Advanced** → **Add Environment Variable**
5. Add these variables:
   ```
   MONGODB_URI     mongodb+srv://USER:PASS@cluster.mongodb.net/eduleague
   NODE_ENV        production
   PORT            5000
   ```
6. Click **Create Web Service**
7. Wait for deployment (3-5 min)
8. **Copy your backend URL**: `https://eduleague-api.onrender.com`

### Step 5: Deploy Frontend (5 min)
1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Import `EDULEAGUE-KL` repository
4. Fill in:
   ```
   Framework:  Create React App
   ```
5. Click **Environment Variables**
6. Add:
   ```
   REACT_APP_API_URL    https://eduleague-api.onrender.com
   ```
7. Click **Deploy**
8. Wait for deployment (2-3 min)
9. **Copy your frontend URL**: `https://eduleague-kl.vercel.app`

### Step 6: Test Everything (3 min)
- [ ] Open https://eduleague-kl.vercel.app
- [ ] Try logging in
- [ ] Check a few features
- [ ] Verify API calls work

---

## 🚨 Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| Backend won't start | Check Render logs, verify MongoDB connection string |
| Can't connect to DB | Verify IP whitelist in MongoDB Atlas is `0.0.0.0/0` |
| Frontend shows errors | Check REACT_APP_API_URL in Vercel environment |
| Login doesn't work | Update GitHub OAuth callback URLs in GitHub settings |
| Slow first load | Normal for free tier, Render service wakes up after sleep |

---

## ✅ Success Criteria

Your deployment is successful when:
1. ✅ Frontend loads at https://eduleague-kl.vercel.app
2. ✅ Backend responds at https://eduleague-api.onrender.com
3. ✅ Can login with GitHub
4. ✅ Can create coding room
5. ✅ Can submit problem solution
6. ✅ Can see leaderboard

---

## 🎉 YOU'RE LIVE!

Congratulations! Your app is now live on the internet!

**Share Your URLs:**
- Frontend: https://eduleague-kl.vercel.app
- Backend API: https://eduleague-api.onrender.com
- GitHub: https://github.com/karthiivan/EDULEAGUE-KL

---

## 📖 For Detailed Instructions

See: `DEPLOYMENT_RENDER.md`

