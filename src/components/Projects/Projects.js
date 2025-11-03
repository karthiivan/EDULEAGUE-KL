import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { projects } from '../../data/mockData';
import { users } from '../../data/users';
import { Plus, Users, Github, ExternalLink } from 'lucide-react';

const Projects = () => {
  const { currentUser, darkMode } = useAuth();
  const [filter, setFilter] = useState('All');
  const [joinedProjects, setJoinedProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMyProjects, setShowMyProjects] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showCollabModal, setShowCollabModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { user: 'Sahith', message: 'Hey team! Let\'s discuss the project structure.', time: '2 hours ago' },
    { user: 'Vasi', message: 'Sure! I think we should start with the backend API.', time: '1 hour ago' }
  ]);

  const categories = ['All', 'Web Development', 'AI/ML', 'IoT', 'Mobile Apps', 'Blockchain'];

  // Load joined projects from localStorage on mount
  React.useEffect(() => {
    const projectJoins = JSON.parse(localStorage.getItem('projectJoins') || '[]');
    const myProjectIds = projectJoins.map(join => join.projectId);
    setJoinedProjects(myProjectIds);
  }, []);

  const handleJoinTeam = (project) => {
    if (joinedProjects.includes(project._id)) {
      alert('You have already joined this project!');
      return;
    }

    if (project.members.length >= project.teamSize) {
      alert('This project team is full!');
      return;
    }

    // Add user to project
    setJoinedProjects([...joinedProjects, project._id]);
    
    // Save to localStorage
    const projectJoins = JSON.parse(localStorage.getItem('projectJoins') || '[]');
    projectJoins.push({
      projectId: project._id,
      projectTitle: project.title,
      userId: currentUser?.id || 'user001',
      userName: currentUser?.name || 'You',
      joinedAt: new Date().toISOString()
    });
    localStorage.setItem('projectJoins', JSON.stringify(projectJoins));

    alert(`Successfully joined "${project.title}"!\n\nYou can now collaborate with the team.`);
  };

  const myProjects = projects.filter(p => joinedProjects.includes(p._id));
  
  const filteredProjects = showMyProjects 
    ? myProjects
    : (filter === 'All' ? projects : projects.filter(p => p.category === filter));

  return (
    <div className="space-y-6 fade-in">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {showMyProjects ? 'My Projects' : 'Project Collaboration Hub'}
            </h1>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Find teammates and build amazing projects
            </p>
          </div>
          <button className="btn-primary flex items-center space-x-2">
            <Plus size={20} />
            <span>Post Project</span>
          </button>
        </div>
      </div>

      {/* Toggle between All Projects and My Projects */}
      <div className="flex items-center space-x-4 mb-4">
        <button
          onClick={() => setShowMyProjects(false)}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            !showMyProjects
              ? 'bg-purple-600 text-white'
              : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          All Projects ({projects.length})
        </button>
        <button
          onClick={() => setShowMyProjects(true)}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            showMyProjects
              ? 'bg-purple-600 text-white'
              : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          My Projects ({myProjects.length})
        </button>
      </div>

      {!showMyProjects && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
                filter === cat
                  ? 'bg-purple-600 text-white'
                  : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {filteredProjects.map(project => (
          <div key={project._id} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {project.category}
                </span>
              </div>
              <span className={`px-3 py-1 text-xs rounded-full ${
                project.status === 'Looking for members' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {project.status}
              </span>
            </div>

            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
              {project.description}
            </p>

            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">Required Skills:</p>
              <div className="flex flex-wrap gap-2">
                {project.requiredSkills.map((skill, i) => (
                  <span key={i} className={`px-2 py-1 text-xs rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm">
                <Users size={16} />
                <span>{project.members.length}/{project.teamSize} members</span>
              </div>
              <div className="flex space-x-2">
                {project.githubLink && (
                  <button 
                    onClick={() => window.open(project.githubLink, '_blank')}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Github size={20} />
                  </button>
                )}
                {joinedProjects.includes(project._id) ? (
                  <button 
                    onClick={() => {
                      setSelectedProject(project);
                      setShowCollabModal(true);
                    }}
                    className="btn-primary text-sm"
                  >
                    Open Workspace
                  </button>
                ) : (
                  <button 
                    onClick={() => handleJoinTeam(project)}
                    className="btn-primary text-sm"
                  >
                    Join Team
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Collaboration Workspace Modal */}
      {showCollabModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
                  <p className="text-sm text-gray-500">{selectedProject.category}</p>
                </div>
                <button 
                  onClick={() => setShowCollabModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Team Members */}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-3">Team Members ({selectedProject.members.length}/{selectedProject.teamSize})</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.members.map((memberId, i) => {
                    const user = users.find(u => u._id === memberId) || { name: `Member ${i + 1}`, branch: 'CSE' };
                    return (
                      <div key={i} className="flex items-center space-x-2 bg-purple-100 dark:bg-purple-900 px-3 py-2 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <span className="text-sm font-medium">{user.name}</span>
                          <span className="text-xs text-gray-500 ml-1">({user.branch})</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <button 
                  onClick={() => setShowChatModal(true)}
                  className="p-4 border-2 border-purple-600 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900 transition"
                >
                  <div className="text-2xl mb-2">💬</div>
                  <div className="text-sm font-semibold">Team Chat</div>
                </button>
                <button 
                  onClick={() => setShowTaskModal(true)}
                  className="p-4 border-2 border-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900 transition"
                >
                  <div className="text-2xl mb-2">📋</div>
                  <div className="text-sm font-semibold">Task Board</div>
                </button>
                <button 
                  onClick={() => {
                    if (selectedProject.githubLink) {
                      window.open(selectedProject.githubLink, '_blank');
                    } else {
                      alert('GitHub repository not yet set up!\n\nCreate a repo and share the link with your team.');
                    }
                  }}
                  className="p-4 border-2 border-green-600 rounded-lg hover:bg-green-50 dark:hover:bg-green-900 transition"
                >
                  <div className="text-2xl mb-2">📁</div>
                  <div className="text-sm font-semibold">GitHub Repo</div>
                </button>
                <button 
                  onClick={() => alert(`Starting video call for ${selectedProject.title}...\n\n📹 Video call link:\nhttps://meet.example.com/${selectedProject._id}\n\nShare this link with your team!`)}
                  className="p-4 border-2 border-orange-600 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900 transition"
                >
                  <div className="text-2xl mb-2">📹</div>
                  <div className="text-sm font-semibold">Video Call</div>
                </button>
              </div>

              {/* Recent Activity */}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-3">Recent Activity</h3>
                <div className="space-y-3">
                  <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">✅</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Task completed: Setup project structure</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">💬</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New message in team chat</p>
                        <p className="text-xs text-gray-500">5 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">🔄</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Code pushed to GitHub</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Resources */}
              <div>
                <h3 className="font-bold text-lg mb-3">Project Resources</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="text-xl mb-2">📄</div>
                    <p className="text-sm font-semibold">Documentation</p>
                    <p className="text-xs text-gray-500">README.md, Wiki</p>
                  </div>
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="text-xl mb-2">🎨</div>
                    <p className="text-sm font-semibold">Design Files</p>
                    <p className="text-xs text-gray-500">Figma, Mockups</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <button 
                  onClick={() => alert('Opening team chat...')}
                  className="flex-1 btn-primary"
                >
                  Start Collaborating
                </button>
                <button 
                  onClick={() => setShowCollabModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Team Chat Modal */}
      {showChatModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl max-w-2xl w-full h-[600px] flex flex-col`}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-xl font-bold">💬 Team Chat - {selectedProject.title}</h2>
              <button 
                onClick={() => setShowChatModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.user === currentUser?.name ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] ${msg.user === currentUser?.name ? 'bg-purple-600 text-white' : darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-3`}>
                    <p className="text-xs font-semibold mb-1">{msg.user}</p>
                    <p className="text-sm">{msg.message}</p>
                    <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && chatMessage.trim()) {
                      setChatMessages([...chatMessages, {
                        user: currentUser?.name || 'You',
                        message: chatMessage,
                        time: 'Just now'
                      }]);
                      setChatMessage('');
                    }
                  }}
                  placeholder="Type your message..."
                  className={`flex-1 px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'}`}
                />
                <button
                  onClick={() => {
                    if (chatMessage.trim()) {
                      setChatMessages([...chatMessages, {
                        user: currentUser?.name || 'You',
                        message: chatMessage,
                        time: 'Just now'
                      }]);
                      setChatMessage('');
                    }
                  }}
                  className="btn-primary px-6"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Task Board Modal */}
      {showTaskModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">📋 Task Board - {selectedProject.title}</h2>
                <button 
                  onClick={() => setShowTaskModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {/* To Do */}
                <div>
                  <h3 className="font-bold text-lg mb-3 text-red-600">📝 To Do</h3>
                  <div className="space-y-2">
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} border-l-4 border-red-500`}>
                      <p className="font-medium text-sm">Setup development environment</p>
                      <p className="text-xs text-gray-500 mt-1">Assigned to: Vasi</p>
                    </div>
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} border-l-4 border-red-500`}>
                      <p className="font-medium text-sm">Create database schema</p>
                      <p className="text-xs text-gray-500 mt-1">Assigned to: Sahith</p>
                    </div>
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} border-l-4 border-red-500`}>
                      <p className="font-medium text-sm">Design UI mockups</p>
                      <p className="text-xs text-gray-500 mt-1">Unassigned</p>
                    </div>
                  </div>
                </div>

                {/* In Progress */}
                <div>
                  <h3 className="font-bold text-lg mb-3 text-yellow-600">⏳ In Progress</h3>
                  <div className="space-y-2">
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} border-l-4 border-yellow-500`}>
                      <p className="font-medium text-sm">API development</p>
                      <p className="text-xs text-gray-500 mt-1">Assigned to: Sahith</p>
                      <div className="mt-2 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{width: '60%'}}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">60% complete</p>
                    </div>
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} border-l-4 border-yellow-500`}>
                      <p className="font-medium text-sm">Frontend components</p>
                      <p className="text-xs text-gray-500 mt-1">Assigned to: Vasi</p>
                      <div className="mt-2 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{width: '40%'}}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">40% complete</p>
                    </div>
                  </div>
                </div>

                {/* Done */}
                <div>
                  <h3 className="font-bold text-lg mb-3 text-green-600">✅ Done</h3>
                  <div className="space-y-2">
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} border-l-4 border-green-500`}>
                      <p className="font-medium text-sm">Project initialization</p>
                      <p className="text-xs text-gray-500 mt-1">Completed by: Sahith</p>
                    </div>
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} border-l-4 border-green-500`}>
                      <p className="font-medium text-sm">GitHub repository setup</p>
                      <p className="text-xs text-gray-500 mt-1">Completed by: Vasi</p>
                    </div>
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} border-l-4 border-green-500`}>
                      <p className="font-medium text-sm">Team onboarding</p>
                      <p className="text-xs text-gray-500 mt-1">Completed by: Team</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button 
                  onClick={() => alert('Add new task functionality would open here!')}
                  className="btn-primary w-full"
                >
                  + Add New Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
