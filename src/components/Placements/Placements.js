import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { placements } from '../../data/mockData';
import { Building2, Calendar, TrendingUp, Users, DollarSign } from 'lucide-react';

const Placements = () => {
  const { darkMode } = useAuth();
  const [filter, setFilter] = useState('All');
  const [expandedRow, setExpandedRow] = useState(null);

  const branches = ['All', 'CSE', 'IT', 'ECE'];

  const filteredPlacements = filter === 'All'
    ? placements
    : placements.filter(p => p.branch === filter || p.branch === 'All');

  return (
    <div className="space-y-6 fade-in">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <h1 className="text-3xl font-bold mb-2">KL University Placements</h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Track placement statistics and upcoming company visits
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Companies Visited', value: '150+', icon: Building2, color: 'blue' },
          { label: 'Students Placed', value: '1200+', icon: Users, color: 'green' },
          { label: 'Highest Package', value: '45 LPA', icon: DollarSign, color: 'purple' },
          { label: 'Average Package', value: '8.5 LPA', icon: TrendingUp, color: 'orange' }
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

      <div className="flex space-x-2 overflow-x-auto pb-2">
        {branches.map(branch => (
          <button
            key={branch}
            onClick={() => setFilter(branch)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
              filter === branch
                ? 'bg-purple-600 text-white'
                : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {branch}
          </button>
        ))}
      </div>

      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Package</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Branch</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Students Placed</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Visit Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Eligibility</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredPlacements.map(placement => (
                <React.Fragment key={placement._id}>
                  <tr 
                    onClick={() => setExpandedRow(expandedRow === placement._id ? null : placement._id)}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    <td className="px-6 py-4 font-semibold">{placement.company}</td>
                    <td className="px-6 py-4">
                      <span className="text-green-600 font-bold">{placement.package}</span>
                    </td>
                    <td className="px-6 py-4">{placement.branch}</td>
                    <td className="px-6 py-4">{placement.studentsPlaced}</td>
                    <td className="px-6 py-4">{new Date(placement.visitDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm">{placement.eligibilityCriteria}</td>
                  </tr>
                  {expandedRow === placement._id && (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 bg-blue-50 dark:bg-gray-900">
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-bold text-lg mb-2">📝 Interview Experience</h3>
                            <p className="text-sm">{placement.interviewExperience}</p>
                          </div>
                          <div>
                            <h3 className="font-bold text-lg mb-2">🎓 Placed Students</h3>
                            <div className="grid md:grid-cols-2 gap-2">
                              {placement.placedStudents?.map((student, i) => (
                                <div key={i} className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                                  <p className="font-semibold">{student.name}</p>
                                  <p className="text-xs text-gray-500">{student.rollNo} • {student.role}</p>
                                  <p className="text-sm text-green-600 font-bold">{student.package}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <h2 className="text-xl font-bold mb-4">Selection Process</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {placements.slice(0, 2).map(placement => (
            <div key={placement._id} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h3 className="font-bold mb-3">{placement.company}</h3>
              <div className="space-y-2">
                {placement.selectionProcess.map((step, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </div>
                    <span className="text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Placements;
