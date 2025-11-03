const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const Problem = require('../models/Problem');

// GET /api/problems - Get all problems
router.get('/', async (req, res) => {
  try {
    const { difficulty, topic, company } = req.query;
    let query = { isActive: true };
    
    if (difficulty) query.difficulty = difficulty;
    if (topic) query.topics = topic;
    if (company) query.companyTags = company;

    const problems = await Problem.find(query).select('-solution');
    res.json({ success: true, count: problems.length, problems });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/problems/:id - Get problem by ID
router.get('/:id', async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem not found' });
    }
    res.json({ success: true, problem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/problems - Create problem (teacher only)
router.post('/', protect, authorize('teacher', 'admin'), async (req, res) => {
  try {
    const problem = await Problem.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json({ success: true, problem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
