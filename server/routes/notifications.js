const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Mock notifications database (in real app, use MongoDB model)
let notifications = [];

// @route   GET /api/notifications
// @desc    Get user notifications
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { unreadOnly } = req.query;
    
    let userNotifications = notifications.filter(n => n.userId === req.user.id);
    
    if (unreadOnly === 'true') {
      userNotifications = userNotifications.filter(n => !n.read);
    }

    // Sort by newest first
    userNotifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({
      success: true,
      count: userNotifications.length,
      unreadCount: userNotifications.filter(n => !n.read).length,
      notifications: userNotifications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   POST /api/notifications
// @desc    Create notification
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { userId, type, title, message } = req.body;

    const newNotification = {
      _id: `notif${Date.now()}`,
      userId,
      type: type || 'info',
      title,
      message,
      read: false,
      createdAt: new Date().toISOString()
    };

    notifications.push(newNotification);

    res.status(201).json({
      success: true,
      message: 'Notification created',
      notification: newNotification
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   PUT /api/notifications/:id/read
// @desc    Mark notification as read
// @access  Private
router.put('/:id/read', protect, async (req, res) => {
  try {
    const notification = notifications.find(n => n._id === req.params.id);
    
    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    // Check if notification belongs to user
    if (notification.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    notification.read = true;
    notification.readAt = new Date().toISOString();

    res.json({
      success: true,
      message: 'Notification marked as read',
      notification
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   PUT /api/notifications/read-all
// @desc    Mark all notifications as read
// @access  Private
router.put('/read-all', protect, async (req, res) => {
  try {
    const userNotifications = notifications.filter(n => n.userId === req.user.id && !n.read);
    
    userNotifications.forEach(n => {
      n.read = true;
      n.readAt = new Date().toISOString();
    });

    res.json({
      success: true,
      message: `Marked ${userNotifications.length} notifications as read`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   DELETE /api/notifications/:id
// @desc    Delete notification
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const notificationIndex = notifications.findIndex(n => n._id === req.params.id);
    
    if (notificationIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    // Check if notification belongs to user
    if (notifications[notificationIndex].userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    notifications.splice(notificationIndex, 1);

    res.json({
      success: true,
      message: 'Notification deleted'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   DELETE /api/notifications
// @desc    Delete all user notifications
// @access  Private
router.delete('/', protect, async (req, res) => {
  try {
    const initialCount = notifications.length;
    notifications = notifications.filter(n => n.userId !== req.user.id);
    const deletedCount = initialCount - notifications.length;

    res.json({
      success: true,
      message: `Deleted ${deletedCount} notifications`
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
