# 🎨 Deploy Frontend to Vercel

## Step-by-Step Guide

### Step 1: Go to Vercel
1. Open https://vercel.com
2. Click **"Sign in"** (use GitHub)
3. Authorize Vercel to access your GitHub

---

### Step 2: Create New Project
1. Click **"+ New Project"** or **"Create"**
2. Search for **"EDULEAGUE-KL"** repository
3. Click **"Import"**

---

### Step 3: Configure Project
Fill in the form:

```
Project Name:           eduleague-kl
Framework:              Create React App
Root Directory:         ./
Build Command:          npm run build
Output Directory:       build
```

---

### Step 4: Set Environment Variables
1. Click **"Environment Variables"**
2. Add this variable:

```
Key:    REACT_APP_API_URL
Value:  https://eduleague-api.onrender.com/api
```

3. Make sure it's set for: **Production**, **Preview**, **Development**

---

### Step 5: Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes for build and deployment
3. You'll get a URL like: `https://eduleague-kl.vercel.app`

---

### Step 6: Verify Frontend Works
1. Open your frontend URL: `https://eduleague-kl.vercel.app`
2. Click **"Login with GitHub"**
3. You should be redirected to GitHub OAuth
4. After login, you should see the Dashboard

---

## Expected URLs After Deployment

| Component | URL |
|-----------|-----|
| **Frontend** | https://eduleague-kl.vercel.app |
| **Backend API** | https://eduleague-api.onrender.com |
| **GitHub Repo** | https://github.com/karthiivan/EDULEAGUE-KL |

---

## ✅ Troubleshooting

### Issue: Build fails with "Cannot find module"
**Solution:** 
- Check Root Directory is set to `./`
- Make sure `package.json` is in the root

### Issue: Frontend shows blank page
**Solution:**
- Check browser console for errors (F12)
- Verify `REACT_APP_API_URL` environment variable is set
- Make sure backend is running

### Issue: Login doesn't work
**Solution:**
- GitHub OAuth callback URL needs to be updated
- Go to GitHub → Settings → Developer settings → OAuth Apps
- Update callback URL: `https://eduleague-kl.vercel.app/auth/callback`

---

**Ready? Let's deploy!** 🚀
