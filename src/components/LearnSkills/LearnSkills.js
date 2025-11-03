import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { skillTracks } from '../../data/mockData';
import { BookOpen, TrendingUp, Award, ChevronRight } from 'lucide-react';

const LearnSkills = () => {
  const { darkMode } = useAuth();

  const tracks = [
    { id: 'DSA', ...skillTracks.DSA, color: 'from-blue-500 to-cyan-500' },
    { id: 'CP', ...skillTracks.CP, color: 'from-purple-500 to-pink-500' },
    { id: 'SQL', ...skillTracks.SQL, color: 'from-green-500 to-emerald-500' },
    { id: 'Frontend', ...skillTracks.Frontend, color: 'from-orange-500 to-red-500' },
    { id: 'Backend', ...skillTracks.Backend, color: 'from-indigo-500 to-purple-500' }
  ];

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <div className="flex items-center space-x-3 mb-4">
          <BookOpen className="text-purple-600" size={32} />
          <h1 className="text-3xl font-bold">Learn Skills</h1>
        </div>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Master 5 essential skill tracks with roadmaps, problems, and quizzes
        </p>
      </div>

      {/* Skill Tracks Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {tracks.map((track) => {
          const totalProblems = track.topics.reduce((sum, topic) => sum + topic.problems, 0);
          const completedProblems = track.topics.reduce((sum, topic) => sum + topic.completed, 0);
          const progress = totalProblems > 0 ? Math.round((completedProblems / totalProblems) * 100) : 0;

          return (
            <Link
              key={track.id}
              to={`/learn-skills/${track.id}`}
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 card-hover`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${track.color} flex items-center justify-center text-4xl`}>
                    {track.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold mb-1">{track.name}</h2>
                    <p className="text-sm text-gray-500">{track.topics.length} topics</p>
                  </div>
                </div>
                <ChevronRight className="text-gray-400" size={24} />
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm font-bold text-purple-600">{progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <p className="text-xs text-gray-500 mb-1">Total Problems</p>
                    <p className="text-2xl font-bold">{totalProblems}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <p className="text-xs text-gray-500 mb-1">Completed</p>
                    <p className="text-2xl font-bold">{completedProblems}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-semibold mb-2">Topics Covered:</h3>
                  <div className="flex flex-wrap gap-2">
                    {track.topics.slice(0, 4).map((topic, i) => (
                      <span
                        key={i}
                        className={`text-xs px-2 py-1 rounded ${
                          darkMode ? 'bg-gray-700' : 'bg-gray-200'
                        }`}
                      >
                        {topic.name}
                      </span>
                    ))}
                    {track.topics.length > 4 && (
                      <span className="text-xs text-gray-500">
                        +{track.topics.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-4`}>
            <BookOpen className="text-white" size={24} />
          </div>
          <h3 className="font-bold text-lg mb-2">Interactive Roadmaps</h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Visual learning paths with step-by-step progression through each topic
          </p>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4`}>
            <TrendingUp className="text-white" size={24} />
          </div>
          <h3 className="font-bold text-lg mb-2">Practice Problems</h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Curated problems for each topic with difficulty progression
          </p>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mb-4`}>
            <Award className="text-white" size={24} />
          </div>
          <h3 className="font-bold text-lg mb-2">Topic Quizzes</h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Test your understanding with 10-question quizzes for each topic
          </p>
        </div>
      </div>
    </div>
  );
};

export default LearnSkills;
