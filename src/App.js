import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Auth/Login';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import CodingPractice from './components/CodingPractice/CodingPractice';
import ProblemDetail from './components/CodingPractice/ProblemDetail';
import Rooms from './components/CodingPractice/Rooms';
import LearnSkills from './components/LearnSkills/LearnSkills';
import SkillTrack from './components/LearnSkills/SkillTrack';
import PeerLearning from './components/PeerLearning/PeerLearning';
import ResumeBuilder from './components/Resume/ResumeBuilder';
import Projects from './components/Projects/Projects';
import InterviewPrep from './components/Interview/InterviewPrep';
import Placements from './components/Placements/Placements';
import Profile from './components/Profile/Profile';
import Leaderboard from './components/Leaderboard/Leaderboard';
import TeacherPortal from './components/Teacher/TeacherPortal';
import AnalyticsDashboard from './components/Analytics/AnalyticsDashboard';
import Forums from './components/Forums/Forums';
import UserProfile from './components/UserProfile/UserProfile';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const TeacherRoute = ({ children }) => {
  const { isAuthenticated, isTeacher } = useAuth();
  return isAuthenticated && isTeacher ? children : <Navigate to="/dashboard" />;
};

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        
        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="coding-practice" element={<CodingPractice />} />
          <Route path="coding-practice/problem/:id" element={<ProblemDetail />} />
          <Route path="coding-practice/rooms" element={<Rooms />} />
          <Route path="learn-skills" element={<LearnSkills />} />
          <Route path="learn-skills/:track" element={<SkillTrack />} />
          <Route path="peer-learning" element={<PeerLearning />} />
          <Route path="resume-builder" element={<ResumeBuilder />} />
          <Route path="projects" element={<Projects />} />
          <Route path="interview-prep" element={<InterviewPrep />} />
          <Route path="placements" element={<Placements />} />
          <Route path="profile" element={<Profile />} />
          <Route path="user/:userId" element={<UserProfile />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="forums" element={<Forums />} />
          <Route path="analytics" element={<TeacherRoute><AnalyticsDashboard /></TeacherRoute>} />
          <Route path="teacher-portal" element={<TeacherRoute><TeacherPortal /></TeacherRoute>} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
