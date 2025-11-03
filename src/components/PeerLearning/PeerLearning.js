import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { mentorships } from '../../data/mockData';
import { Search, Star, Calendar, MessageCircle, Users, Award } from 'lucide-react';

const PeerLearning = () => {
  const { darkMode } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [topicFilter, setTopicFilter] = useState('All');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [message, setMessage] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [scheduleDuration, setScheduleDuration] = useState('60');
  const [scheduleMessage, setScheduleMessage] = useState('');

  const handleSchedule = (mentor) => {
    setSelectedMentor(mentor);
    setShowScheduleModal(true);
    setScheduleDate('');
    setScheduleTime('');
    setScheduleDuration('60');
    setScheduleMessage('');
  };

  const confirmSchedule = () => {
    if (scheduleDate && scheduleTime) {
      // Save booking to localStorage
      const bookings = JSON.parse(localStorage.getItem('mentorBookings') || '[]');
      bookings.push({
        id: Date.now(),
        student: 'You',
        mentor: selectedMentor.mentorName,
        topic: selectedMentor.topic,
        date: scheduleDate,
        time: scheduleTime,
        duration: scheduleDuration,
        message: scheduleMessage,
        status: 'Pending',
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('mentorBookings', JSON.stringify(bookings));
      
      alert(`Session request sent to ${selectedMentor.mentorName}!\n\nDate: ${scheduleDate}\nTime: ${scheduleTime}\nDuration: ${scheduleDuration} minutes\n\nThe mentor will confirm shortly.`);
      setShowScheduleModal(false);
    } else {
      alert('Please select both date and time!');
    }
  };

  const handleMessage = (mentor) => {
    setSelectedMentor(mentor);
    setShowMessageModal(true);
    setMessage('');
  };

  const sendMessage = () => {
    if (message.trim()) {
      // Save message to localStorage (simulating backend)
      const messages = JSON.parse(localStorage.getItem('mentorMessages') || '[]');
      messages.push({
        id: Date.now(),
        from: 'You',
        to: selectedMentor.mentorName,
        message: message,
        timestamp: new Date().toISOString(),
        read: false
      });
      localStorage.setItem('mentorMessages', JSON.stringify(messages));
      
      alert(`Message sent to ${selectedMentor.mentorName}!\n\n"${message}"\n\nThey will reply soon!`);
      setShowMessageModal(false);
      setMessage('');
    }
  };

  const handleBecomeMentor = () => {
    alert('Mentor application form would open here!');
    // In real app, navigate to mentor application form
  };

  const topics = ['All', 'DSA', 'System Design', 'Full Stack Development', 'Web Development', 'Competitive Programming'];

  const filteredMentors = mentorships.filter(mentor => {
    const matchesSearch = mentor.mentorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTopic = topicFilter === 'All' || mentor.topic === topicFilter;
    return matchesSearch && matchesTopic;
  });

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <h1 className="text-3xl font-bold mb-2">Peer Learning Marketplace</h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Connect with mentors and study groups
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Available Mentors', value: mentorships.length },
          { label: 'Active Sessions', value: '24' },
          { label: 'Study Groups', value: '12' },
          { label: 'Avg Rating', value: '4.8' }
        ].map((stat, index) => (
          <div key={index} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-4`}>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
              {stat.label}
            </p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search mentors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg ${
                darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
              }`}
            />
          </div>

          <select
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value)}
            className={`px-4 py-2 border rounded-lg ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
            }`}
          >
            {topics.map(topic => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Mentors Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map((mentor) => (
          <div
            key={mentor._id}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 card-hover`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                  {mentor.mentorName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold">{mentor.mentorName}</h3>
                  <p className="text-sm text-gray-500">
                    {mentor.year} Year {mentor.branch}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="text-yellow-500 fill-yellow-500" size={16} />
                <span className="font-semibold">{mentor.rating}</span>
              </div>
            </div>

            <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} mb-4`}>
              <p className="text-sm font-semibold mb-1">Expertise</p>
              <p className="text-purple-600 font-medium">{mentor.topic}</p>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Sessions Completed</span>
                <span className="font-semibold">{mentor.sessionsCompleted}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Availability</span>
                <span className="font-semibold">{mentor.availability}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => handleSchedule(mentor)}
                className="btn-secondary text-sm py-2 flex items-center justify-center space-x-1"
              >
                <Calendar size={16} />
                <span>Schedule</span>
              </button>
              <button 
                onClick={() => handleMessage(mentor)}
                className="btn-primary text-sm py-2 flex items-center justify-center space-x-1"
              >
                <MessageCircle size={16} />
                <span>Message</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Become a Mentor */}
      <div className={`${darkMode ? 'bg-gradient-to-r from-purple-900 to-pink-900' : 'bg-gradient-to-r from-purple-500 to-pink-500'} rounded-xl shadow-lg p-8 text-white text-center`}>
        <h2 className="text-2xl font-bold mb-3">Become a Mentor</h2>
        <p className="mb-6 opacity-90">
          Share your knowledge and help fellow students. Earn XP and recognition!
        </p>
        <button 
          onClick={handleBecomeMentor}
          className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Apply as Mentor
        </button>
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && selectedMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl max-w-md w-full p-6`}>
            <h2 className="text-2xl font-bold mb-4">Schedule Session</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Book a mentorship session with <span className="font-semibold text-purple-600">{selectedMentor.mentorName}</span>
            </p>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Topic</label>
                <input
                  type="text"
                  defaultValue={selectedMentor.topic}
                  className={`w-full px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'}`}
                  readOnly
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Preferred Date</label>
                <input
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'}`}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Preferred Time</label>
                <input
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'}`}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Duration</label>
                <select 
                  value={scheduleDuration}
                  onChange={(e) => setScheduleDuration(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'}`}
                >
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="90">1.5 hours</option>
                  <option value="120">2 hours</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Message (Optional)</label>
                <textarea
                  rows="3"
                  value={scheduleMessage}
                  onChange={(e) => setScheduleMessage(e.target.value)}
                  placeholder="What would you like to learn?"
                  className={`w-full px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'}`}
                ></textarea>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={confirmSchedule}
                className="flex-1 btn-primary"
              >
                Send Request
              </button>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && selectedMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl max-w-md w-full p-6`}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                {selectedMentor.mentorName.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold">{selectedMentor.mentorName}</h2>
                <p className="text-sm text-gray-500">{selectedMentor.topic}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Your Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="6"
                placeholder="Hi! I'd like to learn more about..."
                className={`w-full px-4 py-3 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'}`}
              ></textarea>
              <p className="text-xs text-gray-500 mt-1">
                {message.length}/500 characters
              </p>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={sendMessage}
                disabled={!message.trim()}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Message
              </button>
              <button
                onClick={() => setShowMessageModal(false)}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PeerLearning;
