import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { MessageSquare, ThumbsUp, MessageCircle, Plus, Search, TrendingUp, Clock } from 'lucide-react';

const Forums = () => {
  const { currentUser, darkMode } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [showNewThreadModal, setShowNewThreadModal] = useState(false);
  const [showThreadDetail, setShowThreadDetail] = useState(null);
  const [newThread, setNewThread] = useState({ title: '', category: 'DSA', content: '' });

  const categories = ['All', 'DSA', 'Web Development', 'Competitive Programming', 'Career', 'Projects', 'General'];

  const mockThreads = [
    {
      id: 1,
      title: 'How to approach Dynamic Programming problems?',
      author: 'Sahith',
      category: 'DSA',
      replies: 15,
      likes: 23,
      views: 156,
      lastActivity: '2 hours ago',
      isPinned: true
    },
    {
      id: 2,
      title: 'Best resources for learning React?',
      author: 'Priya Sharma',
      category: 'Web Development',
      replies: 8,
      likes: 12,
      views: 89,
      lastActivity: '5 hours ago',
      isPinned: false
    },
    {
      id: 3,
      title: 'Tips for Google coding interview',
      author: 'Shiva',
      category: 'Career',
      replies: 24,
      likes: 45,
      views: 234,
      lastActivity: '1 day ago',
      isPinned: true
    },
    {
      id: 4,
      title: 'Looking for project teammates - AI chatbot',
      author: 'Ananya Kumar',
      category: 'Projects',
      replies: 6,
      likes: 8,
      views: 67,
      lastActivity: '3 hours ago',
      isPinned: false
    },
    {
      id: 5,
      title: 'Codeforces contest discussion - Round 850',
      author: 'Aditya Singh',
      category: 'Competitive Programming',
      replies: 31,
      likes: 18,
      views: 178,
      lastActivity: '4 hours ago',
      isPinned: false
    }
  ];

  const filteredThreads = mockThreads
    .filter(t => selectedCategory === 'All' || t.category === selectedCategory)
    .filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Discussion Forums</h1>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Connect, discuss, and learn with the community
            </p>
          </div>
          <button 
            onClick={() => setShowNewThreadModal(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>New Thread</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Threads', value: '1,234', icon: MessageSquare },
          { label: 'Active Users', value: '456', icon: TrendingUp },
          { label: 'Total Replies', value: '8,901', icon: MessageCircle },
          { label: 'This Week', value: '89', icon: Clock }
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-4`}>
              <Icon className="text-purple-600 mb-2" size={24} />
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                {stat.label}
              </p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search threads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg ${
                darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
              }`}
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`px-4 py-2 border rounded-lg ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
            }`}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`px-4 py-2 border rounded-lg ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
            }`}
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="replies">Most Replies</option>
          </select>
        </div>
      </div>

      {/* Threads List */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredThreads.map(thread => (
            <div
              key={thread.id}
              onClick={() => setShowThreadDetail(thread)}
              className={`p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer ${
                thread.isPinned ? 'bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    {thread.isPinned && (
                      <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded-full">
                        Pinned
                      </span>
                    )}
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {thread.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2 hover:text-purple-600">
                    {thread.title}
                  </h3>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>by <span className="font-semibold">{thread.author}</span></span>
                    <span>•</span>
                    <span>{thread.lastActivity}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-6 ml-4">
                  <div className="text-center">
                    <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                      <ThumbsUp size={16} />
                      <span className="font-semibold">{thread.likes}</span>
                    </div>
                    <p className="text-xs text-gray-500">likes</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                      <MessageCircle size={16} />
                      <span className="font-semibold">{thread.replies}</span>
                    </div>
                    <p className="text-xs text-gray-500">replies</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="font-semibold text-gray-600 dark:text-gray-400">{thread.views}</p>
                    <p className="text-xs text-gray-500">views</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <h2 className="text-xl font-bold mb-4">Popular Tags</h2>
        <div className="flex flex-wrap gap-2">
          {['arrays', 'dynamic-programming', 'react', 'system-design', 'interviews', 'projects', 'algorithms', 'databases'].map(tag => (
            <button
              key={tag}
              className={`px-3 py-1 rounded-full text-sm ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* New Thread Modal */}
      {showNewThreadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl max-w-2xl w-full p-6`}>
            <h2 className="text-2xl font-bold mb-4">Create New Thread</h2>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={newThread.title}
                  onChange={(e) => setNewThread({...newThread, title: e.target.value})}
                  placeholder="What's your question or topic?"
                  className={`w-full px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'}`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={newThread.category}
                  onChange={(e) => setNewThread({...newThread, category: e.target.value})}
                  className={`w-full px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'}`}
                >
                  {categories.filter(c => c !== 'All').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Content</label>
                <textarea
                  value={newThread.content}
                  onChange={(e) => setNewThread({...newThread, content: e.target.value})}
                  rows="6"
                  placeholder="Describe your question or start a discussion..."
                  className={`w-full px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'}`}
                ></textarea>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  if (newThread.title && newThread.content) {
                    alert('Thread created successfully!');
                    setShowNewThreadModal(false);
                    setNewThread({ title: '', category: 'DSA', content: '' });
                  }
                }}
                className="flex-1 btn-primary"
              >
                Post Thread
              </button>
              <button onClick={() => setShowNewThreadModal(false)} className="flex-1 btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Thread Detail Modal */}
      {showThreadDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6`}>
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {showThreadDetail.category}
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-2">{showThreadDetail.title}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>by <span className="font-semibold">{showThreadDetail.author}</span></span>
                <span>•</span>
                <span>{showThreadDetail.lastActivity}</span>
              </div>
            </div>

            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} mb-6`}>
              <p>This is the main content of the thread. Users can discuss {showThreadDetail.title.toLowerCase()} here.</p>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-lg mb-3">{showThreadDetail.replies} Replies</h3>
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold">User {i}</span>
                      <span className="text-xs text-gray-500">• {i} hours ago</span>
                    </div>
                    <p className="text-sm">This is a reply to the thread. Great discussion!</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <textarea
                rows="3"
                placeholder="Write your reply..."
                className={`w-full px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'}`}
              ></textarea>
            </div>

            <div className="flex space-x-3">
              <button className="flex-1 btn-primary">Post Reply</button>
              <button onClick={() => setShowThreadDetail(null)} className="flex-1 btn-secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forums;
