const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  message: String,
  type: {
    type: String,
    enum: ['text', 'code', 'system'],
    default: 'text'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    unique: true,
    required: true
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  type: {
    type: String,
    enum: ['Study Group', 'Contest Practice', 'Peer Programming', 'Mock Interview'],
    default: 'Study Group'
  },
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem'
  },
  sharedCode: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: 'javascript'
  },
  messages: [messageSchema],
  isActive: {
    type: Boolean,
    default: true
  },
  maxParticipants: {
    type: Number,
    default: 10
  }
}, {
  timestamps: true
});

// Generate unique room code
roomSchema.pre('save', function(next) {
  if (!this.code) {
    this.code = Math.random().toString(36).substring(2, 8).toUpperCase();
  }
  next();
});

module.exports = mongoose.model('Room', roomSchema);
