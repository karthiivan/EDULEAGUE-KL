import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { badges as allBadges } from '../../data/mockData';
import { Award, Code, Flame, Trophy, Github, ExternalLink } from 'lucide-react';

const Profile = () => {
  const { currentUser, darkMode } = useAuth();

  const userBadges = allBadges.filter(b => currentUser?.badges?.includes(b.id));

  // Generate heatmap data (simplified)
  const generateHeatmap = () => {
    const days = [];
    for (let i = 0; i < 365; i++) {
      days.push({
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
        count: Math.floor(Math.random() * 5)
      });
    }
    return days.reverse();
  };

  const heatmapData = generateHeatmap();

  return (
    <div className="space-y-6 fade-in">
      {/* Profile Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl font-bold">
            {currentUser?.name?.charAt(0)}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{currentUser?.name}</h1>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
              {currentUser?.year} Year {currentUser?.branch} • {currentUser?.email}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {currentUser?.skills?.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-1">{currentUser?.xp}</div>
            <p className="text-sm text-gray-500">Total XP</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Problems Solved', value: currentUser?.completedProblems?.length || 0, icon: Code },
          { label: 'Current Streak', value: `${currentUser?.streak || 0} days`, icon: Flame },
          { label: 'Badges Earned', value: userBadges.length, icon: Award },
          { label: 'Rank', value: '#12', icon: Trophy }
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

      {/* Coding Profiles */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <h2 className="text-xl font-bold mb-6">Coding Profiles</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { platform: 'LeetCode', data: currentUser?.codingProfiles?.leetcode, color: 'orange' },
            { platform: 'CodeChef', data: currentUser?.codingProfiles?.codechef, color: 'brown' },
            { platform: 'Codeforces', data: currentUser?.codingProfiles?.codeforces, color: 'blue' },
            { platform: 'GitHub', data: currentUser?.codingProfiles?.github, color: 'gray' }
          ].map((profile, i) => (
            <div key={i} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold">{profile.platform}</h3>
                <ExternalLink size={16} className="text-gray-400" />
              </div>
              {profile.data && (
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-500">Username:</span> {profile.data.username}</p>
                  {profile.data.problemsSolved && (
                    <p><span className="text-gray-500">Problems:</span> {profile.data.problemsSolved}</p>
                  )}
                  {profile.data.rating && (
                    <p><span className="text-gray-500">Rating:</span> {profile.data.rating}</p>
                  )}
                  {profile.data.stars && (
                    <p><span className="text-gray-500">Stars:</span> {'⭐'.repeat(profile.data.stars)}</p>
                  )}
                  {profile.data.repos && (
                    <p><span className="text-gray-500">Repos:</span> {profile.data.repos}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <h2 className="text-xl font-bold mb-6">Badges & Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {userBadges.map(badge => (
            <div
              key={badge.id}
              className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} text-center`}
            >
              <div className="text-4xl mb-2">{badge.icon}</div>
              <h3 className="font-bold text-sm mb-1">{badge.name}</h3>
              <p className="text-xs text-gray-500">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Heatmap */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <h2 className="text-xl font-bold mb-6">Coding Activity</h2>
        <div className="overflow-x-auto">
          <div className="inline-grid grid-cols-53 gap-1">
            {heatmapData.slice(-365).map((day, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-sm ${
                  day.count === 0 ? darkMode ? 'bg-gray-700' : 'bg-gray-200' :
                  day.count === 1 ? 'bg-green-200' :
                  day.count === 2 ? 'bg-green-400' :
                  day.count === 3 ? 'bg-green-600' :
                  'bg-green-800'
                }`}
                title={`${day.date.toLocaleDateString()}: ${day.count} contributions`}
              ></div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-end space-x-2 mt-4 text-xs">
          <span className="text-gray-500">Less</span>
          <div className="w-3 h-3 bg-gray-200 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-200 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-600 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-800 rounded-sm"></div>
          <span className="text-gray-500">More</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
