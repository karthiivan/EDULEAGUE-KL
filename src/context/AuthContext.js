import React, { createContext, useState, useContext, useEffect } from 'react';
import { users } from '../data/users';
import { authAPI } from '../services/api';

const AuthContext = createContext();

// Toggle this to switch between mock data and real API
const USE_REAL_API = false; // Set to true when backend is running

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check localStorage for saved session
    const savedUser = localStorage.getItem('eduLeagueUser');
    const savedDarkMode = localStorage.getItem('darkMode');
    
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  useEffect(() => {
    // Apply dark mode class to body
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const login = async (email, password) => {
    if (USE_REAL_API) {
      // Real API call
      try {
        const response = await authAPI.login(email, password);
        const { token, user } = response.data;
        
        localStorage.setItem('token', token);
        localStorage.setItem('eduLeagueUser', JSON.stringify(user));
        setCurrentUser(user);
        
        return { success: true, user };
      } catch (error) {
        return { 
          success: false, 
          message: error.response?.data?.message || 'Login failed' 
        };
      }
    } else {
      // Mock data (current implementation)
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        setCurrentUser(user);
        localStorage.setItem('eduLeagueUser', JSON.stringify(user));
        return { success: true, user };
      }
      return { success: false, message: 'Invalid credentials' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('eduLeagueUser');
  };

  const updateUser = (updates) => {
    const updatedUser = { ...currentUser, ...updates };
    setCurrentUser(updatedUser);
    localStorage.setItem('eduLeagueUser', JSON.stringify(updatedUser));
    
    // Update in users array
    const userIndex = users.findIndex(u => u._id === currentUser._id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
    }
  };

  const addXP = (amount) => {
    updateUser({ xp: currentUser.xp + amount });
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  const value = {
    currentUser,
    login,
    logout,
    updateUser,
    addXP,
    darkMode,
    toggleDarkMode,
    isAuthenticated: !!currentUser,
    isTeacher: currentUser?.role === 'teacher',
    isStudent: currentUser?.role === 'student'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
