const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Mock mentorships database
let mentorships = require('../../src/data/mockData').mentorships || [];

// @route   GET /api/mentorships
// @desc    Get all mentorships
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { topic, rating } = req.query;
    
    let filteredMentorships = [...mentorships];
    
    if (topic) {
      filteredMentorships = filteredMentorships.filter(m => 
        m.topic.toLowerCase().includes(topic.toLowerCase())
      );
    }
    
    if (rating) {
      filteredMentorships = filteredMentorships.filter(m => m.rating >= parseFloat(rating));
    }

    res.json({
      success: true,
      count: filteredMentorships.length,
      mentorships: filteredMentorships
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/mentorships/:id
// @desc    Get mentorship by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const mentorship = mentorships.find(m => m._id === req.params.id);
    
    if (!mentorship) {
      return res.status(404).json({
        success: false,
        message: 'Mentorship not found'
      });
    }

    res.json({
      success: true,
      mentorship
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   POST /api/mentorships
// @desc    Create mentorship (become a mentor)
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { topic, availability, hourlyRate } = req.body;

    const newMentorship = {
      _id: `mentor${Date.now()}`,
      mentorId: req.user.id,
      mentorName: req.user.name,
      topic,
      availability: availability || 'Weekends',
      hourlyRate: hourlyRate || 0,
      rating: 0,
      sessionsCompleted: 0,
      year: req.user.year,
      branch: req.user.branch,
      createdAt: new Date().toISOString()
    };

    mentorships.push(newMentorship);

    res.status(201).json({
      success: true,
      message: 'Mentorship created successfully',
      mentorship: newMentorship
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   POST /api/mentorships/:id/book
// @desc    Book a mentorship session
// @access  Private
router.post('/:id/book', protect, async (req, res) => {
  try {
    const mentorship = mentorships.find(m => m._id === req.params.id);
    
    if (!mentorship) {
      return res.status(404).json({
        success: false,
        message: 'Mentorship not found'
      });
    }

    const { date, time, duration } = req.body;

    const booking = {
      _id: `booking${Date.now()}`,
      mentorshipId: mentorship._id,
      studentId: req.user.id,
      studentName: req.user.name,
      date,
      time,
      duration: duration || 60,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'Session booked successfully',
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   POST /api/mentorships/:id/rate
// @desc    Rate a mentorship
// @access  Private
router.post('/:id/rate', protect, async (req, res) => {
  try {
    const mentorship = mentorships.find(m => m._id === req.params.id);
    
    if (!mentorship) {
      return res.status(404).json({
        success: false,
        message: 'Mentorship not found'
      });
    }

    const { rating, review } = req.body;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    // Update average rating (simplified)
    const totalRatings = mentorship.sessionsCompleted + 1;
    mentorship.rating = ((mentorship.rating * mentorship.sessionsCompleted) + rating) / totalRatings;
    mentorship.sessionsCompleted = totalRatings;

    res.json({
      success: true,
      message: 'Rating submitted successfully',
      mentorship
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   DELETE /api/mentorships/:id
// @desc    Delete mentorship
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const mentorshipIndex = mentorships.findIndex(m => m._id === req.params.id);
    
    if (mentorshipIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Mentorship not found'
      });
    }

    // Check if user is the mentor
    if (mentorships[mentorshipIndex].mentorId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this mentorship'
      });
    }

    mentorships.splice(mentorshipIndex, 1);

    res.json({
      success: true,
      message: 'Mentorship deleted successfully'
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
