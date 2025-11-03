const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Mock quiz questions database
const quizQuestions = require('../../src/data/quizQuestions').quizQuestions || {};

// @route   GET /api/quizzes
// @desc    Get all quiz tracks
// @access  Public
router.get('/', async (req, res) => {
  try {
    const tracks = Object.keys(quizQuestions).map(track => ({
      track,
      questionCount: quizQuestions[track].length
    }));

    res.json({
      success: true,
      count: tracks.length,
      tracks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/quizzes/:track
// @desc    Get quiz questions for a track
// @access  Public
router.get('/:track', async (req, res) => {
  try {
    const { track } = req.params;
    const { limit = 5 } = req.query;

    const questions = quizQuestions[track];

    if (!questions) {
      return res.status(404).json({
        success: false,
        message: 'Track not found'
      });
    }

    // Get random questions
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, parseInt(limit));

    // Remove correct answers from response
    const questionsWithoutAnswers = selectedQuestions.map(q => ({
      id: q.id,
      question: q.question,
      options: q.options
    }));

    res.json({
      success: true,
      track,
      count: selectedQuestions.length,
      questions: questionsWithoutAnswers,
      // Store correct answers in session or return quiz ID for later verification
      quizId: `quiz_${Date.now()}`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   POST /api/quizzes/:track/submit
// @desc    Submit quiz answers
// @access  Private
router.post('/:track/submit', protect, async (req, res) => {
  try {
    const { track } = req.params;
    const { answers } = req.body; // Array of { questionId, selectedAnswer }

    const questions = quizQuestions[track];

    if (!questions) {
      return res.status(404).json({
        success: false,
        message: 'Track not found'
      });
    }

    let correctCount = 0;
    const results = answers.map(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      
      if (!question) {
        return {
          questionId: answer.questionId,
          correct: false,
          error: 'Question not found'
        };
      }

      const isCorrect = question.correctAnswer === answer.selectedAnswer;
      if (isCorrect) correctCount++;

      return {
        questionId: answer.questionId,
        question: question.question,
        selectedAnswer: answer.selectedAnswer,
        correctAnswer: question.correctAnswer,
        correct: isCorrect,
        explanation: question.explanation
      };
    });

    const score = Math.round((correctCount / answers.length) * 100);
    const xpEarned = score >= 60 ? 15 : 0; // Award XP if score >= 60%

    // Update user XP (in real app, update database)
    if (xpEarned > 0) {
      // req.user.xp += xpEarned;
      // await req.user.save();
    }

    res.json({
      success: true,
      score,
      correctCount,
      totalQuestions: answers.length,
      xpEarned,
      results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/quizzes/:track/question/:id
// @desc    Get specific question with answer (for review)
// @access  Private
router.get('/:track/question/:id', protect, async (req, res) => {
  try {
    const { track, id } = req.params;
    const questions = quizQuestions[track];

    if (!questions) {
      return res.status(404).json({
        success: false,
        message: 'Track not found'
      });
    }

    const question = questions.find(q => q.id === id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    res.json({
      success: true,
      question
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
