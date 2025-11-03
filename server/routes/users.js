const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { uploadSingle, deleteFile } = require('../middleware/upload');
const User = require('../models/User');
const path = require('path');

// @route   GET /api/users
// @desc    Get all users (teachers only)
// @access  Private/Teacher
router.get('/', protect, authorize('teacher', 'admin'), async (req, res) => {
  try {
    const { year, branch, role } = req.query;
    
    let query = {};
    if (year) query.year = year;
    if (branch) query.branch = branch;
    if (role) query.role = role;

    const users = await User.find(query)
      .select('-password -refreshToken')
      .sort({ xp: -1 });

    res.json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password -refreshToken')
      .populate('completedProblems', 'title difficulty xpReward')
      .populate('projects', 'title status category');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   PUT /api/users/:id
// @desc    Update user
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    // Users can only update their own profile
    if (req.user.id !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this profile'
      });
    }

    const { name, skills, interests, codingProfiles, targetRole } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, skills, interests, codingProfiles, targetRole },
      { new: true, runValidators: true }
    ).select('-password -refreshToken');

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   POST /api/users/upload-avatar
// @desc    Upload profile picture
// @access  Private
router.post('/upload-avatar', protect, uploadSingle('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // Delete old avatar if exists
    if (req.user.profilePicture) {
      const oldPath = path.join(__dirname, '..', req.user.profilePicture);
      try {
        await deleteFile(oldPath);
      } catch (err) {
        console.error('Error deleting old avatar:', err);
      }
    }

    // Update user with new avatar path
    const avatarPath = `/uploads/avatars/${req.file.filename}`;
    req.user.profilePicture = avatarPath;
    await req.user.save();

    res.json({
      success: true,
      message: 'Profile picture uploaded successfully',
      profilePicture: avatarPath
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   POST /api/users/upload-resume
// @desc    Upload resume
// @access  Private
router.post('/upload-resume', protect, uploadSingle('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const resumePath = `/uploads/resumes/${req.file.filename}`;

    res.json({
      success: true,
      message: 'Resume uploaded successfully',
      resumePath,
      filename: req.file.originalname,
      size: req.file.size
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/users/leaderboard
// @desc    Get leaderboard
// @access  Public
router.get('/leaderboard/all', async (req, res) => {
  try {
    const { year, branch, limit = 100 } = req.query;

    let query = { role: 'student' };
    if (year) query.year = year;
    if (branch) query.branch = branch;

    const users = await User.find(query)
      .select('name year branch xp streak badges completedProblems')
      .sort({ xp: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      count: users.length,
      leaderboard: users
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
