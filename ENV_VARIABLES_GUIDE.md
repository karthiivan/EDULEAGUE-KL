# 🔐 ENVIRONMENT VARIABLES - WHAT TO TYPE

## Current Step: Environment Variables on Render

You're at the section where you add configuration values your app needs to run.

---

## 📋 COPY & PASTE TABLE

Type these values one by one:

### Variable 1: MONGODB_URI
```
NAME_OF_VARIABLE: MONGODB_URI
VALUE: mongodb+srv://eduleague_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/eduleague?retryWrites=true&w=majority
```

**Note:** Replace:
- `YOUR_PASSWORD` with your MongoDB password
- `cluster0.xxxxx` with your actual cluster name (from MongoDB Atlas)

---

### Variable 2: PORT
```
NAME_OF_VARIABLE: PORT
VALUE: 5000
```

---

### Variable 3: NODE_ENV
```
NAME_OF_VARIABLE: NODE_ENV
VALUE: production
```

---

### Variable 4: GITHUB_CLIENT_ID
```
NAME_OF_VARIABLE: GITHUB_CLIENT_ID
VALUE: YOUR_GITHUB_CLIENT_ID
```

**Note:** Get this from:
1. GitHub → Settings → Developer settings → OAuth Apps
2. Select your app
3. Copy the "Client ID"

---

### Variable 5: GITHUB_CLIENT_SECRET
```
NAME_OF_VARIABLE: GITHUB_CLIENT_SECRET
VALUE: YOUR_GITHUB_CLIENT_SECRET
```

**Note:** Get this from:
1. GitHub → Settings → Developer settings → OAuth Apps
2. Select your app
3. Click "Generate a new client secret"
4. Copy the secret (show only once!)

---

### Variable 6: SESSION_SECRET
```
NAME_OF_VARIABLE: SESSION_SECRET
VALUE: your_random_string_here_make_it_long
```

**Example:**
```
SESSION_SECRET: aB3xC9dE2fG5hI8jK1lM4nO7pQ0rS3tU6vW9xY2zA5
```

---

### Variable 7: JWT_SECRET
```
NAME_OF_VARIABLE: JWT_SECRET
VALUE: your_another_random_string_here
```

**Example:**
```
JWT_SECRET: mZ8qW5eR2tY9uI0oP3aS6dF7gH1jK4lM7nB2vC5xZ
```

---

### Variable 8: JWT_EXPIRE
```
NAME_OF_VARIABLE: JWT_EXPIRE
VALUE: 7d
```

---

### Variable 9: MAX_FILE_SIZE
```
NAME_OF_VARIABLE: MAX_FILE_SIZE
VALUE: 5242880
```

---

### Variable 10: UPLOAD_DIR
```
NAME_OF_VARIABLE: UPLOAD_DIR
VALUE: uploads
```

---

## 🎯 STEP-BY-STEP INSTRUCTIONS

1. **Click "+ Add Environment Variable"**

2. **Fill first field (NAME_OF_VARIABLE):**
   - Type: `MONGODB_URI`

3. **Fill second field (value):**
   - Type your MongoDB connection string
   - Get it from MongoDB Atlas → Clusters → Connect → Drivers

4. **Click "+ Add Environment Variable" again**

5. **Repeat for all variables above**

---

## 📖 QUICK REFERENCE - ALL VARIABLES

| # | Variable Name | Value | Example |
|---|---|---|---|
| 1 | `MONGODB_URI` | Connection string from MongoDB Atlas | `mongodb+srv://user:pass@cluster.mongodb.net/eduleague?retryWrites=true&w=majority` |
| 2 | `PORT` | 5000 | `5000` |
| 3 | `NODE_ENV` | production | `production` |
| 4 | `GITHUB_CLIENT_ID` | From GitHub OAuth app | `abc123def456` |
| 5 | `GITHUB_CLIENT_SECRET` | From GitHub OAuth app | `ghi789jkl012` |
| 6 | `SESSION_SECRET` | Random string (make it long) | `aB3xC9dE2fG5hI8jK1lM4nO7` |
| 7 | `JWT_SECRET` | Random string (make it long) | `mZ8qW5eR2tY9uI0oP3aS6dF7` |
| 8 | `JWT_EXPIRE` | 7d | `7d` |
| 9 | `MAX_FILE_SIZE` | 5242880 | `5242880` |
| 10 | `UPLOAD_DIR` | uploads | `uploads` |

---

## 🔍 HOW TO GET EACH VALUE

### MONGODB_URI
1. Go to https://www.mongodb.com/cloud/atlas
2. Click your cluster
3. Click "Connect"
4. Choose "Drivers"
5. Copy connection string
6. Replace `<password>` with your actual password
7. Add `/eduleague` after `.net/`

### GITHUB_CLIENT_ID & GITHUB_CLIENT_SECRET
1. Go to GitHub → Settings → Developer settings → OAuth Apps
2. Click your app
3. Copy "Client ID"
4. Click "Generate a new client secret" and copy it

### SESSION_SECRET & JWT_SECRET
Generate random strings. You can use:
- **Online Generator**: https://www.random.org/passwords/
- **Or type a long random string yourself**

**Example formats:**
```
aB3xC9dE2fG5hI8jK1lM4nO7pQ0rS3tU6vW9xY2zA5bC8dE1fG4
mZ8qW5eR2tY9uI0oP3aS6dF7gH1jK4lM7nB2vC5xZ0aE3sD6fG
```

---

## ✅ COMPLETE WORKFLOW

```
1. Click "+ Add Environment Variable"
2. Type: MONGODB_URI
3. Paste: mongodb+srv://eduleague_user:PASSWORD@cluster0.xxxxx.mongodb.net/eduleague?retryWrites=true&w=majority
4. Click "+ Add Environment Variable"
5. Type: PORT
6. Type: 5000
7. Click "+ Add Environment Variable"
8. Type: NODE_ENV
9. Type: production
10. ... repeat for remaining 7 variables ...
11. Click "Create Web Service"
```

---

## 🎨 VISUAL LAYOUT

```
┌─────────────────────────┬────────────────────────────────┐
│   NAME_OF_VARIABLE      │           value                │
├─────────────────────────┼────────────────────────────────┤
│ MONGODB_URI             │ mongodb+srv://eduleague_us...  │
├─────────────────────────┼────────────────────────────────┤
│ PORT                    │ 5000                           │
├─────────────────────────┼────────────────────────────────┤
│ NODE_ENV                │ production                     │
├─────────────────────────┼────────────────────────────────┤
│ GITHUB_CLIENT_ID        │ abc123def456                   │
├─────────────────────────┼────────────────────────────────┤
│ GITHUB_CLIENT_SECRET    │ ghi789jkl012                   │
├─────────────────────────┼────────────────────────────────┤
│ SESSION_SECRET          │ aB3xC9dE2fG5hI8jK1lM4...       │
├─────────────────────────┼────────────────────────────────┤
│ JWT_SECRET              │ mZ8qW5eR2tY9uI0oP3aS6...       │
├─────────────────────────┼────────────────────────────────┤
│ JWT_EXPIRE              │ 7d                             │
├─────────────────────────┼────────────────────────────────┤
│ MAX_FILE_SIZE           │ 5242880                        │
├─────────────────────────┼────────────────────────────────┤
│ UPLOAD_DIR              │ uploads                        │
└─────────────────────────┴────────────────────────────────┘
```

---

## ⚠️ IMPORTANT NOTES

1. **Keep passwords safe** - Never share your MongoDB password
2. **Generate random secrets** - Make SESSION_SECRET and JWT_SECRET unique
3. **GitHub credentials** - Get from your OAuth app settings
4. **MONGODB_URI format** - Must include username, password, cluster name
5. **Don't use spaces** - No extra spaces before/after values
6. **Case sensitive** - Variable names are case-sensitive (use UPPERCASE)

---

## 🚀 AFTER ADDING ALL VARIABLES

Once you've added all 10 variables:

1. Scroll to top of the form
2. Click **"Create Web Service"** button
3. Wait 3-5 minutes for deployment
4. You'll see your backend URL: `https://eduleague-api.onrender.com`

---

## 🆘 TROUBLESHOOTING

**Q: Where do I get MONGODB_URI?**
A: MongoDB Atlas → Your Cluster → Connect → Drivers → Copy connection string

**Q: What if I forget GitHub Client Secret?**
A: Generate a new one in GitHub settings (you can revoke old one)

**Q: Can I change variables after deploying?**
A: Yes! Go to Settings → Environment Variables on Render dashboard

**Q: Do I need all 10 variables?**
A: Yes, all are required for the app to work properly

---

## 📖 NEXT STEPS

1. ✅ Add all 10 environment variables
2. ✅ Click "Create Web Service"
3. ⏳ Wait 3-5 minutes
4. 🎉 Backend is deployed!
5. Then deploy frontend to Vercel

---

**Ready? Start typing in the first field: `MONGODB_URI`** 🚀

