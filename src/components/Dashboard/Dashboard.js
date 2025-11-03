import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { problems } from '../../data/problems';
import { badges as allBadges } from '../../data/mockData';
import {
  Code, BookOpen, Users, Trophy, TrendingUp, Flame,
  Target, Clock, Award, ChevronRight
} from 'lucide-react';

const Dashboard = () => {
  const { currentUser, darkMode } = useAuth();

  // Calculate stats
  const problemsSolved = currentUser?.completedProblems?.length || 0;
  const easyProblems = problems.filter(p => p.difficulty === 'Easy' && currentUser?.completedProblems?.includes(p._id)).length;
  const mediumProblems = problems.filter(p => p.difficulty === 'Medium' && currentUser?.completedProblems?.includes(p._id)).length;
  const hardProblems = problems.filter(p => p.difficulty === 'Hard' && currentUser?.completedProblems?.includes(p._id)).length;

  // Get user badges
  const userBadges = allBadges.filter(b => currentUser?.badges?.includes(b.id));

  // Recommended problems based on user's target role
  const recommendedProblems = problems.slice(0, 5);

  // Quick stats cards
  const statsCards = [
    {
      title: 'Problems Solved',
      value: problemsSolved,
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      link: '/coding-practice'
    },
    {
      title: 'Current Streak',
      value: `${currentUser?.streak || 0} days`,
      icon: Flame,
      color: 'from-orange-500 to-red-500',
      link: '/profile'
    },
    {
      title: 'Total XP',
      value: currentUser?.xp || 0,
      icon: Trophy,
      color: 'from-purple-500 to-pink-500',
      link: '/leaderboard'
    },
    {
      title: 'Badges Earned',
      value: userBadges.length,
      icon: Award,
      color: 'from-green-500 to-emerald-500',
      link: '/profile'
    }
  ];

  // Learning paths based on target role
  const learningPaths = {
    'SDE': [
      { track: 'DSA', progress: 45, icon: '🧮' },
      { track: 'System Design', progress: 20, icon: '🏗️' },
      { track: 'Backend', progress: 30, icon: '⚙️' }
    ],
    'Full Stack': [
      { track: 'Frontend', progress: 60, icon: '🎨' },
      { track: 'Backend', progress: 50, icon: '⚙️' },
      { track: 'DSA', progress: 35, icon: '🧮' }
    ],
    'Competitive Programming': [
      { track: 'CP', progress: 70, icon: '🏆' },
      { track: 'DSA', progress: 80, icon: '🧮' },
      { track: 'Math', progress: 55, icon: '🔢' }
    ]
  };

  const userLearningPath = learningPaths[currentUser?.targetRole] || learningPaths['SDE'];

  return (
    <div className="space-y-6 fade-in">
      {/* Welcome Section */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {currentUser?.name}! 👋
            </h1>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {currentUser?.year} Year {currentUser?.branch} • Target Role: {currentUser?.targetRole}
            </p>
          </div>
          <div className="hidden md:block">
            <div className="text-right">
              <p className="text-sm text-gray-500">Today's Goal</p>
              <p className="text-2xl font-bold gradient-text">Solve 3 Problems</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link
              key={index}
              to={stat.link}
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 card-hover`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                  <Icon className="text-white" size={24} />
                </div>
                <ChevronRight className="text-gray-400" size={20} />
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                {stat.title}
              </p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </Link>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Learning Path Progress */}
        <div className={`lg:col-span-2 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center">
              <Target className="mr-2 text-purple-600" size={24} />
              Your Learning Path ({currentUser?.targetRole})
            </h2>
            <Link to="/learn-skills" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              View All →
            </Link>
          </div>

          <div className="space-y-4">
            {userLearningPath.map((path, index) => (
              <div key={index} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{path.icon}</span>
                    <span className="font-semibold">{path.track}</span>
                  </div>
                  <span className="text-sm font-medium text-purple-600">{path.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${path.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/learn-skills"
            className="mt-6 w-full btn-primary text-center block"
          >
            Continue Learning
          </Link>
        </div>

        {/* Recent Achievements */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <Award className="mr-2 text-yellow-500" size={24} />
            Recent Badges
          </h2>

          <div className="space-y-3">
            {userBadges.slice(0, 4).map((badge, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} flex items-center space-x-3`}
              >
                <span className="text-3xl">{badge.icon}</span>
                <div>
                  <p className="font-semibold text-sm">{badge.name}</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {badge.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/profile"
            className="mt-4 text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center"
          >
            View All Badges <ChevronRight size={16} />
          </Link>
        </div>
      </div>

      {/* Recommended Problems */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center">
            <TrendingUp className="mr-2 text-green-600" size={24} />
            Recommended Problems for You
          </h2>
          <Link to="/coding-practice" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
            View All →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedProblems.map((problem) => (
            <Link
              key={problem._id}
              to={`/coding-practice/problem/${problem._id}`}
              className={`p-4 rounded-lg border ${
                darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'
              } transition`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-sm">{problem.title}</h3>
                <span className={`badge badge-${problem.difficulty.toLowerCase()}`}>
                  {problem.difficulty}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mb-2">
                {problem.topics.slice(0, 2).map((topic, i) => (
                  <span
                    key={i}
                    className={`text-xs px-2 py-1 rounded ${
                      darkMode ? 'bg-gray-600' : 'bg-gray-200'
                    }`}
                  >
                    {topic}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-500">+{problem.xpReward} XP</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <Link
          to="/coding-practice/rooms"
          className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 card-hover`}
        >
          <Users className="text-blue-600 mb-3" size={32} />
          <h3 className="font-bold text-lg mb-2">Join Coding Room</h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Collaborate with peers in real-time
          </p>
        </Link>

        <Link
          to="/peer-learning"
          className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 card-hover`}
        >
          <BookOpen className="text-green-600 mb-3" size={32} />
          <h3 className="font-bold text-lg mb-2">Find a Mentor</h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Get guidance from senior students
          </p>
        </Link>

        <Link
          to="/interview-prep"
          className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 card-hover`}
        >
          <Clock className="text-orange-600 mb-3" size={32} />
          <h3 className="font-bold text-lg mb-2">Mock Interview</h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Practice for your dream company
          </p>
        </Link>
      </div>

      {/* Problem Solving Stats */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <h2 className="text-xl font-bold mb-6">Problem Solving Progress</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Easy</span>
              <span className="text-sm font-bold text-green-600">{easyProblems}</span>
            </div>
            <div className="progress-bar">
              <div
                className="h-full bg-green-500 rounded-full transition-all"
                style={{ width: `${(easyProblems / 20) * 100}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Medium</span>
              <span className="text-sm font-bold text-yellow-600">{mediumProblems}</span>
            </div>
            <div className="progress-bar">
              <div
                className="h-full bg-yellow-500 rounded-full transition-all"
                style={{ width: `${(mediumProblems / 20) * 100}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Hard</span>
              <span className="text-sm font-bold text-red-600">{hardProblems}</span>
            </div>
            <div className="progress-bar">
              <div
                className="h-full bg-red-500 rounded-full transition-all"
                style={{ width: `${(hardProblems / 10) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
