import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { rooms as mockRooms } from '../../data/mockData';
import { users } from '../../data/users';
import { ArrowLeft, Send, Users, Code2, MessageSquare } from 'lucide-react';
import Editor from '@monaco-editor/react';

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, darkMode } = useAuth();
  const [room, setRoom] = useState(null);
  const [code, setCode] = useState('// Collaborative code editor\n\n');
  const [language, setLanguage] = useState('javascript');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState('code'); // 'code' or 'chat'
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Find room
    const foundRoom = mockRooms.find(r => r._id === id);
    if (foundRoom) {
      setRoom(foundRoom);
      setCode(foundRoom.sharedCode || '// Collaborative code editor\n\n');
      setLanguage(foundRoom.language || 'javascript');
      
      // Initialize messages
      if (foundRoom.messages) {
        setMessages(foundRoom.messages);
      }
    }
  }, [id]);

  useEffect(() => {
    // Scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate real-time code updates
  const handleCodeChange = (value) => {
    setCode(value);
    // In real implementation, emit socket event here
    // socket.emit('code-update', { roomId: id, code: value, language });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      userId: currentUser._id,
      userName: currentUser.name,
      message: message.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages([...messages, newMessage]);
    setMessage('');
    
    // In real implementation, emit socket event here
    // socket.emit('send-message', { roomId: id, message: message.trim() });
  };

  const handleRunCode = () => {
    console.log('Running code:', code);
    // Implement code execution
  };

  if (!room) {
    return <div>Room not found</div>;
  }

  const participants = room.participants.map(pid => 
    users.find(u => u._id === pid)
  ).filter(Boolean);

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/coding-practice/rooms')}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-bold">{room.name}</h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {room.type} • Room Code: <span className="font-mono font-bold">{room.code}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Users size={20} />
            <span className="font-semibold">{participants.length} online</span>
          </div>
        </div>

        {/* Participants */}
        <div className="flex items-center space-x-2 overflow-x-auto">
          {participants.map(participant => (
            <div
              key={participant._id}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                darkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                {participant.name.charAt(0)}
              </div>
              <span className="text-sm font-medium">{participant.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Code Editor */}
        <div className="lg:col-span-2">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Code2 size={20} />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className={`px-3 py-2 rounded-lg border ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
                  }`}
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                </select>
              </div>

              <button
                onClick={handleRunCode}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Run Code
              </button>
            </div>

            <div className="h-96">
              <Editor
                height="100%"
                language={language}
                value={code}
                onChange={handleCodeChange}
                theme={darkMode ? 'vs-dark' : 'light'}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true
                }}
              />
            </div>
          </div>
        </div>

        {/* Chat Panel */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg flex flex-col`}>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-2">
            <MessageSquare size={20} />
            <h2 className="font-bold">Room Chat</h2>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3" style={{ maxHeight: '400px' }}>
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <MessageSquare size={48} className="mx-auto mb-2 opacity-50" />
                <p>No messages yet. Start the conversation!</p>
              </div>
            ) : (
              messages.map((msg, index) => {
                const isCurrentUser = msg.userId === currentUser._id;
                return (
                  <div
                    key={index}
                    className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        isCurrentUser
                          ? 'bg-purple-600 text-white'
                          : darkMode
                          ? 'bg-gray-700'
                          : 'bg-gray-100'
                      }`}
                    >
                      {!isCurrentUser && (
                        <p className="text-xs font-semibold mb-1 opacity-75">
                          {msg.userName}
                        </p>
                      )}
                      <p className="text-sm">{msg.message}</p>
                      <p className="text-xs opacity-75 mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className={`flex-1 px-4 py-2 border rounded-lg ${
                  darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
                }`}
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className="btn-primary disabled:opacity-50 flex items-center space-x-2"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
