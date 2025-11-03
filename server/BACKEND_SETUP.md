# EduLeague Backend Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and update with your values:

```bash
cp .env.example .env
```

**Required Configuration:**
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Strong secret key for JWT tokens
- `JWT_REFRESH_SECRET`: Strong secret key for refresh tokens

### 3. Start MongoDB

**Option A: Local MongoDB**
```bash
mongod
```

**Option B: MongoDB Atlas (Recommended)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### 4. Seed Database (Optional)

```bash
npm run seed
```

### 5. Start Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on `http://localhost:5000`

---

## 📁 Project Structure

```
server/
├── models/           # Mongoose models
│   ├── User.js
│   ├── Problem.js
│   ├── Submission.js
│   ├── Room.js
│   ├── Project.js
│   ├── Quiz.js
│   └── ...
├── routes/           # API routes
│   ├── auth.js
│   ├── users.js
│   ├── problems.js
│   ├── submissions.js
│   └── ...
├── middleware/       # Custom middleware
│   ├── auth.js
│   ├── upload.js
│   └── errorHandler.js
├── controllers/      # Route controllers
├── socket/           # Socket.io handlers
│   └── socketHandler.js
├── utils/            # Utility functions
│   ├── emailService.js
│   ├── codeExecutor.js
│   └── ...
├── scripts/          # Database scripts
│   └── seedDatabase.js
├── uploads/          # Uploaded files
├── .env              # Environment variables
├── .env.example      # Environment template
├── server.js         # Main server file
└── package.json
```

---

## 🔐 Authentication Flow

### Registration
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@kluniversity.in",
  "password": "password123",
  "role": "student",
  "year": 2,
  "branch": "CSE"
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@kluniversity.in",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@kluniversity.in",
    "role": "student"
  }
}
```

### Using Protected Routes
```http
GET /api/users/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - Get all users (teacher only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `POST /api/users/upload-avatar` - Upload profile picture
- `PUT /api/users/coding-profiles` - Update coding profiles

### Problems
- `GET /api/problems` - Get all problems
- `GET /api/problems/:id` - Get problem by ID
- `POST /api/problems` - Create problem (teacher only)
- `PUT /api/problems/:id` - Update problem
- `DELETE /api/problems/:id` - Delete problem

### Submissions
- `POST /api/submissions` - Submit solution
- `GET /api/submissions/user/:userId` - Get user submissions
- `GET /api/submissions/problem/:problemId` - Get problem submissions

### Rooms
- `GET /api/rooms` - Get all active rooms
- `POST /api/rooms` - Create room
- `GET /api/rooms/:id` - Get room by ID
- `POST /api/rooms/:id/join` - Join room
- `POST /api/rooms/:id/leave` - Leave room

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `POST /api/projects/:id/join` - Join project

### Quizzes
- `GET /api/quizzes` - Get all quizzes
- `GET /api/quizzes/:id` - Get quiz by ID
- `POST /api/quizzes/:id/submit` - Submit quiz answers

### Placements
- `GET /api/placements` - Get placement data
- `POST /api/placements` - Add placement record (teacher only)

### Notifications
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/:id/read` - Mark as read

---

## 🔌 Socket.io Events

### Connection
```javascript
socket.on('connect', () => {
  console.log('Connected to server');
});
```

### Join Room
```javascript
socket.emit('join-room', { roomId, userId });
```

### Send Message
```javascript
socket.emit('send-message', { roomId, message });
```

### Code Update
```javascript
socket.emit('code-update', { roomId, code, language });
```

### Receive Events
```javascript
socket.on('user-joined', (data) => {
  console.log('User joined:', data);
});

socket.on('new-message', (message) => {
  console.log('New message:', message);
});

socket.on('code-updated', (data) => {
  console.log('Code updated:', data);
});

socket.on('notification', (notification) => {
  console.log('New notification:', notification);
});
```

---

## 📤 File Upload

### Upload Profile Picture
```http
POST /api/users/upload-avatar
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <image file>
```

### Upload Resume
```http
POST /api/users/upload-resume
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <pdf file>
```

---

## 🧪 Code Execution

The backend uses Judge0 API for secure code execution.

### Submit Code
```http
POST /api/submissions
Authorization: Bearer <token>
Content-Type: application/json

{
  "problemId": "...",
  "code": "function solution() { ... }",
  "language": "javascript"
}
```

**Supported Languages:**
- JavaScript (Node.js)
- Python
- Java
- C++
- C

---

## 📧 Email Notifications

Configure email service in `.env`:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

**Email Events:**
- Welcome email on registration
- Password reset
- Achievement notifications
- Placement updates
- Mock interview reminders

---

## 🔒 Security Features

1. **Helmet.js** - Security headers
2. **Rate Limiting** - Prevent abuse
3. **JWT Authentication** - Secure token-based auth
4. **Password Hashing** - bcrypt
5. **Input Validation** - express-validator
6. **CORS** - Configured for frontend
7. **File Upload Limits** - Max 5MB

---

## 🚀 Deployment

### Heroku
```bash
heroku create eduleague-api
heroku config:set MONGODB_URI=<your-mongodb-uri>
heroku config:set JWT_SECRET=<your-secret>
git push heroku main
```

### Vercel/Netlify
Use serverless functions or deploy as Docker container

### AWS/DigitalOcean
Deploy as Node.js application with PM2

---

## 🐛 Troubleshooting

### MongoDB Connection Error
- Check if MongoDB is running
- Verify connection string in `.env`
- Check network/firewall settings

### JWT Token Invalid
- Check if JWT_SECRET matches
- Verify token hasn't expired
- Ensure Bearer token format

### File Upload Fails
- Check file size (max 5MB)
- Verify upload directory exists
- Check file permissions

---

## 📊 Monitoring

### Health Check
```http
GET /api/health
```

### Server Logs
All requests are logged using Morgan middleware

---

## 🔄 Database Seeding

The seed script populates the database with:
- 10 sample students
- 2 teachers
- 50+ coding problems
- Sample projects
- Quiz questions
- Placement data

```bash
npm run seed
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

---

## 📝 License

© 2024 EduLeague - KL University
