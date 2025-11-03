const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Room = require('../models/Room');

// GET /api/rooms - Get all active rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find({ isActive: true })
      .populate('creatorId', 'name')
      .populate('participants', 'name');
    res.json({ success: true, rooms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/rooms - Create room
router.post('/', protect, async (req, res) => {
  try {
    const room = await Room.create({
      ...req.body,
      creatorId: req.user.id,
      participants: [req.user.id]
    });
    res.status(201).json({ success: true, room });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/rooms/:id/join - Join room
router.post('/:id/join', protect, async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room.participants.includes(req.user.id)) {
      room.participants.push(req.user.id);
      await room.save();
    }
    res.json({ success: true, room });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
