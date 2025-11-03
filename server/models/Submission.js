const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem',
    required: true
  },
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    enum: ['javascript', 'python', 'java', 'cpp', 'c'],
    required: true
  },
  status: {
    type: String,
    enum: ['Accepted', 'Wrong Answer', 'Time Limit Exceeded', 'Runtime Error', 'Compilation Error', 'Pending'],
    default: 'Pending'
  },
  runtime: Number,
  memory: Number,
  testCasesPassed: Number,
  totalTestCases: Number,
  errorMessage: String
}, {
  timestamps: true
});

// Index for faster queries
submissionSchema.index({ userId: 1, problemId: 1 });
submissionSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Submission', submissionSchema);
