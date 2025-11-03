import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { users } from '../../data/users';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';

const Leaderboard = () => {
  const { currentUser, darkMode } = useAuth();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Global');

  const students = users.filter(u => u.role === 'student');

  const getFilteredUsers = () => {
    let filtered = [...students];
    
    if (filter === 'Year') {
      filtered = filtered.filter(u => u.year === currentUser?.year);
    } else if (filter === 'Branch') {
      filtered = filtered.filter(u => u.branch === currentUser?.branch);
    }
    
    return filtered.sort((a, b) => b.xp - a.xp);
  };

  const leaderboardData = getFilteredUsers();
  const currentUserRank = leaderboardData.findIndex(u => u._id === currentUser?._id) + 1;

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="text-yellow-500" size={24} />;
    if (rank === 2) return <Medal className="text-gray-400" size={24} />;
    if (rank === 3) return <Medal className="text-orange-600" size={24} />;
    return <span className="text-lg font-bold text-gray-500">#{rank}</span>;
  };

  return (
    <div className="space-y-6 fade-in">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Compete with fellow KL University students
        </p>
      </div>

      {/* Your Rank */}
      <div className={`${darkMode ? 'bg-gradient-to-r from-purple-900 to-pink-900' : 'bg-gradient-to-r from-purple-500 to-pink-500'} rounded-xl shadow-lg p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90 mb-1">Your Current Rank</p>
            <p className="text-4xl font-bold">#{currentUserRank}</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90 mb-1">Your XP</p>
            <p className="text-4xl font-bold">{currentUser?.xp}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-2">
        {['Global', 'Year', 'Branch'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg transition ${
              filter === f
                ? 'bg-purple-600 text-white'
                : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Top 3 */}
      <div className="grid md:grid-cols-3 gap-6">
        {leaderboardData.slice(0, 3).map((user, index) => (
          <div
            key={user._id}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 text-center ${
              index === 0 ? 'md:order-2 transform md:scale-110' : index === 1 ? 'md:order-1' : 'md:order-3'
            }`}
          >
            <div className="mb-4">{getRankIcon(index + 1)}</div>
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold mb-3">
              {user.name.charAt(0)}
            </div>
            <h3 className="font-bold text-lg mb-1">{user.name}</h3>
            <p className="text-sm text-gray-500 mb-3">
              {user.year} Year {user.branch}
            </p>
            <div className="text-2xl font-bold gradient-text">{user.xp} XP</div>
            <p className="text-sm text-gray-500 mt-2">
              {user.completedProblems?.length || 0} problems solved
            </p>
          </div>
        ))}
      </div>

      {/* Full Leaderboard */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Year</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Branch</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">XP</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Problems</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Streak</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {leaderboardData.map((user, index) => (
                <tr
                  key={user._id}
                  onClick={() => navigate(`/user/${user._id}`)}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                    user._id === currentUser?._id ? 'bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20' : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getRankIcon(index + 1)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        {user._id === currentUser?._id && (
                          <span className="text-xs text-purple-600">You</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{user.year}</td>
                  <td className="px-6 py-4">{user.branch}</td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-purple-600">{user.xp}</span>
                  </td>
                  <td className="px-6 py-4">{user.completedProblems?.length || 0}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      <span>🔥</span>
                      <span className="font-semibold">{user.streak}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
