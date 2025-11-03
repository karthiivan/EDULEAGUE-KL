import ReactGA from 'react-ga4';

// Initialize Google Analytics
export const initGA = () => {
  const GA_ID = process.env.REACT_APP_GA_ID || 'G-XXXXXXXXXX';
  
  if (GA_ID && GA_ID !== 'G-XXXXXXXXXX') {
    ReactGA.initialize(GA_ID, {
      gaOptions: {
        siteSpeedSampleRate: 100
      }
    });
    console.log('✅ Google Analytics initialized');
  }
};

// Track page views
export const trackPageView = (path) => {
  ReactGA.send({ hitType: 'pageview', page: path });
};

// Track events
export const trackEvent = (category, action, label = '', value = 0) => {
  ReactGA.event({
    category,
    action,
    label,
    value
  });
};

// Track user actions
export const trackUserAction = {
  // Authentication
  login: (method = 'email') => {
    trackEvent('Authentication', 'Login', method);
  },
  
  register: (role = 'student') => {
    trackEvent('Authentication', 'Register', role);
  },
  
  logout: () => {
    trackEvent('Authentication', 'Logout');
  },

  // Problem solving
  problemView: (problemId, difficulty) => {
    trackEvent('Problems', 'View Problem', difficulty);
  },
  
  problemSubmit: (problemId, status) => {
    trackEvent('Problems', 'Submit Solution', status);
  },
  
  problemSolved: (problemId, difficulty) => {
    trackEvent('Problems', 'Problem Solved', difficulty);
  },

  // Rooms
  roomCreate: (type) => {
    trackEvent('Rooms', 'Create Room', type);
  },
  
  roomJoin: (roomId) => {
    trackEvent('Rooms', 'Join Room');
  },
  
  roomLeave: (roomId) => {
    trackEvent('Rooms', 'Leave Room');
  },

  // Learning
  quizStart: (trackId) => {
    trackEvent('Learning', 'Start Quiz', trackId);
  },
  
  quizComplete: (trackId, score) => {
    trackEvent('Learning', 'Complete Quiz', trackId, score);
  },
  
  trackView: (trackId) => {
    trackEvent('Learning', 'View Track', trackId);
  },

  // Projects
  projectCreate: (category) => {
    trackEvent('Projects', 'Create Project', category);
  },
  
  projectJoin: (projectId) => {
    trackEvent('Projects', 'Join Project');
  },

  // Mentorship
  mentorView: (mentorId) => {
    trackEvent('Mentorship', 'View Mentor Profile');
  },
  
  sessionSchedule: (mentorId) => {
    trackEvent('Mentorship', 'Schedule Session');
  },

  // Resume
  resumeGenerate: (templateId) => {
    trackEvent('Resume', 'Generate Resume', templateId);
  },
  
  resumeDownload: (format) => {
    trackEvent('Resume', 'Download Resume', format);
  },
  
  atsCheck: (score) => {
    trackEvent('Resume', 'ATS Check', 'Score', score);
  },

  // Profile
  profileUpdate: () => {
    trackEvent('Profile', 'Update Profile');
  },
  
  codingProfileLink: (platform) => {
    trackEvent('Profile', 'Link Coding Profile', platform);
  },

  // Gamification
  xpEarned: (amount, source) => {
    trackEvent('Gamification', 'XP Earned', source, amount);
  },
  
  badgeEarned: (badgeId) => {
    trackEvent('Gamification', 'Badge Earned', badgeId);
  },
  
  streakUpdate: (days) => {
    trackEvent('Gamification', 'Streak Update', 'Days', days);
  },

  // Interview Prep
  mockInterviewSchedule: () => {
    trackEvent('Interview', 'Schedule Mock Interview');
  },
  
  interviewQuestionView: (company) => {
    trackEvent('Interview', 'View Question', company);
  },

  // Placements
  placementView: (company) => {
    trackEvent('Placements', 'View Placement', company);
  },

  // UI Interactions
  darkModeToggle: (enabled) => {
    trackEvent('UI', 'Dark Mode Toggle', enabled ? 'Enabled' : 'Disabled');
  },
  
  searchPerformed: (query, section) => {
    trackEvent('Search', section, query);
  },
  
  filterApplied: (filterType, value) => {
    trackEvent('Filter', filterType, value);
  }
};

// Track timing
export const trackTiming = (category, variable, value, label = '') => {
  ReactGA.event({
    category: 'Timing',
    action: category,
    label: `${variable}: ${label}`,
    value: Math.round(value)
  });
};

// Track errors
export const trackError = (description, fatal = false) => {
  ReactGA.event({
    category: 'Error',
    action: description,
    label: fatal ? 'Fatal' : 'Non-Fatal'
  });
};

// Set user properties
export const setUserProperties = (userId, properties) => {
  ReactGA.set({
    userId,
    ...properties
  });
};

// Track user demographics
export const trackUserDemographics = (user) => {
  if (user) {
    setUserProperties(user._id, {
      user_role: user.role,
      user_year: user.year,
      user_branch: user.branch,
      user_xp: user.xp,
      user_streak: user.streak
    });
  }
};
