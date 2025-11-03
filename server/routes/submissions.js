const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { executeWithTestCases } = require('../utils/codeExecutor');
const Submission = require('../models/Submission');
const Problem = require('../models/Problem');
const User = require('../models/User');

// @route   POST /api/submissions
// @desc    Submit code for a problem
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { problemId, code, language } = req.body;

    if (!problemId || !code || !language) {
      return res.status(400).json({
        success: false,
        message: 'Problem ID, code, and language are required'
      });
    }

    // Get problem
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }

    // Execute code with test cases
    const executionResult = await executeWithTestCases(
      code,
      language,
      problem.testCases
    );

    // Determine status
    let status = 'Wrong Answer';
    if (executionResult.allPassed) {
      status = 'Accepted';
    } else if (executionResult.results[0]?.error) {
      if (executionResult.results[0].status.includes('Compilation')) {
        status = 'Compilation Error';
      } else if (executionResult.results[0].status.includes('Runtime')) {
        status = 'Runtime Error';
      } else if (executionResult.results[0].status.includes('Time Limit')) {
        status = 'Time Limit Exceeded';
      }
    }

    // Create submission
    const submission = await Submission.create({
      userId: req.user.id,
      problemId,
      code,
      language,
      status,
      testCasesPassed: executionResult.passedCount,
      totalTestCases: executionResult.totalCount,
      runtime: executionResult.results[0]?.time,
      memory: executionResult.results[0]?.memory
    });

    // Update problem stats
    problem.totalSubmissions += 1;
    if (status === 'Accepted') {
      problem.acceptedSubmissions += 1;
    }
    await problem.updateAcceptanceRate();

    // If accepted and first time solving
    if (status === 'Accepted' && !req.user.completedProblems.includes(problemId)) {
      req.user.completedProblems.push(problemId);
      await req.user.addXP(problem.xpReward);
      await req.user.updateStreak();
    }

    res.json({
      success: true,
      submission,
      executionResult,
      xpEarned: status === 'Accepted' ? problem.xpReward : 0
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/submissions/user/:userId
// @desc    Get user submissions
// @access  Private
router.get('/user/:userId', protect, async (req, res) => {
  try {
    const submissions = await Submission.find({ userId: req.params.userId })
      .populate('problemId', 'title difficulty')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      success: true,
      count: submissions.length,
      submissions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/submissions/problem/:problemId
// @desc    Get problem submissions
// @access  Private
router.get('/problem/:problemId', protect, async (req, res) => {
  try {
    const submissions = await Submission.find({ 
      problemId: req.params.problemId,
      userId: req.user.id 
    })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({
      success: true,
      count: submissions.length,
      submissions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;
