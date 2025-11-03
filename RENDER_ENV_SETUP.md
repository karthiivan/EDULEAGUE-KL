# 🎯 Render Environment Variables - Copy & Paste Ready

## Quick Setup Instructions

On Render deployment form, add these 10 variables one by one:

### Variable 1: MongoDB Connection
```
Key: MONGODB_URI
Value: mongodb+srv://eduleague_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/eduleague?retryWrites=true&w=majority
```
*Replace `YOUR_PASSWORD` with your MongoDB Atlas password*

---

### Variable 2: Port
```
Key: PORT
Value: 5000
```

---

### Variable 3: Environment
```
Key: NODE_ENV
Value: production
```

---

### Variable 4: GitHub Client ID
```
Key: GITHUB_CLIENT_ID
Value: YOUR_GITHUB_CLIENT_ID
```
*Get from: GitHub → Settings → Developer settings → OAuth Apps → Your app → Client ID*

---

### Variable 5: GitHub Client Secret
```
Key: GITHUB_CLIENT_SECRET
Value: YOUR_GITHUB_CLIENT_SECRET
```
*Get from: GitHub → Settings → Developer settings → OAuth Apps → Your app → Client Secret*

---

### Variable 6: Session Secret
```
Key: SESSION_SECRET
Value: abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
```
*(Use any random string - at least 32 characters)*

---

### Variable 7: JWT Secret
```
Key: JWT_SECRET
Value: xyz987wvu654tsr321qpo012nml987ijk654hgf321edc098baz765
```
*(Use any random string - at least 32 characters)*

---

### Variable 8: JWT Expire
```
Key: JWT_EXPIRE
Value: 7d
```

---

### Variable 9: Max File Size
```
Key: MAX_FILE_SIZE
Value: 5242880
```

---

### Variable 10: Upload Directory
```
Key: UPLOAD_DIR
Value: uploads
```

---

## After Adding All Variables

1. Click **"Create Web Service"** button
2. Wait 3-5 minutes for deployment
3. Your backend URL will be: `https://eduleague-api.onrender.com`

✅ **Done!**
