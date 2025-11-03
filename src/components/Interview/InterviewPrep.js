import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { interviewQuestions } from '../../data/mockData';
import { Video, Calendar, MessageSquare, Filter } from 'lucide-react';

const InterviewPrep = () => {
  const { darkMode } = useAuth();
  const [companyFilter, setCompanyFilter] = useState('All');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showTipsModal, setShowTipsModal] = useState(false);

  const companies = ['All', 'Google', 'Amazon', 'Microsoft', 'Facebook', 'Apple'];

  const filteredQuestions = companyFilter === 'All'
    ? interviewQuestions
    : interviewQuestions.filter(q => q.company === companyFilter);

  return (
    <div className="space-y-6 fade-in">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <h1 className="text-3xl font-bold mb-2">Interview Prep Center</h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Practice mock interviews and company-specific questions
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 card-hover`}>
          <Video className="text-blue-600 mb-3" size={32} />
          <h3 className="font-bold text-lg mb-2">Mock Interviews</h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            Schedule peer mock interviews with video call
          </p>
          <button 
            onClick={() => setShowScheduleModal(true)}
            className="btn-primary w-full"
          >
            Schedule Now
          </button>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 card-hover`}>
          <Calendar className="text-green-600 mb-3" size={32} />
          <h3 className="font-bold text-lg mb-2">Interview Calendar</h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            View upcoming mock interview sessions
          </p>
          <button 
            onClick={() => setShowCalendarModal(true)}
            className="btn-secondary w-full"
          >
            View Calendar
          </button>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 card-hover`}>
          <MessageSquare className="text-purple-600 mb-3" size={32} />
          <h3 className="font-bold text-lg mb-2">Interview Tips</h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            Learn from alumni interview experiences
          </p>
          <button 
            onClick={() => setShowTipsModal(true)}
            className="btn-secondary w-full"
          >
            Read Tips
          </button>
        </div>
      </div>

      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Company Interview Questions</h2>
          <select
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            className={`px-4 py-2 border rounded-lg ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
            }`}
          >
            {companies.map(company => (
              <option key={company} value={company}>{company}</option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          {filteredQuestions.map(question => (
            <div key={question._id} className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-semibold">
                      {question.company}
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                      {question.role}
                    </span>
                    <span className={`badge badge-${question.difficulty.toLowerCase()}`}>
                      {question.difficulty}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg">{question.question}</h3>
                </div>
              </div>

              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                <span className="font-semibold">Topic:</span> {question.topic}
              </p>

              <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} text-sm`}>
                <p className="italic">{question.experience}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Mock Interview Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl max-w-md w-full p-6`}>
            <h2 className="text-2xl font-bold mb-4">📹 Schedule Mock Interview</h2>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Interview Type</label>
                <select className={`w-full px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'}`}>
                  <option>Technical Interview</option>
                  <option>Behavioral Interview</option>
                  <option>System Design</option>
                  <option>HR Round</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Preferred Date</label>
                <input type="date" className={`w-full px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'}`} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Preferred Time</label>
                <input type="time" className={`w-full px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'}`} />
              </div>
            </div>
            <div className="flex space-x-3">
              <button onClick={() => { alert('Mock interview scheduled! You will be matched with a peer soon.'); setShowScheduleModal(false); }} className="flex-1 btn-primary">Schedule</button>
              <button onClick={() => setShowScheduleModal(false)} className="flex-1 btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Interview Calendar Modal */}
      {showCalendarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl max-w-2xl w-full p-6`}>
            <h2 className="text-2xl font-bold mb-4">📅 Upcoming Mock Interviews</h2>
            <div className="space-y-3 mb-6">
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} border-l-4 border-blue-500`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-bold">Technical Interview</p>
                    <p className="text-sm text-gray-500">With: Sahith Kumar</p>
                    <p className="text-sm">📅 Nov 5, 2024 at 3:00 PM</p>
                    <p className="text-xs text-blue-600 mt-2">🔗 meet.google.com/abc-defg-hij</p>
                  </div>
                  <button 
                    onClick={() => {
                      window.open('https://meet.google.com/new', '_blank');
                      alert('Opening video call...\n\nMeeting link: meet.google.com/abc-defg-hij\n\nShare this link with Sahith Kumar!');
                    }}
                    className="btn-primary text-sm"
                  >
                    Join Call
                  </button>
                </div>
              </div>
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} border-l-4 border-green-500`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-bold">System Design</p>
                    <p className="text-sm text-gray-500">With: Ananya Kumar</p>
                    <p className="text-sm">📅 Nov 7, 2024 at 5:00 PM</p>
                    <p className="text-xs text-green-600 mt-2">🔗 meet.google.com/xyz-mnop-qrs</p>
                  </div>
                  <button 
                    onClick={() => {
                      window.open('https://meet.google.com/new', '_blank');
                      alert('Opening video call...\n\nMeeting link: meet.google.com/xyz-mnop-qrs\n\nShare this link with Ananya Kumar!');
                    }}
                    className="btn-primary text-sm"
                  >
                    Join Call
                  </button>
                </div>
              </div>
            </div>
            <button onClick={() => setShowCalendarModal(false)} className="btn-secondary w-full">Close</button>
          </div>
        </div>
      )}

      {/* Interview Tips Modal */}
      {showTipsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6`}>
            <h2 className="text-2xl font-bold mb-4">💡 Comprehensive Interview Guide</h2>
            
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className="font-bold text-lg mb-3">🎯 Before the Interview (1-2 Weeks Prior)</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li><strong>Company Research:</strong> Study company mission, products, recent news, culture, and competitors</li>
                  <li><strong>Role Understanding:</strong> Read job description thoroughly, understand required skills and responsibilities</li>
                  <li><strong>Technical Prep:</strong> Practice 50+ coding problems on LeetCode/HackerRank focusing on company patterns</li>
                  <li><strong>System Design:</strong> Review scalability, databases, caching, load balancing concepts</li>
                  <li><strong>Behavioral Stories:</strong> Prepare STAR method examples for leadership, conflict, failure, success</li>
                  <li><strong>Mock Interviews:</strong> Schedule 3-5 mock interviews with peers or mentors</li>
                  <li><strong>Questions Ready:</strong> Prepare 5-10 thoughtful questions about team, projects, and growth</li>
                </ul>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className="font-bold text-lg mb-3">📅 Day Before Interview</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li><strong>Setup Check:</strong> Test camera, microphone, internet connection, and backup device</li>
                  <li><strong>Environment:</strong> Choose quiet, well-lit room with professional background</li>
                  <li><strong>Materials Ready:</strong> Resume copies, notepad, pen, water, and charger nearby</li>
                  <li><strong>Dress Code:</strong> Prepare professional attire (business casual minimum)</li>
                  <li><strong>Sleep Well:</strong> Get 7-8 hours of sleep, avoid cramming last minute</li>
                </ul>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className="font-bold text-lg mb-3">💬 During Technical Interview</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li><strong>Clarify First:</strong> Ask about input constraints, edge cases, expected output format</li>
                  <li><strong>Think Aloud:</strong> Verbalize your thought process, discuss trade-offs</li>
                  <li><strong>Start Simple:</strong> Begin with brute force, then optimize (don't jump to optimal)</li>
                  <li><strong>Code Quality:</strong> Use meaningful variable names, add comments, handle edge cases</li>
                  <li><strong>Test Thoroughly:</strong> Walk through test cases, check boundary conditions</li>
                  <li><strong>Time/Space Complexity:</strong> Always analyze and state Big O notation</li>
                  <li><strong>Be Collaborative:</strong> Accept hints gracefully, incorporate feedback</li>
                </ul>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className="font-bold text-lg mb-3">🎭 During Behavioral Interview</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li><strong>STAR Method:</strong> Situation → Task → Action → Result (quantify results!)</li>
                  <li><strong>Be Specific:</strong> Use "I" not "we", give concrete examples with numbers</li>
                  <li><strong>Show Growth:</strong> Discuss what you learned from failures</li>
                  <li><strong>Leadership:</strong> Demonstrate initiative, mentoring, and decision-making</li>
                  <li><strong>Teamwork:</strong> Show collaboration, conflict resolution, communication skills</li>
                  <li><strong>Passion:</strong> Express genuine interest in role, company, and technology</li>
                </ul>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className="font-bold text-lg mb-3">🚫 Common Mistakes to Avoid</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>❌ Jumping to code without understanding the problem</li>
                  <li>❌ Being silent while thinking (interviewer can't read your mind)</li>
                  <li>❌ Giving up too quickly when stuck</li>
                  <li>❌ Arguing with interviewer or being defensive</li>
                  <li>❌ Bad-mouthing previous employers or colleagues</li>
                  <li>❌ Not asking any questions at the end</li>
                  <li>❌ Lying about skills or experience</li>
                </ul>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className="font-bold text-lg mb-3">✅ After the Interview</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li><strong>Thank You Email:</strong> Send within 24 hours, mention specific discussion points</li>
                  <li><strong>Self-Reflection:</strong> Note what went well and areas to improve</li>
                  <li><strong>Follow-Up:</strong> If no response in 1 week, send polite follow-up email</li>
                  <li><strong>Keep Learning:</strong> Continue practicing regardless of outcome</li>
                  <li><strong>Network:</strong> Connect with interviewers on LinkedIn (after decision)</li>
                </ul>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-blue-900 bg-opacity-20' : 'bg-blue-50'}`}>
                <h3 className="font-bold text-lg mb-3">🌟 Pro Tips from FAANG Engineers</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>"Practice explaining your code to a rubber duck - if you can't explain it simply, you don't understand it"</li>
                  <li>"The interviewer wants you to succeed - they're evaluating if you'd be a good teammate"</li>
                  <li>"It's okay to say 'I don't know' but follow with 'but here's how I'd figure it out'"</li>
                  <li>"Quality over Quantity: 50 problems done well beats 200 problems rushed"</li>
                  <li>"System design: Start with requirements, then high-level design, then dive deep"</li>
                </ul>
              </div>
            </div>

            <button onClick={() => setShowTipsModal(false)} className="btn-primary w-full mt-6">Got It!</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewPrep;
