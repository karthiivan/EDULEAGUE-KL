# 🚀 Deploy EduLeague-KL to Render.com

Complete step-by-step guide to deploy your full-stack application to Render.com

---

## 📋 Prerequisites

Before you start, ensure you have:
- ✅ GitHub account with your repository
- ✅ Render.com account (free signup at https://render.com)
- ✅ MongoDB Atlas account (free tier available)
- ✅ All environment variables ready

---

## 🔧 Step 1: Prepare Your Repository

### 1.1 Update .env file handling

Create `.env.example` in the `server` directory:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/eduleague

# Server
PORT=5000
NODE_ENV=production

# Authentication
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
SESSION_SECRET=your_secure_session_secret

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# Email Service (Optional)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_DIR=uploads
```

### 1.2 Make sure node_modules is in .gitignore

Your `.gitignore` should include:
```
node_modules/
.env
.env.local
```

### 1.3 Ensure package.json has proper scripts

Check your `server/package.json`:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### 1.4 Commit and push changes

```bash
cd "c:\Users\vanga\OneDrive\Desktop\eduleague kl"
git add .
git commit -m "chore: Prepare for Render deployment"
git push origin main
```

---

## 🗄️ Step 2: Set Up MongoDB Atlas (Database)

### 2.1 Create MongoDB Cluster

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign in or create a free account
3. Click "Create" to build a new cluster
4. Choose:
   - **Provider**: AWS
   - **Region**: Select closest to your users
   - **Cluster Tier**: M0 (Free)
5. Click "Create Cluster"

### 2.2 Create Database User

1. In MongoDB Atlas, go to **Database Access**
2. Click **Add New Database User**
3. Choose authentication method: **Password**
4. Set:
   - Username: `eduleague_user`
   - Password: Generate secure password (save it!)
5. Click **Add User**

### 2.3 Allow Network Access

1. Go to **Network Access**
2. Click **Add IP Address**
3. Select **Allow access from anywhere** (0.0.0.0/0)
4. Click **Confirm**

### 2.4 Get Connection String

1. Go to **Clusters** → Your cluster
2. Click **Connect** button
3. Choose **Drivers**
4. Copy the connection string:
   ```
   mongodb+srv://eduleague_user:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `PASSWORD` with your actual password
6. Add database name: `/eduleague` after .net/
   ```
   mongodb+srv://eduleague_user:PASSWORD@cluster0.xxxxx.mongodb.net/eduleague?retryWrites=true&w=majority
   ```

---

## 🖥️ Step 3: Deploy Backend to Render

### 3.1 Connect Render to GitHub

1. Go to https://render.com
2. Click **Sign in** or **Sign up** (use GitHub)
3. Authorize Render to access your GitHub repositories
4. Click **+ New** → **Web Service**

### 3.2 Create Backend Service

1. Select **Deploy an existing repository**
2. Search for `EDULEAGUE-KL` repository
3. Click **Connect**
4. Fill in the form:

```
Name:                   eduleague-api
Environment:            Node
Region:                 Use default (close to your users)
Branch:                 main
Build Command:          cd server && npm install
Start Command:          cd server && npm start
```

### 3.3 Set Environment Variables

1. Scroll down to **Environment** section
2. Click **Add Environment Variable**
3. Add all variables:

```
MONGODB_URI            mongodb+srv://eduleague_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/eduleague?retryWrites=true&w=majority
PORT                   5000
NODE_ENV               production
GITHUB_CLIENT_ID       YOUR_GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET   YOUR_GITHUB_CLIENT_SECRET
SESSION_SECRET         generate_random_string_here
JWT_SECRET             generate_random_string_here
JWT_EXPIRE             7d
MAX_FILE_SIZE          5242880
UPLOAD_DIR             uploads
```

### 3.4 Deploy

1. Scroll to top
2. Click **Create Web Service**
3. Wait 3-5 minutes for build and deployment
4. Your backend URL will be: `https://eduleague-api.onrender.com`

### 3.5 Verify Deployment

Test your API:
```bash
curl https://eduleague-api.onrender.com/api/health
```

---

## 🎨 Step 4: Deploy Frontend to Vercel (Recommended)

### 4.1 Prepare Frontend

Update `src/services/api.js`:

```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

Create `.env.production`:
```
REACT_APP_API_URL=https://eduleague-api.onrender.com
REACT_APP_ENV=production
```

### 4.2 Deploy to Vercel

1. Go to https://vercel.com
2. Click **Sign in** (use GitHub)
3. Click **New Project**
4. Import `EDULEAGUE-KL` repository
5. Fill in:
   ```
   Project Name:  eduleague-kl
   Framework:     Create React App
   Root Directory: ./
   ```
6. Click **Environment Variables**
7. Add:
   ```
   REACT_APP_API_URL  https://eduleague-api.onrender.com
   ```
8. Click **Deploy**

Your frontend will be live at: `https://eduleague-kl.vercel.app`

---

## 🔐 Step 5: Configure GitHub OAuth for Production

### 5.1 Add Render URL to GitHub OAuth

1. Go to GitHub → Settings → Developer settings → OAuth Apps
2. Edit your existing app or create new one
3. Update:
   ```
   Authorization callback URL:
   https://eduleague-api.onrender.com/auth/github/callback
   ```

### 5.2 Create New GitHub OAuth App for Vercel Frontend

1. GitHub → Settings → Developer settings → New OAuth App
2. Fill in:
   ```
   Application name:        EduLeague KL (Vercel)
   Homepage URL:            https://eduleague-kl.vercel.app
   Authorization callback:  https://eduleague-kl.vercel.app/auth/callback
   ```
3. Generate new credentials
4. Update Vercel environment variables:
   ```
   REACT_APP_GITHUB_CLIENT_ID     your_new_client_id
   ```

---

## ✅ Step 6: Verify Everything Works

### 6.1 Test Backend API

```bash
# Health check
curl https://eduleague-api.onrender.com/api/health

# Get problems
curl https://eduleague-api.onrender.com/api/problems

# Test auth endpoint
curl https://eduleague-api.onrender.com/auth/github
```

### 6.2 Test Frontend

1. Open https://eduleague-kl.vercel.app
2. Click login with GitHub
3. Verify you can access the dashboard
4. Test a few features

### 6.3 Monitor Logs

**Render Backend Logs:**
1. Go to Render Dashboard
2. Click your `eduleague-api` service
3. Go to **Logs** tab to view real-time logs

**Vercel Frontend Logs:**
1. Go to Vercel Dashboard
2. Click `eduleague-kl` project
3. Go to **Deployments** to see build logs

---

## 🔍 Troubleshooting

### Issue: Backend returns 503 Service Unavailable

**Solution:**
1. Check Render logs: `Settings` → `Build Logs`
2. Ensure all npm packages installed correctly
3. Check environment variables are set
4. Restart the service: `More` → `Restart service`

### Issue: MongoDB Connection Error

**Solution:**
```
Error: connect ECONNREFUSED
```
1. Verify connection string in environment variables
2. Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
3. Create database user if not done
4. Test locally with connection string first

### Issue: Frontend Cannot Connect to Backend

**Solution:**
1. Check `REACT_APP_API_URL` in Vercel environment
2. Ensure CORS is enabled in backend:
   ```javascript
   app.use(cors({
     origin: process.env.NODE_ENV === 'production' 
       ? ['https://eduleague-kl.vercel.app']
       : '*',
     credentials: true
   }));
   ```
3. Update Render environment variable if backend URL changed

### Issue: GitHub OAuth Not Working

**Solution:**
1. Verify callback URLs match exactly:
   - Backend: `https://eduleague-api.onrender.com/auth/github/callback`
   - Frontend: `https://eduleague-kl.vercel.app/auth/callback`
2. Check Client ID and Secret are correct
3. Ensure cookies are being set (check browser DevTools → Application → Cookies)

### Issue: Slow First Load Time

**Solution:**
1. Vercel: Check build bundle size
2. Render: Consider upgrading from free tier
3. MongoDB: Check query performance
4. Enable caching: Add cache headers to API responses

---

## 🚀 Production Checklist

- ✅ Backend deployed on Render
- ✅ Frontend deployed on Vercel
- ✅ Database configured on MongoDB Atlas
- ✅ Environment variables set correctly
- ✅ GitHub OAuth configured
- ✅ CORS properly configured
- ✅ HTTPS enabled (automatic)
- ✅ Logs monitored
- ✅ Error tracking set up (Sentry)
- ✅ Performance monitoring enabled

---

## 📊 Monitoring & Maintenance

### Daily Tasks:
- Check application logs for errors
- Monitor database performance
- Verify uptime

### Weekly Tasks:
- Review error reports from Sentry
- Check performance metrics
- Update dependencies if needed

### Monthly Tasks:
- Backup database
- Review security logs
- Analyze user analytics
- Plan feature releases

---

## 💰 Cost Breakdown (Free Tier)

| Service | Free Tier | Cost |
|---------|-----------|------|
| Render Backend | Yes | Free (sleeps after 15 min inactivity) |
| Vercel Frontend | Yes | Free |
| MongoDB Atlas | Yes | Free (512 MB) |
| **Total** | | **FREE** ✅ |

**Note:** Free tier has limitations:
- Render service sleeps after 15 minutes of inactivity
- MongoDB limited to 512 MB
- No dedicated resources

For production, consider paid tiers.

---

## 🔄 Updating Your Application

### Deploy New Changes

1. **Make changes locally**
   ```bash
   git add .
   git commit -m "feature: Add new feature"
   git push origin main
   ```

2. **Render automatically redeploys** when you push to main

3. **Vercel automatically redeploys** when you push to main

### Rollback to Previous Version

**Render:**
1. Go to Deployments tab
2. Select a previous deployment
3. Click "Deploy"

**Vercel:**
1. Go to Deployments
2. Click the deployment you want to rollback to
3. Click "Redeploy"

---

## 🎯 URLs After Deployment

| Component | URL |
|-----------|-----|
| **Frontend** | https://eduleague-kl.vercel.app |
| **Backend API** | https://eduleague-api.onrender.com |
| **Database** | MongoDB Atlas (internal) |
| **GitHub Repo** | https://github.com/karthiivan/EDULEAGUE-KL |

---

## 📚 Additional Resources

- [Render.com Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com/)
- [GitHub OAuth Documentation](https://docs.github.com/en/developers/apps/building-oauth-apps)

---

## 🆘 Need Help?

1. Check Render logs: Dashboard → Your service → Logs
2. Check Vercel logs: Dashboard → Your project → Deployments
3. Check MongoDB status: MongoDB Atlas → Status
4. Review error tracking: Sentry Dashboard (if configured)

---

**Last Updated:** November 3, 2025
**Status:** ✅ Production Ready

Good luck with your deployment! 🚀

