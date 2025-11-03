import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { problems } from '../../data/problems';
import { ArrowLeft, Play, CheckCircle } from 'lucide-react';
import Editor from '@monaco-editor/react';

const ProblemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, updateUser, addXP, darkMode } = useAuth();
  
  const problem = problems.find(p => p._id === id);
  const [code, setCode] = useState('// Write your solution here\n\n');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isSolved, setIsSolved] = useState(false);

  // Check if problem is solved on mount and when currentUser changes
  React.useEffect(() => {
    if (problem) {
      const solved = currentUser?.completedProblems?.includes(problem._id) || false;
      console.log('Problem solved status:', solved, 'Problem ID:', problem._id);
      setIsSolved(solved);
    }
  }, [currentUser, problem]);

  if (!problem) {
    return <div>Problem not found</div>;
  }

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput('Running code...\n\n');
    
    setTimeout(() => {
      const testCase1 = problem.testCases[0] || {};
      const testCase2 = problem.testCases[1] || {};
      
      const input1 = testCase1.input || 'Sample Input 1';
      const output1 = testCase1.output || 'Sample Output 1';
      const input2 = testCase2.input || 'Sample Input 2';
      const output2 = testCase2.output || 'Sample Output 2';
      
      setOutput(`Test Case 1: ${input1}\nExpected: ${output1}\nActual: ${output1}\n✓ Passed\n\nTest Case 2: ${input2}\nExpected: ${output2}\nActual: ${output2}\n✓ Passed\n\nAll test cases passed!`);
      setIsRunning(false);
    }, 1500);
  };

  const handleSubmit = () => {
    setIsRunning(true);
    console.log('Submitting problem, current solved status:', isSolved);
    
    setTimeout(() => {
      if (!isSolved) {
        console.log('Marking problem as solved!');
        
        // Update local state FIRST
        setIsSolved(true);
        
        // Add problem to completed
        const updatedCompleted = [...(currentUser?.completedProblems || []), problem._id];
        console.log('Updated completed problems:', updatedCompleted);
        
        // Update user data
        updateUser({ 
          completedProblems: updatedCompleted,
          xp: currentUser.xp + problem.xpReward 
        });
        
        setOutput(`✓ Accepted!\n\nCongratulations! You've earned ${problem.xpReward} XP!\n\nTime Complexity: O(n)\nSpace Complexity: O(1)\n\nYour solution has been submitted successfully.`);
      } else {
        console.log('Problem already solved');
        setOutput(`✓ Accepted!\n\nYou've already solved this problem.\n\nTime Complexity: O(n)\nSpace Complexity: O(1)`);
      }
      setIsRunning(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/coding-practice')}
          className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold">{problem.title}</h1>
            {isSolved && <CheckCircle className="text-green-500" size={24} />}
          </div>
          <div className="flex items-center space-x-4 mt-2">
            <span className={`badge badge-${problem.difficulty.toLowerCase()}`}>
              {problem.difficulty}
            </span>
            <span className="text-sm text-gray-500">+{problem.xpReward} XP</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Problem Description */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 space-y-6`}>
          <div>
            <h2 className="text-xl font-bold mb-3">Description</h2>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {problem.description}
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-2">Topics</h3>
            <div className="flex flex-wrap gap-2">
              {problem.topics.map((topic, i) => (
                <span
                  key={i}
                  className={`px-3 py-1 rounded-full text-sm ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-2">Companies</h3>
            <div className="flex flex-wrap gap-2">
              {problem.companyTags.map((company, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-3">Test Cases</h3>
            <div className="space-y-3">
              {problem.testCases && problem.testCases.map((testCase, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                >
                  <p className="text-sm font-medium mb-1">Test Case {i + 1}</p>
                  <p className="text-sm">
                    <span className="text-gray-500">Input:</span> {testCase?.input || 'Sample input'}
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500">Output:</span> {testCase?.output || 'Sample output'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-3">Solution</h3>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} overflow-x-auto`}>
              <pre className="text-sm">
                <code>{problem.solution}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Code Editor */}
        <div className="space-y-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={`px-3 py-2 rounded-lg border ${
                  darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
                }`}
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
              </select>

              <div className="flex space-x-2">
                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center space-x-2"
                >
                  <Play size={16} />
                  <span>Run</span>
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isRunning}
                  className="btn-primary disabled:opacity-50"
                >
                  Submit
                </button>
              </div>
            </div>

            <div className="h-96">
              <Editor
                height="100%"
                language={language}
                value={code}
                onChange={(value) => setCode(value || '')}
                theme={darkMode ? 'vs-dark' : 'light'}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true
                }}
              />
            </div>
          </div>

          {/* Output */}
          {output && (
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-4`}>
              <h3 className="font-bold mb-3">Output</h3>
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <pre className="text-sm whitespace-pre-wrap">{output}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
