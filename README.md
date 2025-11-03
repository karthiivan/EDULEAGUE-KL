# EduLeague - KL University Learning Platform

A comprehensive full-stack learning platform specifically designed for KL University B.Tech students and coding enthusiasts.

## 🚀 Features

### 8 Main Sections

1. **AI-Powered Personalized Dashboard**
   - Recommended learning paths based on user profile
   - Skill assessment quizzes
   - Coding streak tracker
   - Quick stats and progress overview

2. **Coding Practice Hub with Collaborative Rooms**
   - 50+ coding problems (Easy/Medium/Hard)
   - Integrated Monaco code editor
   - Create/Join coding rooms for collaboration
   - Problem filtering by difficulty, topics, and companies
   - Real-time XP rewards

3. **Learn Skills Section (5 Tracks)**
   - Data Structures & Algorithms
   - Competitive Programming
   - SQL & Database Management
   - Frontend Development
   - Backend Development
   - Interactive roadmaps and quizzes for each track

4. **Peer Learning Marketplace**
   - Student-to-student mentorship system
   - Schedule 1-on-1 sessions
   - Rating and review system
   - Filter mentors by skill, year, and rating

5. **Smart Resume Tools**
   - 5 ATS-friendly templates
   - Auto-populate from user profile
   - ATS Score Checker
   - Export as PDF

6. **Project Collaboration Hub**
   - Post project ideas
   - Find teammates based on skills
   - GitHub integration
   - Project categories and status tracking

7. **Interview Prep Center**
   - Company-wise interview questions database
   - Mock interview scheduling
   - AI feedback on code submissions
   - Interview experience sharing

8. **Placement Tracker (KL University Specific)**
   - Placement statistics by year and branch
   - Upcoming company visits
   - Alumni directory
   - Selection process details

### Gamification System

- **XP Points**: Earn XP by solving problems, completing quizzes, and helping peers
- **Badges**: 9 unique badges including First Blood, Coding Ninja, Streak Master
- **Leaderboards**: Global, Year-wise, and Branch-wise rankings
- **Coding Streak**: Daily activity tracker with heatmap calendar

### Coding Profiles Showcase

- Integrated LeetCode, CodeChef, Codeforces, and GitHub profiles
- Auto-sync stats and rankings
- Unified profile card display

### Teacher's Portal

- Student progress tracking
- Analytics dashboard with charts
- At-risk student identification
- Performance reports and exports

## 👥 Sample Users

**Students:**
1. Vasi - 2nd Year CSE - 1850 XP
2. Sahith - 3rd Year IT - 2400 XP
3. Karthikeya - 2nd Year ECE - 1620 XP
4. Shiva - 4th Year CSE - 3100 XP
5. Priya Sharma - 3rd Year CSE - 2150 XP
6. Arjun Reddy - 2nd Year IT - 1730 XP
7. Ananya Kumar - 4th Year CSE - 2890 XP
8. Rohit Verma - 3rd Year ECE - 1980 XP
9. Sneha Patel - 2nd Year CSE - 1560 XP
10. Aditya Singh - 3rd Year IT - 2320 XP

**Teachers:**
- Dr. Rajesh Kumar (CSE)
- Prof. Lakshmi Devi (IT)

## 🛠️ Tech Stack

### Frontend
- React 18.2.0
- React Router DOM 6.20.0
- Lucide React (Icons)
- Monaco Editor (Code Editor)
- Recharts (Analytics Charts)

### State Management
- React Context API
- LocalStorage for persistence

### Styling
- Custom CSS with dark mode support
- Gradient backgrounds
- Responsive design (mobile-first)

### Database Design
- MongoDB schema pattern (simulated in-memory)
- Collections: Users, Problems, Submissions, Projects, Quizzes, Mentorships, Placements, Rooms

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔐 Login Credentials

### Students
- Email: `vasi@kluniversity.in` | Password: `password123`
- Email: `sahith@kluniversity.in` | Password: `password123`
- (All student accounts use password: `password123`)

### Teachers
- Email: `rajesh.kumar@kluniversity.in` | Password: `teacher123`
- Email: `lakshmi.devi@kluniversity.in` | Password: `teacher123`

## 🎯 Key Features Implemented

✅ Full authentication system with role-based access
✅ Live gamification with real-time XP updates
✅ Functional code editor with syntax highlighting
✅ Interactive quizzes with scoring
✅ Collaborative coding rooms
✅ Complete skill tracks with roadmaps
✅ Mentor marketplace with ratings
✅ Resume builder with ATS checker
✅ Project collaboration system
✅ Interview prep with company questions
✅ Placement tracker with statistics
✅ Teacher portal with analytics
✅ Dark mode toggle
✅ Responsive design
✅ Leaderboard system

## 📊 Database Collections

### Users
- Student and teacher profiles
- XP, streak, badges
- Coding profiles (LeetCode, CodeChef, etc.)
- Completed problems and achievements

### Problems
- 50+ coding problems
- Difficulty levels, topics, company tags
- Test cases and solutions

### Projects
- Project ideas and team formation
- Required skills and status tracking

### Rooms
- Collaborative coding rooms
- Room codes and participants

### Mentorships
- Mentor profiles with ratings
- Session tracking

### Placements
- Company visit data
- Selection process and packages

## 🎨 UI/UX Features

- Clean, professional interface
- Smooth animations and transitions
- Intuitive navigation with sidebar
- Color-coded sections
- Loading states and notifications
- Mobile-responsive design
- Accessibility features

## 📱 Responsive Design

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🌙 Dark Mode

Toggle between light and dark themes with persistent storage.

## 🏆 Gamification Details

### XP Rewards
- Easy Problem: +10 XP
- Medium Problem: +25 XP
- Hard Problem: +50 XP
- Quiz Completion: +15 XP
- Mentorship Session: +20 XP

### Badges
- First Blood, Problem Solver, Coding Ninja
- Streak Master, Mentor, Team Player
- Interview Ready, SQL Wizard, Full Stack Dev

## 📈 Analytics (Teacher Portal)

- Year-wise performance charts
- Branch distribution pie charts
- Top performers tracking
- At-risk student identification
- Export functionality

## 🔄 Future Enhancements

- Real backend with Node.js/Express
- MongoDB database integration
- Real-time collaboration with Socket.io
- Video call integration for mock interviews
- Email notifications
- Mobile app (React Native)

## 📄 License

© 2024 EduLeague - KL University

## 👨‍💻 Development

This is a single-page application built with React. All data is simulated in-memory with localStorage persistence for demo purposes.

---

**Built with ❤️ for KL University Students**
