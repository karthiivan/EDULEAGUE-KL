import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { users } from '../../data/users';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, TrendingUp, Award, AlertCircle, Download } from 'lucide-react';

const TeacherPortal = () => {
  const { currentUser, darkMode } = useAuth();
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedBranch, setSelectedBranch] = useState('All');

  const students = users.filter(u => u.role === 'student');

  const getFilteredStudents = () => {
    let filtered = students;
    if (selectedYear !== 'All') filtered = filtered.filter(s => s.year === parseInt(selectedYear));
    if (selectedBranch !== 'All') filtered = filtered.filter(s => s.branch === selectedBranch);
    return filtered;
  };

  const filteredStudents = getFilteredStudents();

  // Calculate analytics
  const avgXP = Math.round(filteredStudents.reduce((sum, s) => sum + s.xp, 0) / filteredStudents.length);
  const avgProblems = Math.round(filteredStudents.reduce((sum, s) => sum + (s.completedProblems?.length || 0), 0) / filteredStudents.length);
  const avgStreak = Math.round(filteredStudents.reduce((sum, s) => sum + s.streak, 0) / filteredStudents.length);

  // At-risk students (low engagement)
  const atRiskStudents = filteredStudents.filter(s => s.xp < 1000 || s.streak < 5);

  // Top performers
  const topPerformers = [...filteredStudents].sort((a, b) => b.xp - a.xp).slice(0, 5);

  // Year-wise data
  const yearWiseData = [1, 2, 3, 4].map(year => ({
    year: `Year ${year}`,
    students: students.filter(s => s.year === year).length,
    avgXP: Math.round(students.filter(s => s.year === year).reduce((sum, s) => sum + s.xp, 0) / students.filter(s => s.year === year).length)
  }));

  // Branch-wise data
  const branchWiseData = ['CSE', 'IT', 'ECE'].map(branch => ({
    name: branch,
    value: students.filter(s => s.branch === branch).length
  }));

  const COLORS = ['#667eea', '#764ba2', '#f093fb'];

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <h1 className="text-3xl font-bold mb-2">Teacher Portal</h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Welcome, {currentUser?.name} • {currentUser?.designation}
        </p>
      </div>

      {/* Filters */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <div className="grid md:grid-cols-3 gap-4">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className={`px-4 py-2 border rounded-lg ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
            }`}
          >
            <option value="All">All Years</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>

          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className={`px-4 py-2 border rounded-lg ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
            }`}
          >
            <option value="All">All Branches</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
          </select>

          <button className="btn-primary flex items-center justify-center space-x-2">
            <Download size={20} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Students', value: filteredStudents.length, icon: Users, color: 'blue' },
          { label: 'Avg XP', value: avgXP, icon: TrendingUp, color: 'purple' },
          { label: 'Avg Problems', value: avgProblems, icon: Award, color: 'green' },
          { label: 'At Risk', value: atRiskStudents.length, icon: AlertCircle, color: 'red' }
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-4`}>
              <Icon className={`text-${stat.color}-600 mb-2`} size={24} />
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                {stat.label}
              </p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Year-wise Performance */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
          <h2 className="text-xl font-bold mb-6">Year-wise Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={yearWiseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="avgXP" fill="#667eea" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Branch Distribution */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
          <h2 className="text-xl font-bold mb-6">Branch Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={branchWiseData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {branchWiseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Performers */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <h2 className="text-xl font-bold mb-6">Top Performers</h2>
        <div className="space-y-3">
          {topPerformers.map((student, index) => (
            <div
              key={student._id}
              className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} flex items-center justify-between`}
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                  #{index + 1}
                </div>
                <div>
                  <p className="font-semibold">{student.name}</p>
                  <p className="text-sm text-gray-500">
                    {student.year} Year {student.branch}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-purple-600">{student.xp} XP</p>
                <p className="text-sm text-gray-500">
                  {student.completedProblems?.length || 0} problems
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* At-Risk Students */}
      {atRiskStudents.length > 0 && (
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
          <div className="flex items-center space-x-2 mb-6">
            <AlertCircle className="text-red-600" size={24} />
            <h2 className="text-xl font-bold">At-Risk Students</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {atRiskStudents.slice(0, 6).map(student => (
              <div
                key={student._id}
                className={`p-4 rounded-lg border-2 border-red-200 ${darkMode ? 'bg-gray-700' : 'bg-red-50'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold">{student.name}</p>
                  <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">
                    Low Engagement
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  {student.year} Year {student.branch}
                </p>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="text-xs text-gray-500">XP</p>
                    <p className="font-semibold">{student.xp}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Problems</p>
                    <p className="font-semibold">{student.completedProblems?.length || 0}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Streak</p>
                    <p className="font-semibold">{student.streak}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Student Details Table */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold">All Students</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Year</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Branch</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">XP</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Problems</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Streak</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredStudents.map(student => (
                <tr key={student._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 font-semibold">{student.name}</td>
                  <td className="px-6 py-4">{student.year}</td>
                  <td className="px-6 py-4">{student.branch}</td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-purple-600">{student.xp}</span>
                  </td>
                  <td className="px-6 py-4">{student.completedProblems?.length || 0}</td>
                  <td className="px-6 py-4">{student.streak} days</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      student.xp >= 2000 ? 'bg-green-100 text-green-800' :
                      student.xp >= 1000 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {student.xp >= 2000 ? 'Excellent' : student.xp >= 1000 ? 'Good' : 'Needs Attention'}
                    </span>
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

export default TeacherPortal;
