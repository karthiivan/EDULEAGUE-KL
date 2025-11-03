import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { users } from '../../data/users';
import { ArrowLeft, Award, Code, TrendingUp, Calendar, ExternalLink, Star, Trophy } from 'lucide-react';

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useAuth();
  
  const user = users.find(u => u._id === userId);

  if (!user) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">User not found</h2>
        <button onClick={() => navigate(-1)} className="btn-primary mt-4">Go Back</button>
      </div>
    );
  }

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}>
        <div className="h-32 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"></div>
        <div className="px-6 pb-6">
          <button
            onClick={() => navigate(-1)}
            className={`mb-4 p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} inline-flex items-center space-x-2`}
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          
          <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6 -mt-16">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-5xl font-bold border-4 border-white dark:border-gray-800 shadow-xl">
              {user.name.charAt(0)}
            </div>
            
            <div className="flex-1 mt-16 md:mt-0">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-4xl font-bold">{user.name}</h1>
                {user.xp >= 5000 && <Trophy className="text-yellow-500" size={32} />}
              </div>
              {user.rollNo && (
                <p className={`text-lg mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {user.rollNo} • {user.email}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-semibold">
                  {user.year} Year {user.branch}
                </span>
                <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full font-semibold">
                  🎯 {user.targetRole}
                </span>
              </div>
              {user.bio && (
                <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {user.bio}
                </p>
              )}
            </div>
            
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1">Total XP</p>
              <p className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {user.xp}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-4`}>
          <Trophy className="text-yellow-600 mb-2" size={24} />
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Total XP</p>
          <p className="text-2xl font-bold">{user.xp}</p>
        </div>
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-4`}>
          <TrendingUp className="text-green-600 mb-2" size={24} />
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Streak</p>
          <p className="text-2xl font-bold">{user.streak} days</p>
        </div>
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-4`}>
          <Code className="text-blue-600 mb-2" size={24} />
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Problems Solved</p>
          <p className="text-2xl font-bold">{user.completedProblems?.length || 0}</p>
        </div>
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-4`}>
          <Award className="text-purple-600 mb-2" size={24} />
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Badges</p>
          <p className="text-2xl font-bold">{user.badges?.length || 0}</p>
        </div>
      </div>

      {/* Coding Profiles */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Code className="mr-2" size={28} />
          Coding Profiles
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* LeetCode */}
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-orange-50 to-yellow-50'} border-2 border-orange-200`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                  LC
                </div>
                <h3 className="font-bold text-xl">LeetCode</h3>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(user.codingProfiles.leetcode.url || `https://leetcode.com/u/${user.codingProfiles.leetcode.username}/`, '_blank', 'noopener,noreferrer');
                }}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center space-x-1"
              >
                <ExternalLink size={18} />
                <span className="text-xs">Visit</span>
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Username</span>
                <span className="font-semibold">{user.codingProfiles.leetcode.username}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Problems Solved</span>
                <span className="text-2xl font-bold text-orange-600">{user.codingProfiles.leetcode.problemsSolved}</span>
              </div>
              {user.codingProfiles.leetcode.easy && (
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div className="text-center p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <p className="text-xs text-green-700 dark:text-green-300">Easy</p>
                    <p className="text-lg font-bold text-green-600">{user.codingProfiles.leetcode.easy}</p>
                  </div>
                  <div className="text-center p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                    <p className="text-xs text-yellow-700 dark:text-yellow-300">Medium</p>
                    <p className="text-lg font-bold text-yellow-600">{user.codingProfiles.leetcode.medium}</p>
                  </div>
                  <div className="text-center p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                    <p className="text-xs text-red-700 dark:text-red-300">Hard</p>
                    <p className="text-lg font-bold text-red-600">{user.codingProfiles.leetcode.hard}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm font-medium">Rating</span>
                <span className="font-bold text-lg">{user.codingProfiles.leetcode.rating}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Global Rank</span>
                <span className="font-semibold">#{user.codingProfiles.leetcode.ranking?.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* CodeChef */}
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-amber-50 to-orange-50'} border-2 border-amber-200`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center text-white font-bold">
                  CC
                </div>
                <h3 className="font-bold text-xl">CodeChef</h3>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(user.codingProfiles.codechef.url || `https://www.codechef.com/users/${user.codingProfiles.codechef.username}`, '_blank', 'noopener,noreferrer');
                }}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center space-x-1"
              >
                <ExternalLink size={18} />
                <span className="text-xs">Visit</span>
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Username</span>
                <span className="font-semibold">{user.codingProfiles.codechef.username}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Stars</span>
                <div className="flex">
                  {[...Array(user.codingProfiles.codechef.stars)].map((_, i) => (
                    <Star key={i} size={20} className="text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Rating</span>
                <span className="text-2xl font-bold text-amber-600">{user.codingProfiles.codechef.rating}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm font-medium">Global Rank</span>
                <span className="font-semibold">#{user.codingProfiles.codechef.globalRank?.toLocaleString()}</span>
              </div>
              {user.codingProfiles.codechef.contestsParticipated && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Contests</span>
                  <span className="font-semibold">{user.codingProfiles.codechef.contestsParticipated}</span>
                </div>
              )}
            </div>
          </div>

          {/* Codeforces */}
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-blue-50 to-indigo-50'} border-2 border-blue-200`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                  CF
                </div>
                <h3 className="font-bold text-xl">Codeforces</h3>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(`https://codeforces.com/profile/${user.codingProfiles.codeforces.username}`, '_blank', 'noopener,noreferrer');
                }}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center space-x-1"
              >
                <ExternalLink size={18} />
                <span className="text-xs">Visit</span>
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Username</span>
                <span className="font-semibold">{user.codingProfiles.codeforces.username}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Rating</span>
                <span className="text-2xl font-bold text-blue-600">{user.codingProfiles.codeforces.rating}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm font-medium">Rank</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold">{user.codingProfiles.codeforces.rank}</span>
              </div>
            </div>
          </div>

          {/* GitHub */}
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-gray-50 to-slate-50'} border-2 border-gray-300`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-white font-bold">
                  GH
                </div>
                <h3 className="font-bold text-xl">GitHub</h3>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(`https://github.com/${user.codingProfiles.github.username}`, '_blank', 'noopener,noreferrer');
                }}
                className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition flex items-center space-x-1"
              >
                <ExternalLink size={18} />
                <span className="text-xs">Visit</span>
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Username</span>
                <span className="font-semibold">{user.codingProfiles.github.username}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Repositories</span>
                <span className="text-2xl font-bold text-gray-700">{user.codingProfiles.github.repos}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm font-medium">Contributions</span>
                <span className="font-semibold text-green-600">{user.codingProfiles.github.contributions}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <h2 className="text-2xl font-bold mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {user.skills?.map((skill, i) => (
            <span key={i} className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full font-semibold">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <h2 className="text-2xl font-bold mb-4">Badges</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {user.badges?.map((badge, i) => (
            <div key={i} className={`p-4 rounded-lg text-center ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="text-4xl mb-2">🏆</div>
              <p className="font-semibold capitalize">{badge.replace(/_/g, ' ')}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      {user.achievements && (
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
          <h2 className="text-2xl font-bold mb-4">Achievements</h2>
          <ul className="space-y-2">
            {user.achievements.map((achievement, i) => (
              <li key={i} className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
