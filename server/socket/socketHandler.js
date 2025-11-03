const Room = require('../models/Room');
const User = require('../models/User');

module.exports = (io) => {
  // Store active connections
  const activeUsers = new Map();

  io.on('connection', (socket) => {
    console.log(`✅ User connected: ${socket.id}`);

    // User authentication
    socket.on('authenticate', async (userId) => {
      try {
        const user = await User.findById(userId);
        if (user) {
          activeUsers.set(socket.id, { userId, userName: user.name });
          socket.userId = userId;
          socket.userName = user.name;
          console.log(`👤 User authenticated: ${user.name}`);
        }
      } catch (error) {
        console.error('Authentication error:', error);
      }
    });

    // Join coding room
    socket.on('join-room', async ({ roomId, userId }) => {
      try {
        const room = await Room.findById(roomId).populate('participants', 'name');
        if (!room) {
          socket.emit('error', { message: 'Room not found' });
          return;
        }

        // Add user to room participants if not already there
        if (!room.participants.some(p => p._id.toString() === userId)) {
          room.participants.push(userId);
          await room.save();
        }

        // Join socket room
        socket.join(roomId);
        socket.currentRoom = roomId;

        // Notify others in the room
        const user = await User.findById(userId);
        socket.to(roomId).emit('user-joined', {
          userId,
          userName: user.name,
          timestamp: new Date()
        });

        // Send room data to user
        socket.emit('room-joined', {
          room,
          participants: room.participants
        });

        console.log(`👥 User ${user.name} joined room ${room.name}`);
      } catch (error) {
        console.error('Join room error:', error);
        socket.emit('error', { message: 'Failed to join room' });
      }
    });

    // Leave room
    socket.on('leave-room', async ({ roomId, userId }) => {
      try {
        socket.leave(roomId);
        
        const user = await User.findById(userId);
        socket.to(roomId).emit('user-left', {
          userId,
          userName: user.name,
          timestamp: new Date()
        });

        console.log(`👋 User ${user.name} left room`);
      } catch (error) {
        console.error('Leave room error:', error);
      }
    });

    // Send message in room
    socket.on('send-message', async ({ roomId, userId, message }) => {
      try {
        const room = await Room.findById(roomId);
        const user = await User.findById(userId);

        if (!room || !user) {
          socket.emit('error', { message: 'Room or user not found' });
          return;
        }

        // Save message to database
        room.messages.push({
          userId,
          message,
          type: 'text',
          timestamp: new Date()
        });
        await room.save();

        // Broadcast message to room
        io.to(roomId).emit('new-message', {
          userId,
          userName: user.name,
          message,
          timestamp: new Date()
        });

        console.log(`💬 Message in room ${room.name}: ${message}`);
      } catch (error) {
        console.error('Send message error:', error);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // Code update in room
    socket.on('code-update', async ({ roomId, code, language }) => {
      try {
        const room = await Room.findById(roomId);
        if (!room) {
          socket.emit('error', { message: 'Room not found' });
          return;
        }

        // Update shared code
        room.sharedCode = code;
        room.language = language;
        await room.save();

        // Broadcast to others in room (not sender)
        socket.to(roomId).emit('code-updated', {
          code,
          language,
          updatedBy: socket.userName,
          timestamp: new Date()
        });
      } catch (error) {
        console.error('Code update error:', error);
      }
    });

    // Cursor position update (for collaborative editing)
    socket.on('cursor-move', ({ roomId, position, userId }) => {
      socket.to(roomId).emit('cursor-moved', {
        userId,
        userName: socket.userName,
        position
      });
    });

    // Typing indicator
    socket.on('typing-start', ({ roomId }) => {
      socket.to(roomId).emit('user-typing', {
        userId: socket.userId,
        userName: socket.userName
      });
    });

    socket.on('typing-stop', ({ roomId }) => {
      socket.to(roomId).emit('user-stopped-typing', {
        userId: socket.userId
      });
    });

    // Send notification
    socket.on('send-notification', async ({ userId, notification }) => {
      try {
        // Find user's socket
        const userSockets = Array.from(activeUsers.entries())
          .filter(([_, data]) => data.userId === userId)
          .map(([socketId]) => socketId);

        // Send notification to all user's connections
        userSockets.forEach(socketId => {
          io.to(socketId).emit('notification', notification);
        });
      } catch (error) {
        console.error('Send notification error:', error);
      }
    });

    // Broadcast system message
    socket.on('system-message', ({ roomId, message }) => {
      io.to(roomId).emit('system-message', {
        message,
        timestamp: new Date()
      });
    });

    // Handle disconnection
    socket.on('disconnect', async () => {
      console.log(`❌ User disconnected: ${socket.id}`);

      // Notify room if user was in one
      if (socket.currentRoom && socket.userId) {
        try {
          const user = await User.findById(socket.userId);
          socket.to(socket.currentRoom).emit('user-left', {
            userId: socket.userId,
            userName: user?.name || 'Unknown',
            timestamp: new Date()
          });
        } catch (error) {
          console.error('Disconnect notification error:', error);
        }
      }

      activeUsers.delete(socket.id);
    });

    // Error handling
    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  });

  // Broadcast to all connected users
  const broadcastToAll = (event, data) => {
    io.emit(event, data);
  };

  // Broadcast to specific room
  const broadcastToRoom = (roomId, event, data) => {
    io.to(roomId).emit(event, data);
  };

  return { broadcastToAll, broadcastToRoom };
};
