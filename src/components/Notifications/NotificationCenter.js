import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Bell, X, Check, Info, AlertCircle, Award, Code, Users } from 'lucide-react';

const NotificationCenter = () => {
  const { currentUser, darkMode } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Mock notifications
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: 'success',
        title: 'Problem Solved!',
        message: 'You solved "Two Sum" and earned 10 XP',
        timestamp: new Date(Date.now() - 5 * 60000),
        read: false,
        icon: Award
      },
      {
        id: 2,
        type: 'info',
        title: 'New Room Invitation',
        message: 'Sahith invited you to join "DSA Practice" room',
        timestamp: new Date(Date.now() - 15 * 60000),
        read: false,
        icon: Users
      },
      {
        id: 3,
        type: 'warning',
        title: 'Streak Alert',
        message: 'Keep your 7-day streak alive! Solve a problem today',
        timestamp: new Date(Date.now() - 60 * 60000),
        read: true,
        icon: AlertCircle
      },
      {
        id: 4,
        type: 'success',
        title: 'Badge Earned',
        message: 'You earned the "Problem Solver" badge!',
        timestamp: new Date(Date.now() - 2 * 60 * 60000),
        read: true,
        icon: Award
      },
      {
        id: 5,
        type: 'info',
        title: 'Quiz Available',
        message: 'New quiz added for DSA track',
        timestamp: new Date(Date.now() - 3 * 60 * 60000),
        read: true,
        icon: Info
      }
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, []);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
    const notification = notifications.find(n => n.id === id);
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-blue-600';
    }
  };

  const getTypeBg = (type) => {
    switch (type) {
      case 'success': return 'bg-green-100 dark:bg-green-900';
      case 'warning': return 'bg-yellow-100 dark:bg-yellow-900';
      case 'error': return 'bg-red-100 dark:bg-red-900';
      default: return 'bg-blue-100 dark:bg-blue-900';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 1000); // seconds

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Panel */}
          <div className={`absolute right-0 mt-2 w-96 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl z-50 max-h-96 overflow-hidden flex flex-col`}>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="font-bold text-lg">Notifications</h3>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-purple-600 hover:text-purple-700"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Bell size={48} className="mx-auto mb-2 opacity-50" />
                  <p>No notifications</p>
                </div>
              ) : (
                notifications.map(notification => {
                  const Icon = notification.icon;
                  return (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition ${
                        !notification.read ? 'bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${getTypeBg(notification.type)}`}>
                          <Icon className={getTypeColor(notification.type)} size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="font-semibold text-sm mb-1">
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {formatTime(notification.timestamp)}
                              </p>
                            </div>
                            <div className="flex items-center space-x-1 ml-2">
                              {!notification.read && (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                                  title="Mark as read"
                                >
                                  <Check size={16} />
                                </button>
                              )}
                              <button
                                onClick={() => deleteNotification(notification.id)}
                                className="p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                                title="Delete"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-center">
                <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                  View all notifications
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationCenter;
