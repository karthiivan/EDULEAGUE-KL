import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { problems } from '../../data/problems';
import { Search, Code, Users, CheckCircle } from 'lucide-react';

const CodingPractice = () => {
  const { currentUser, darkMode } = useAuth();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [topicFilter, setTopicFilter] = useState('All');
  const [solvedProblems, setSolvedProblems] = useState([]);

  // Update solved problems when currentUser changes
  useEffect(() => {
    setSolvedProblems(currentUser?.completedProblems || []);
  }, [currentUser]);

  // Check for topic filter in URL
  useEffect(() => {
    const topicFromUrl = searchParams.get('topic');
    if (topicFromUrl) {
      setTopicFilter(topicFromUrl);
    }
  }, [searchParams]);

  // Get unique topics
  const allTopics = [...new Set(problems.flatMap(p => p.topics))];

  // Filter problems
  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.topics.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDifficulty = difficultyFilter === 'All' || problem.difficulty === difficultyFilter;
    const matchesTopic = topicFilter === 'All' || problem.topics.includes(topicFilter);
    
    return matchesSearch && matchesDifficulty && matchesTopic;
  });

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Coding Practice Hub</h1>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {problems.length} problems • {solvedProblems.length} solved
            </p>
          </div>
          <Link
            to="/coding-practice/rooms"
            className="btn-primary flex items-center space-x-2"
          >
            <Users size={20} />
            <span>Join Coding Rooms</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['Easy', 'Medium', 'Hard', 'Total'].map((difficulty) => {
          const count = difficulty === 'Total' 
            ? problems.length 
            : problems.filter(p => p.difficulty === difficulty).length;
          const solved = difficulty === 'Total'
            ? solvedProblems.length
            : problems.filter(p => p.difficulty === difficulty && solvedProblems.includes(p._id)).length;
          
          return (
            <div
              key={difficulty}
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-4`}
            >
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                {difficulty}
              </p>
              <p className="text-2xl font-bold">
                {solved}/{count}
              </p>
              <div className="mt-2 progress-bar h-2">
                <div
                  className="progress-bar-fill h-full"
                  style={{ width: `${(solved / count) * 100}%` }}
                ></div>
              </div>
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
              placeholder="Search problems..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg ${
                darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
              }`}
            />
          </div>

          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className={`px-4 py-2 border rounded-lg ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
            }`}
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value)}
            className={`px-4 py-2 border rounded-lg ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
            }`}
          >
            <option value="All">All Topics</option>
            {allTopics.map(topic => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Problems List */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Difficulty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Topics
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Companies
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  XP
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredProblems.map((problem) => {
                const isSolved = solvedProblems.includes(problem._id);
                
                return (
                  <tr
                    key={problem._id}
                    className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isSolved ? (
                        <CheckCircle className="text-green-500" size={20} />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/coding-practice/problem/${problem._id}`}
                        className="font-medium text-purple-600 hover:text-purple-700"
                      >
                        {problem.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`badge badge-${problem.difficulty.toLowerCase()}`}>
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {problem.topics.slice(0, 2).map((topic, i) => (
                          <span
                            key={i}
                            className={`text-xs px-2 py-1 rounded ${
                              darkMode ? 'bg-gray-600' : 'bg-gray-200'
                            }`}
                          >
                            {topic}
                          </span>
                        ))}
                        {problem.topics.length > 2 && (
                          <span className="text-xs text-gray-500">
                            +{problem.topics.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {problem.companyTags.slice(0, 2).map((company, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded"
                          >
                            {company}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-semibold text-purple-600">
                        +{problem.xpReward}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredProblems.length === 0 && (
          <div className="text-center py-12">
            <Code className="mx-auto text-gray-400 mb-4" size={48} />
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No problems found matching your filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodingPractice;
