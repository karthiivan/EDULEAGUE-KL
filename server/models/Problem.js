const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  topics: [{
    type: String
  }],
  companyTags: [{
    type: String
  }],
  solution: {
    type: String
  },
  hints: [{
    type: String
  }],
  testCases: [{
    input: String,
    output: String,
    isHidden: {
      type: Boolean,
      default: false
    }
  }],
  constraints: String,
  timeComplexity: String,
  spaceComplexity: String,
  xpReward: {
    type: Number,
    default: 10
  },
  acceptanceRate: {
    type: Number,
    default: 0
  },
  totalSubmissions: {
    type: Number,
    default: 0
  },
  acceptedSubmissions: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Generate slug from title
problemSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Update acceptance rate
problemSchema.methods.updateAcceptanceRate = function() {
  if (this.totalSubmissions > 0) {
    this.acceptanceRate = Math.round((this.acceptedSubmissions / this.totalSubmissions) * 100);
  }
  return this.save();
};

module.exports = mongoose.model('Problem', problemSchema);
