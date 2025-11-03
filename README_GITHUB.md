# EduLeague KL - Comprehensive Learning Platform

<div align="center">

![EduLeague KL](https://img.shields.io/badge/EduLeague-KL-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-8.19.2-13AA52?style=flat-square&logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-green.svg)

A comprehensive full-stack learning platform specifically designed for **KL University B.Tech students**, offering an integrated ecosystem for coding practice, skill development, peer learning, and career preparation.

[Features](#-features) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [Project Structure](#-project-structure) • [Contributing](#-contributing)

</div>

---

## 🚀 Features

### 1. **AI-Powered Personalized Dashboard**
- Recommended learning paths based on user profile
- Skill assessment quizzes
- Coding streak tracker
- Quick stats and progress overview
- Performance analytics

### 2. **Coding Practice Hub with Collaborative Rooms**
- 50+ curated coding problems (Easy/Medium/Hard)
- Integrated Monaco code editor
- Create and join collaborative coding rooms
- Real-time code sharing and execution
- Problem filtering by difficulty, topics, and companies
- Real-time XP rewards system

### 3. **Learn Skills Section (5 Specialized Tracks)**
- Data Structures & Algorithms
- Competitive Programming
- SQL & Database Management
- Frontend Development
- Backend Development
- Interactive roadmaps and quizzes for each track
- Structured learning paths

### 4. **Peer Learning Marketplace**
- Student-to-student mentorship system
- Schedule 1-on-1 sessions
- Rating and review system
- Filter mentors by skill, year, and rating
- Mentorship scheduling and management

### 5. **Smart Resume Tools**
- 5 ATS-friendly templates
- Auto-populate from user profile
- ATS Score Checker
- Export as PDF
- Real-time formatting validation

### 6. **Project Collaboration Hub**
- Post project ideas and opportunities
- Find teammates based on skills
- GitHub integration
- Project categories and status tracking
- Collaboration management tools

### 7. **Interview Prep Center**
- Company-wise interview questions database
- Mock interview scheduling
- Performance tracking
- Question difficulty ratings
- Solution sharing and discussion

### 8. **Advanced Features**
- Real-time notifications
- Forums for discussion and Q&A
- Leaderboards (Global & University-wide)
- User profiles with achievements
- Analytics dashboard
- Teacher/Admin portal

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18.2.0
- **Styling**: Tailwind CSS 3.3.0
- **Code Editor**: Monaco Editor (@monaco-editor/react)
- **Charts**: Recharts 2.10.3
- **Icons**: Lucide React
- **Analytics**: Sentry for error tracking
- **Routing**: React Router v6
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB 8.19.2 with Mongoose
- **Real-time**: Socket.io 4.6.0
- **Authentication**: Passport.js with GitHub OAuth
- **Security**: Helmet, Express-validator, bcryptjs
- **Rate Limiting**: Express-rate-limit
- **Email**: Nodemailer
- **File Upload**: Multer

### DevTools
- **Frontend Build**: Create React App (Webpack)
- **CSS Processing**: PostCSS, Autoprefixer
- **Backend Monitoring**: Nodemon
- **Version Control**: Git

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** v14+ ([Download](https://nodejs.org/))
- **MongoDB** ([Download](https://www.mongodb.com/try/download/community) or use MongoDB Atlas)
- **Git** ([Download](https://git-scm.com/))
- **npm** or **yarn** package manager

---

## ⚡ Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/karthiivan/EDULEAGUE-KL.git
cd EDULEAGUE-KL
```

### 2. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd server
npm install
cd ..
```

### 3. Environment Configuration

Create a `.env` file in the `server` directory with the following variables:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/eduleague

# Server
PORT=5000
NODE_ENV=development

# Authentication
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
SESSION_SECRET=your_session_secret

# Email Service
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d

# File Upload
MAX_FILE_SIZE=5242880
```

### 4. Start the Application

**Terminal 1 - Backend Server:**
```bash
cd server
npm start
# Backend runs on http://localhost:5000
```

**Terminal 2 - Frontend Development Server:**
```bash
npm start
# Frontend runs on http://localhost:3000
```

### 5. Access the Application
Open your browser and navigate to: **http://localhost:3000**

---

## 📁 Project Structure

```
EDULEAGUE-KL/
├── public/                    # Static files
│   └── index.html
├── src/                       # React frontend
│   ├── components/
│   │   ├── Analytics/
│   │   ├── Auth/
│   │   ├── CodingPractice/
│   │   ├── Dashboard/
│   │   ├── Forums/
│   │   ├── Interview/
│   │   ├── Leaderboard/
│   │   ├── LearnSkills/
│   │   ├── Notifications/
│   │   ├── PeerLearning/
│   │   ├── Placements/
│   │   ├── Profile/
│   │   ├── Projects/
│   │   ├── Resume/
│   │   ├── Teacher/
│   │   └── UserProfile/
│   ├── context/
│   │   └── AuthContext.js
│   ├── services/
│   │   └── api.js
│   ├── data/
│   │   ├── comprehensiveProblems.js
│   │   ├── quizQuestions.js
│   │   └── mockData.js
│   ├── utils/
│   │   ├── analytics.js
│   │   └── sentry.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── server/                    # Node.js backend
│   ├── models/
│   │   ├── User.js
│   │   ├── Problem.js
│   │   ├── Submission.js
│   │   └── Room.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── problems.js
│   │   ├── submissions.js
│   │   ├── users.js
│   │   ├── rooms.js
│   │   ├── mentorships.js
│   │   ├── notifications.js
│   │   ├── projects.js
│   │   ├── placements.js
│   │   └── quizzes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
│   ├── utils/
│   │   ├── codeExecutor.js
│   │   └── emailService.js
│   ├── socket/
│   │   └── socketHandler.js
│   ├── config/
│   │   └── passport.js
│   ├── scripts/
│   │   └── generateProblems.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## 🔐 Authentication

The application uses **GitHub OAuth 2.0** for authentication:

1. Users can sign up/login using their GitHub account
2. Session management with secure JWT tokens
3. Role-based access control (Student, Mentor, Admin)

### Setup GitHub OAuth:
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create a new OAuth application
3. Add redirect URI: `http://localhost:5000/auth/github/callback`
4. Update `.env` with `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`

---

## 🗄️ Database Schema

### Key Collections:
- **Users**: Student profiles, experience, skills
- **Problems**: Coding problems with test cases
- **Submissions**: User code submissions and results
- **Rooms**: Collaborative coding session rooms
- **Mentorships**: Peer mentoring relationships
- **Projects**: Collaborative project listings
- **Quizzes**: Skill assessment quizzes
- **Notifications**: User notifications

---

## 🤝 Contributing

We welcome contributions from the community! Here's how to get started:

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/EDULEAGUE-KL.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes and commit**
   ```bash
   git add .
   git commit -m "Add your feature description"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request** on the main repository

### Code Style Guidelines:
- Use ESLint for JavaScript linting
- Follow React best practices
- Add comments for complex logic
- Test your changes before submitting PR

---

## 📖 Documentation

- [Setup Guide](./docs/SETUP.md)
- [API Documentation](./docs/API.md)
- [Database Schema](./docs/DATABASE.md)
- [Architecture Overview](./docs/ARCHITECTURE.md)

---

## 🐛 Troubleshooting

### Common Issues:

**MongoDB Connection Error:**
```
Error: connect ECONNREFUSED
```
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`

**Port Already in Use:**
```
Error: listen EADDRINUSE: address already in use :::5000
```
- Change PORT in `.env`
- Or kill the process: `lsof -ti:5000 | xargs kill -9`

**Dependencies Installation Failed:**
```bash
npm cache clean --force
npm install
```

---

## 📊 Performance Metrics

- **Frontend Bundle Size**: ~2.5 MB (gzipped)
- **Initial Load Time**: < 3 seconds
- **API Response Time**: < 200ms
- **Database Query Time**: < 50ms

---

## 🔄 Future Enhancements

- [ ] AI-powered code review system
- [ ] Automated testing framework
- [ ] Video conferencing for mentorships
- [ ] Mobile application (React Native)
- [ ] Blockchain-based certificates
- [ ] Advanced analytics dashboard
- [ ] Machine learning-based recommendations

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

---

## 👥 Authors

- **Karthik** - Lead Developer
- **EduLeague Team** - Full Stack Development

---

## 📞 Support & Contact

- **Email**: support@eduleague.com
- **GitHub Issues**: [Report a bug](https://github.com/karthiivan/EDULEAGUE-KL/issues)
- **Discussion Forum**: [Join our community](https://github.com/karthiivan/EDULEAGUE-KL/discussions)

---

## 🙏 Acknowledgments

- KL University for the inspiration
- React and Node.js communities
- All contributors who have helped improve this project

---

<div align="center">

**Made with ❤️ for students at KL University**

[⬆ back to top](#eduleague-kl---comprehensive-learning-platform)

</div>
