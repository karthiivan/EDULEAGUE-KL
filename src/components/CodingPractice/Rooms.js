import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { rooms as initialRooms } from '../../data/mockData';
import { users } from '../../data/users';
import { Plus, Users, Code, Clock, LogIn, X } from 'lucide-react';

const Rooms = () => {
  const { currentUser, darkMode } = useAuth();
  const [rooms, setRooms] = useState(initialRooms);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [newRoom, setNewRoom] = useState({
    name: '',
    type: 'Study Group',
    problemId: 'prob001'
  });
  const [joinCode, setJoinCode] = useState('');

  const handleCreateRoom = () => {
    const room = {
      _id: `room${Date.now()}`,
      name: newRoom.name,
      code: Math.random().toString(36).substring(2, 8).toUpperCase(),
      creatorId: currentUser._id,
      participants: [currentUser._id],
      type: newRoom.type,
      problemId: newRoom.problemId,
      isActive: true,
      createdAt: new Date().toISOString()
    };

    setRooms([...rooms, room]);
    setShowCreateModal(false);
    setNewRoom({ name: '', type: 'Study Group', problemId: 'prob001' });
  };

  const handleJoinRoom = () => {
    const room = rooms.find(r => r.code === joinCode.toUpperCase());
    if (room && !room.participants.includes(currentUser._id)) {
      const updatedRooms = rooms.map(r => 
        r._id === room._id 
          ? { ...r, participants: [...r.participants, currentUser._id] }
          : r
      );
      setRooms(updatedRooms);
      setShowJoinModal(false);
      setJoinCode('');
    }
  };

  const activeRooms = rooms.filter(r => r.isActive);
  const myRooms = activeRooms.filter(r => r.participants.includes(currentUser._id));

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Coding Rooms</h1>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Collaborate with peers in real-time
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowJoinModal(true)}
              className="btn-secondary flex items-center space-x-2"
            >
              <LogIn size={20} />
              <span>Join Room</span>
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Create Room</span>
            </button>
          </div>
        </div>
      </div>

      {/* My Rooms */}
      {myRooms.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">My Rooms</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myRooms.map(room => {
              const creator = users.find(u => u._id === room.creatorId);
              return (
                <div
                  key={room._id}
                  className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 card-hover`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg mb-1">{room.name}</h3>
                      <p className="text-sm text-gray-500">{room.type}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                      Active
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <Users size={16} className="text-gray-500" />
                      <span>{room.participants.length} participants</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Code size={16} className="text-gray-500" />
                      <span>Problem: {room.problemId}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock size={16} className="text-gray-500" />
                      <span>Created by {creator?.name}</span>
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} mb-4`}>
                    <p className="text-xs text-gray-500 mb-1">Room Code</p>
                    <p className="text-lg font-bold tracking-wider">{room.code}</p>
                  </div>

                  <button className="w-full btn-primary">
                    Enter Room
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* All Active Rooms */}
      <div>
        <h2 className="text-xl font-bold mb-4">All Active Rooms</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeRooms.map(room => {
            const creator = users.find(u => u._id === room.creatorId);
            const isJoined = room.participants.includes(currentUser._id);
            
            return (
              <div
                key={room._id}
                className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 card-hover`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg mb-1">{room.name}</h3>
                    <p className="text-sm text-gray-500">{room.type}</p>
                  </div>
                  {isJoined && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                      Joined
                    </span>
                  )}
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Users size={16} className="text-gray-500" />
                    <span>{room.participants.length} participants</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Code size={16} className="text-gray-500" />
                    <span>Problem: {room.problemId}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock size={16} className="text-gray-500" />
                    <span>Created by {creator?.name}</span>
                  </div>
                </div>

                <button
                  className={`w-full ${isJoined ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => {
                    if (!isJoined) {
                      const updatedRooms = rooms.map(r => 
                        r._id === room._id 
                          ? { ...r, participants: [...r.participants, currentUser._id] }
                          : r
                      );
                      setRooms(updatedRooms);
                    }
                  }}
                >
                  {isJoined ? 'Enter Room' : 'Join Room'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Create Room Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl max-w-md w-full p-6`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Create Room</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Room Name</label>
                <input
                  type="text"
                  value={newRoom.name}
                  onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
                  }`}
                  placeholder="Enter room name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Room Type</label>
                <select
                  value={newRoom.type}
                  onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
                  }`}
                >
                  <option>Study Group</option>
                  <option>Contest Practice</option>
                  <option>Peer Programming</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Problem</label>
                <select
                  value={newRoom.problemId}
                  onChange={(e) => setNewRoom({ ...newRoom, problemId: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
                  }`}
                >
                  <option value="prob001">Two Sum</option>
                  <option value="prob002">Valid Parentheses</option>
                  <option value="prob003">Merge Two Sorted Lists</option>
                </select>
              </div>

              <button
                onClick={handleCreateRoom}
                disabled={!newRoom.name}
                className="w-full btn-primary disabled:opacity-50"
              >
                Create Room
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Join Room Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl max-w-md w-full p-6`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Join Room</h2>
              <button
                onClick={() => setShowJoinModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Room Code</label>
                <input
                  type="text"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  className={`w-full px-4 py-2 border rounded-lg text-center text-2xl font-bold tracking-wider ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
                  }`}
                  placeholder="XXXXXX"
                  maxLength={6}
                />
              </div>

              <button
                onClick={handleJoinRoom}
                disabled={joinCode.length !== 6}
                className="w-full btn-primary disabled:opacity-50"
              >
                Join Room
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rooms;
