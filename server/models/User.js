const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    default: 'student'
  },
  profilePicture: {
    type: String,
    default: null
  },
  
  // Student-specific fields
  year: {
    type: Number,
    min: 1,
    max: 4
  },
  branch: {
    type: String,
    enum: ['CSE', 'IT', 'ECE', 'EEE', 'MECH', 'CIVIL']
  },
  section: String,
  rollNumber: String,
  targetRole: {
    type: String,
    enum: ['SDE', 'Full Stack', 'Competitive Programming', 'Data Science', 'DevOps']
  },
  
  // Teacher-specific fields
  department: String,
  designation: String,
  subjects: [String],
  
  // Gamification
  xp: {
    type: Number,
    default: 0
  },
  streak: {
    type: Number,
    default: 0
  },
  lastActive: {
    type: Date,
    default: Date.now
  },
  badges: [{
    type: String
  }],
  
  // Skills and interests
  skills: [String],
  interests: [String],
  
  // Coding profiles
  codingProfiles: {
    leetcode: {
      username: String,
      problemsSolved: Number,
      rating: Number,
      ranking: Number
    },
    codechef: {
      username: String,
      rating: Number,
      stars: Number,
      globalRank: Number
    },
    codeforces: {
      username: String,
      rating: Number,
      rank: String
    },
    github: {
      username: String,
      repos: Number,
      contributions: Number
    }
  },
  
  // Progress tracking
  completedProblems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem'
  }],
  completedQuizzes: [{
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz'
    },
    score: Number,
    completedAt: Date
  }],
  joinedRooms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room'
  }],
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }],
  
  // Refresh token for JWT
  refreshToken: {
    type: String,
    select: false
  },
  
  // Account status
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Update streak
userSchema.methods.updateStreak = function() {
  const now = new Date();
  const lastActive = new Date(this.lastActive);
  const diffDays = Math.floor((now - lastActive) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) {
    this.streak += 1;
  } else if (diffDays > 1) {
    this.streak = 1;
  }
  
  this.lastActive = now;
  return this.save();
};

// Add XP
userSchema.methods.addXP = function(amount) {
  this.xp += amount;
  return this.save();
};

// Add badge
userSchema.methods.addBadge = function(badgeId) {
  if (!this.badges.includes(badgeId)) {
    this.badges.push(badgeId);
    return this.save();
  }
  return Promise.resolve(this);
};

module.exports = mongoose.model('User', userSchema);
