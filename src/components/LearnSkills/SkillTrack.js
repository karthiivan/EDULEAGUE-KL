import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { skillTracks } from '../../data/mockData';
import { ArrowLeft, CheckCircle, Circle, Play, Award, BookOpen } from 'lucide-react';

const SkillTrack = () => {
  const { track } = useParams();
  const navigate = useNavigate();
  const { darkMode, addXP } = useAuth();
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const trackData = skillTracks[track];

  if (!trackData) {
    return <div>Track not found</div>;
  }

  // Sample quiz questions
  const quizQuestions = [
    {
      question: `What is the most important concept in ${trackData.name}?`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 0
    },
    {
      question: `Which of the following is a key skill in ${trackData.name}?`,
      options: ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4'],
      correctAnswer: 1
    },
    {
      question: `What is the best practice for ${trackData.name}?`,
      options: ['Practice A', 'Practice B', 'Practice C', 'Practice D'],
      correctAnswer: 2
    },
    {
      question: `How do you optimize ${trackData.name}?`,
      options: ['Method 1', 'Method 2', 'Method 3', 'Method 4'],
      correctAnswer: 0
    },
    {
      question: `What tool is commonly used in ${trackData.name}?`,
      options: ['Tool A', 'Tool B', 'Tool C', 'Tool D'],
      correctAnswer: 3
    }
  ];

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
      addXP(15);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
    setShowQuiz(false);
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/learn-skills')}
          className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center space-x-3">
          <span className="text-4xl">{trackData.icon}</span>
          <div>
            <h1 className="text-3xl font-bold">{trackData.name}</h1>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {trackData.topics.length} topics to master
            </p>
          </div>
        </div>
      </div>

      {/* Roadmap */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <BookOpen className="mr-2 text-purple-600" size={24} />
          Learning Roadmap
        </h2>

        <div className="space-y-4">
          {trackData.topics.map((topic, index) => {
            const isCompleted = topic.completed === topic.problems;
            const progress = topic.problems > 0 ? (topic.completed / topic.problems) * 100 : 0;

            return (
              <div
                key={topic.id}
                className={`p-4 rounded-lg border-2 ${
                  isCompleted
                    ? 'border-green-500 bg-green-50 dark:bg-green-900 dark:bg-opacity-20'
                    : darkMode
                    ? 'border-gray-700 bg-gray-700'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {isCompleted ? (
                      <CheckCircle className="text-green-500" size={24} />
                    ) : (
                      <Circle className="text-gray-400" size={24} />
                    )}
                    <div>
                      <h3 className="font-bold text-lg">{topic.name}</h3>
                      <p className="text-sm text-gray-500">
                        {topic.completed}/{topic.problems} problems completed
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate(`/coding-practice?topic=${encodeURIComponent(topic.name)}`)}
                    className="btn-secondary text-sm"
                  >
                    Start Learning
                  </button>
                </div>

                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quiz Section */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <Award className="mr-2 text-yellow-500" size={24} />
            Topic Quiz
          </h2>
          {!showQuiz && (
            <button
              onClick={() => setShowQuiz(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Play size={20} />
              <span>Start Quiz</span>
            </button>
          )}
        </div>

        {!showQuiz ? (
          <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} text-center`}>
            <Award className="mx-auto text-yellow-500 mb-4" size={48} />
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Test your knowledge with a quick quiz
            </p>
            <p className="text-sm text-gray-500">
              5 questions • +15 XP on completion
            </p>
          </div>
        ) : !quizCompleted ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </span>
              <span className="text-sm text-gray-500">
                Score: {score}/{currentQuestion}
              </span>
            </div>

            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
              ></div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">
                {quizQuestions[currentQuestion].question}
              </h3>

              <div className="space-y-3">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition ${
                      selectedAnswer === index
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20'
                        : darkMode
                        ? 'border-gray-700 hover:border-gray-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswer === index
                            ? 'border-purple-500 bg-purple-500'
                            : 'border-gray-300'
                        }`}
                      >
                        {selectedAnswer === index && (
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className="w-full btn-primary disabled:opacity-50"
            >
              {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className={`p-8 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <Award className="mx-auto text-yellow-500 mb-4" size={64} />
              <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
              <p className="text-lg mb-4">
                Your Score: {score}/{quizQuestions.length}
              </p>
              <p className="text-purple-600 font-semibold">+15 XP Earned!</p>
            </div>

            <button onClick={resetQuiz} className="btn-primary">
              Take Another Quiz
            </button>
          </div>
        )}
      </div>

      {/* Resources */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <h2 className="text-2xl font-bold mb-6">Learning Resources</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className="font-bold mb-2">📚 Documentation</h3>
            <p className="text-sm text-gray-500">Official docs and tutorials</p>
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className="font-bold mb-2">🎥 Video Tutorials</h3>
            <p className="text-sm text-gray-500">Curated video content</p>
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className="font-bold mb-2">📝 Articles & Blogs</h3>
            <p className="text-sm text-gray-500">In-depth articles</p>
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className="font-bold mb-2">💻 Practice Platforms</h3>
            <p className="text-sm text-gray-500">External coding platforms</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillTrack;
