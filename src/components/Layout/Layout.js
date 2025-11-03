import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import NotificationCenter from '../Notifications/NotificationCenter';
import {
  Home, Code, BookOpen, Users, FileText, FolderGit2, Briefcase,
  GraduationCap, User, Trophy, ChevronLeft, ChevronRight, TrendingUp,
  Moon, Sun, LogOut, Menu, X, Zap
} from 'lucide-react';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, logout, darkMode, toggleDarkMode, isTeacher } = useAuth();
  const location = useLocation();

  const studentMenuItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/coding-practice', icon: Code, label: 'Coding Practice' },
    { path: '/learn-skills', icon: BookOpen, label: 'Learn Skills' },
    { path: '/peer-learning', icon: Users, label: 'Peer Learning' },
    { path: '/resume-builder', icon: FileText, label: 'Resume Builder' },
    { path: '/projects', icon: FolderGit2, label: 'Projects' },
    { path: '/interview-prep', icon: Briefcase, label: 'Interview Prep' },
    { path: '/placements', icon: GraduationCap, label: 'Placements' },
    { path: '/forums', icon: Users, label: 'Forums' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/leaderboard', icon: Trophy, label: 'Leaderboard' }
  ];

  const teacherMenuItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/teacher-portal', icon: GraduationCap, label: 'Teacher Portal' },
    { path: '/analytics', icon: TrendingUp, label: 'Analytics' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  const menuItems = isTeacher ? teacherMenuItems : studentMenuItems;

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Top Header */}
      <header className={`fixed top-0 left-0 right-0 h-16 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} z-50`}>
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <div className="flex items-center space-x-2">
              <GraduationCap className="text-purple-600" size={32} />
              <h1 className="text-xl font-bold gradient-text hidden sm:block">EduLeague</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {!isTeacher && (
              <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white">
                <Zap size={18} />
                <span className="font-bold">{currentUser?.xp || 0} XP</span>
              </div>
            )}
            
            <NotificationCenter />

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200 dark:border-gray-700">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold">{currentUser?.name}</p>
                <p className="text-xs text-gray-500">
                  {isTeacher ? currentUser?.designation : `${currentUser?.year} Year ${currentUser?.branch}`}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                {currentUser?.name?.charAt(0)}
              </div>
            </div>

            <button
              onClick={logout}
              className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900 text-red-600"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } ${darkMode ? 'bg-gray-800' : 'bg-white'} border-r ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        } transition-all duration-300 z-40 hidden lg:block`}
      >
        <div className="h-full flex flex-col">
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    active
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : `${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                  }`}
                  title={!sidebarOpen ? item.label : ''}
                >
                  <Icon size={20} />
                  {sidebarOpen && <span className="font-medium">{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>
      </aside>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          <aside className={`absolute top-16 left-0 bottom-0 w-64 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
            <nav className="p-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                      active
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : `${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main
        className={`pt-16 ${
          sidebarOpen ? 'lg:pl-64' : 'lg:pl-20'
        } transition-all duration-300`}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
