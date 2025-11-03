import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { users } from '../../data/users';
import { problems } from '../../data/problems';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell 
} from 'recharts';
import { 
  TrendingUp, Users as UsersIcon, Code, Award, Calendar, 
  Download, Filter, RefreshCw 
} from 'lucide-react';

const AnalyticsDashboard = () => {
  const { darkMode } = useAuth();
  const [timeRange, setTimeRange] = useState('7days');
  const [refreshing, setRefreshing] = useState(false);

  const students = users.filter(u => u.role === 'student');

  // Calculate analytics data
  const analytics = {
    totalUsers: students.length,
    activeUsers: students.filter(s => s.streak > 0).length,
    totalProblems: problems.length,
    totalSubmissions: students.reduce((sum, s) => sum + (s.completedProblems?.length || 0), 0),
    avgXP: Math.round(students.reduce((sum, s) => sum + s.xp, 0) / students.length),
    avgStreak: Math.round(students.reduce((sum, s) => sum + s.streak, 0) / students.length)
  };

  // Daily active users (mock data)
  const dailyActiveUsers = [
    { date: 'Mon', users: 45, submissions: 120 },
    { date: 'Tue', users: 52, submissions: 145 },
    { date: 'Wed', users: 48, submissions: 132 },
    { date: 'Thu', users: 61, submissions: 178 },
    { date: 'Fri', users: 55, submissions: 156 },
    { date: 'Sat', users: 38, submissions: 98 },
    { date: 'Sun', users: 42, submissions: 110 }
  ];

  // Problem difficulty distribution
  const difficultyData = [
    { name: 'Easy', value: problems.filter(p => p.difficulty === 'Easy').length, color: '#10b981' },
    { name: 'Medium', value: problems.filter(p => p.difficulty === 'Medium').length, color: '#f59e0b' },
    { name: 'Hard', value: problems.filter(p => p.difficulty === 'Hard').length, color: '#ef4444' }
  ];

  // Branch-wise performance
  const branchPerformance = ['CSE', 'IT', 'ECE'].map(branch => {
    const branchStudents = students.filter(s => s.branch === branch);
    return {
      branch,
      students: branchStudents.length,
      avgXP: Math.round(branchStudents.reduce((sum, s) => sum + s.xp, 0) / branchStudents.length),
      avgProblems: Math.round(branchStudents.reduce((sum, s) => sum + (s.completedProblems?.length || 0), 0) / branchStudents.length)
    };
  });

  // Year-wise engagement
  const yearEngagement = [1, 2, 3, 4].map(year => {
    const yearStudents = students.filter(s => s.year === year);
    return {
      year: `Year ${year}`,
      active: yearStudents.filter(s => s.streak > 0).length,
      inactive: yearStudents.filter(s => s.streak === 0).length,
      total: yearStudents.length
    };
  });

  // Top performers
  const topPerformers = [...students]
    .sort((a, b) => b.xp - a.xp)
    .slice(0, 10)
    .map((s, i) => ({
      rank: i + 1,
      name: s.name,
      xp: s.xp,
      problems: s.completedProblems?.length || 0,
      streak: s.streak
    }));

  // Engagement trends (mock data)
  const engagementTrends = [
    { week: 'Week 1', logins: 145, submissions: 320, quizzes: 89 },
    { week: 'Week 2', logins: 167, submissions: 385, quizzes: 102 },
    { week: 'Week 3', logins: 189, submissions: 421, quizzes: 115 },
    { week: 'Week 4', logins: 201, submissions: 456, quizzes: 128 }
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleExport = () => {
    const data = {
      analytics,
      timestamp: new Date().toISOString(),
      timeRange
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Real-time insights and performance metrics
            </p>
          </div>
          <div className="flex space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className={`px-4 py-2 border rounded-lg ${
                darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
              }`}
            >
              <option value="24hours">Last 24 Hours</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
            </select>
            <button
              onClick={handleRefresh}
              className="btn-secondary flex items-center space-x-2"
              disabled={refreshing}
            >
              <RefreshCw size={20} className={refreshing ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>
            <button
              onClick={handleExport}
              className="btn-primary flex items-center space-x-2"
            >
              <Download size={20} />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Total Users', value: analytics.totalUsers, icon: UsersIcon, color: 'blue' },
          { label: 'Active Users', value: analytics.activeUsers, icon: TrendingUp, color: 'green' },
          { label: 'Total Problems', value: analytics.totalProblems, icon: Code, color: 'purple' },
          { label: 'Submissions', value: analytics.totalSubmissions, icon: Calendar, color: 'orange' },
          { label: 'Avg XP', value: analytics.avgXP, icon: Award, color: 'yellow' },
          { label: 'Avg Streak', value: `${analytics.avgStreak}d`, icon: TrendingUp, color: 'red' }
        ].map((metric, i) => {
          const Icon = metric.icon;
          return (
            <div key={i} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-4`}>
              <Icon className={`text-${metric.color}-600 mb-2`} size={24} />
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                {metric.label}
              </p>
              <p className="text-2xl font-bold">{metric.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Daily Active Users */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
          <h2 className="text-xl font-bold mb-6">Daily Activity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dailyActiveUsers}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="users" stroke="#667eea" fill="#667eea" fillOpacity={0.6} name="Active Users" />
              <Area type="monotone" dataKey="submissions" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Submissions" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Problem Difficulty Distribution */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
          <h2 className="text-xl font-bold mb-6">Problem Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={difficultyData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {difficultyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Branch Performance */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
          <h2 className="text-xl font-bold mb-6">Branch-wise Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={branchPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="branch" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="avgXP" fill="#667eea" name="Avg XP" />
              <Bar dataKey="avgProblems" fill="#10b981" name="Avg Problems" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Engagement Trends */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
          <h2 className="text-xl font-bold mb-6">Engagement Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={engagementTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="logins" stroke="#667eea" strokeWidth={2} name="Logins" />
              <Line type="monotone" dataKey="submissions" stroke="#10b981" strokeWidth={2} name="Submissions" />
              <Line type="monotone" dataKey="quizzes" stroke="#f59e0b" strokeWidth={2} name="Quizzes" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Performers Table */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold">Top 10 Performers</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">XP</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Problems</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Streak</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {topPerformers.map(performer => (
                <tr key={performer.rank} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <span className="font-bold text-purple-600">#{performer.rank}</span>
                  </td>
                  <td className="px-6 py-4 font-semibold">{performer.name}</td>
                  <td className="px-6 py-4">{performer.xp}</td>
                  <td className="px-6 py-4">{performer.problems}</td>
                  <td className="px-6 py-4">{performer.streak} days</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
