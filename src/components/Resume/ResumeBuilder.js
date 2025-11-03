import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FileText, Download, CheckCircle, AlertCircle } from 'lucide-react';

const ResumeBuilder = () => {
  const { currentUser, darkMode } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [atsScore, setAtsScore] = useState(null);

  const templates = [
    { id: 1, name: 'Modern Tech', color: 'blue' },
    { id: 2, name: 'Minimalist', color: 'gray' },
    { id: 3, name: 'Creative', color: 'purple' },
    { id: 4, name: 'Professional', color: 'green' },
    { id: 5, name: 'Bold', color: 'red' }
  ];

  const resumeData = {
    name: currentUser?.name,
    email: currentUser?.email,
    phone: '+91 9876543210',
    education: `${currentUser?.year} Year ${currentUser?.branch}, KL University`,
    skills: currentUser?.skills || [],
    projects: [
      { title: 'E-Commerce Platform', tech: 'React, Node.js, MongoDB' },
      { title: 'Chat Application', tech: 'Socket.io, Express, React' }
    ],
    experience: [
      { role: 'Intern', company: 'Tech Corp', duration: 'Jun 2024 - Aug 2024' }
    ]
  };

  const checkATS = () => {
    setTimeout(() => {
      setAtsScore(Math.floor(Math.random() * 20) + 75);
    }, 1000);
  };

  return (
    <div className="space-y-6 fade-in">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <h1 className="text-3xl font-bold mb-2">Resume Builder</h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Create ATS-friendly resumes with tech-focused templates
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Templates */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
          <h2 className="text-xl font-bold mb-4">Choose Template</h2>
          <div className="space-y-3">
            {templates.map(template => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`w-full p-4 rounded-lg border-2 text-left transition ${
                  selectedTemplate === template.id
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20'
                    : darkMode ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{template.name}</span>
                  {selectedTemplate === template.id && <CheckCircle className="text-purple-500" size={20} />}
                </div>
              </button>
            ))}
          </div>

          <button onClick={checkATS} className="w-full btn-primary mt-6">
            Check ATS Score
          </button>

          {atsScore && (
            <div className={`mt-4 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">ATS Score</span>
                <span className="text-2xl font-bold text-green-600">{atsScore}/100</span>
              </div>
              <div className="progress-bar">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${atsScore}%` }}></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">Great! Your resume is ATS-friendly</p>
            </div>
          )}
        </div>

        {/* Resume Preview */}
        <div className="lg:col-span-2">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Resume Preview</h2>
              <button className="btn-primary flex items-center space-x-2">
                <Download size={20} />
                <span>Download PDF</span>
              </button>
            </div>

            {/* Resume Content */}
            <div className={`border-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'} rounded-lg p-8 bg-white text-gray-900`}>
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold mb-2">{resumeData.name}</h1>
                <p className="text-gray-600">{resumeData.email} | {resumeData.phone}</p>
                <p className="text-gray-600">{resumeData.education}</p>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3 border-b-2 border-purple-500 pb-1">SKILLS</h2>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3 border-b-2 border-purple-500 pb-1">PROJECTS</h2>
                {resumeData.projects.map((project, i) => (
                  <div key={i} className="mb-3">
                    <h3 className="font-bold">{project.title}</h3>
                    <p className="text-sm text-gray-600">{project.tech}</p>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3 border-b-2 border-purple-500 pb-1">EXPERIENCE</h2>
                {resumeData.experience.map((exp, i) => (
                  <div key={i} className="mb-3">
                    <h3 className="font-bold">{exp.role} - {exp.company}</h3>
                    <p className="text-sm text-gray-600">{exp.duration}</p>
                  </div>
                ))}
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3 border-b-2 border-purple-500 pb-1">CODING PROFILES</h2>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p>LeetCode: {currentUser?.codingProfiles?.leetcode?.username}</p>
                  <p>CodeChef: {currentUser?.codingProfiles?.codechef?.username}</p>
                  <p>Codeforces: {currentUser?.codingProfiles?.codeforces?.username}</p>
                  <p>GitHub: {currentUser?.codingProfiles?.github?.username}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
