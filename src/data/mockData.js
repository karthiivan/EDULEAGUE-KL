// Additional mock data collections

export const projects = [
  {
    _id: 'proj001',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce website with payment integration, user authentication, and admin dashboard.',
    requiredSkills: ['React', 'Node.js', 'MongoDB', 'Express'],
    teamSize: 4,
    creatorId: 'user002',
    members: ['user002', 'user007'],
    status: 'Looking for members',
    githubLink: '',
    category: 'Web Development',
    createdAt: '2024-10-15T00:00:00.000Z'
  },
  {
    _id: 'proj002',
    title: 'AI Chatbot for Student Support',
    description: 'Intelligent chatbot to help students with course queries, assignment help, and campus information.',
    requiredSkills: ['Python', 'NLP', 'TensorFlow', 'Flask'],
    teamSize: 3,
    creatorId: 'user005',
    members: ['user005'],
    status: 'Looking for members',
    githubLink: '',
    category: 'AI/ML',
    createdAt: '2024-10-20T00:00:00.000Z'
  },
  {
    _id: 'proj003',
    title: 'Campus Event Management System',
    description: 'Web application to manage college events, registrations, and notifications.',
    requiredSkills: ['React', 'Firebase', 'Material-UI'],
    teamSize: 3,
    creatorId: 'user003',
    members: ['user003', 'user009'],
    status: 'In Progress',
    githubLink: 'https://github.com/karthi-frontend/campus-events',
    category: 'Web Development',
    createdAt: '2024-09-10T00:00:00.000Z'
  },
  {
    _id: 'proj004',
    title: 'IoT Home Automation',
    description: 'Smart home automation system using IoT devices and mobile app control.',
    requiredSkills: ['Arduino', 'React Native', 'MQTT', 'Node.js'],
    teamSize: 4,
    creatorId: 'user008',
    members: ['user008', 'user006'],
    status: 'Looking for members',
    githubLink: '',
    category: 'IoT',
    createdAt: '2024-10-25T00:00:00.000Z'
  }
];

export const rooms = [
  {
    _id: 'room001',
    name: 'DSA Study Group',
    code: 'DSA2024',
    creatorId: 'user004',
    participants: ['user004', 'user001', 'user006'],
    type: 'Study Group',
    problemId: 'prob001',
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'room002',
    name: 'Contest Practice',
    code: 'CP2024',
    creatorId: 'user002',
    participants: ['user002', 'user007'],
    type: 'Contest Practice',
    problemId: 'prob004',
    isActive: true,
    createdAt: new Date().toISOString()
  }
];

export const mentorships = [
  {
    _id: 'mentor001',
    mentorId: 'user004',
    mentorName: 'Shiva',
    topic: 'System Design',
    rating: 4.8,
    sessionsCompleted: 15,
    availability: 'Weekends',
    year: 4,
    branch: 'CSE'
  },
  {
    _id: 'mentor002',
    mentorId: 'user007',
    mentorName: 'Ananya Kumar',
    topic: 'Full Stack Development',
    rating: 4.9,
    sessionsCompleted: 12,
    availability: 'Evenings',
    year: 4,
    branch: 'CSE'
  },
  {
    _id: 'mentor003',
    mentorId: 'user002',
    mentorName: 'Sahith',
    topic: 'Web Development',
    rating: 4.7,
    sessionsCompleted: 10,
    availability: 'Flexible',
    year: 3,
    branch: 'IT'
  }
];

export const placements = [
  {
    _id: 'place001',
    company: 'Google',
    year: 2024,
    branch: 'CSE',
    package: '45 LPA',
    studentsPlaced: 8,
    selectionProcess: ['Online Test', 'Technical Interview 1', 'Technical Interview 2', 'HR Round'],
    visitDate: '2024-12-15',
    eligibilityCriteria: 'CGPA >= 8.0, No backlogs',
    placedStudents: [
      { name: 'Rahul Sharma', rollNo: '2021CSE001', package: '45 LPA', role: 'SDE-1' },
      { name: 'Priya Patel', rollNo: '2021CSE045', package: '45 LPA', role: 'SDE-1' },
      { name: 'Arjun Reddy', rollNo: '2021CSE078', package: '45 LPA', role: 'SDE-1' }
    ],
    interviewExperience: 'Google interview had 3 rounds. First was DSA focused with medium-hard problems. Second round was system design - design YouTube. Third was behavioral + cultural fit. Very collaborative interviewers, they give hints if stuck. Preparation tip: Focus on scalability and trade-offs in system design.'
  },
  {
    _id: 'place002',
    company: 'Amazon',
    year: 2024,
    branch: 'CSE',
    package: '42 LPA',
    studentsPlaced: 12,
    selectionProcess: ['Online Assessment', 'Technical Interview', 'Bar Raiser', 'HR'],
    visitDate: '2024-12-10',
    eligibilityCriteria: 'CGPA >= 7.5',
    placedStudents: [
      { name: 'Sahith Kumar', rollNo: '2021CSE023', package: '42 LPA', role: 'SDE-1' },
      { name: 'Ananya Iyer', rollNo: '2021CSE056', package: '42 LPA', role: 'SDE-1' },
      { name: 'Karthik Menon', rollNo: '2021CSE089', package: '42 LPA', role: 'SDE-1' },
      { name: 'Divya Singh', rollNo: '2021CSE102', package: '42 LPA', role: 'SDE-1' }
    ],
    interviewExperience: 'Amazon focuses heavily on Leadership Principles. Every answer should relate to their 16 principles. Technical rounds had array/string problems and one graph problem. Bar raiser round was tough - they test if you raise the bar. OA had 2 coding questions (medium level) + 7 work style assessment questions. Pro tip: Prepare STAR method stories for each leadership principle.'
  },
  {
    _id: 'place003',
    company: 'Microsoft',
    year: 2024,
    branch: 'CSE',
    package: '44 LPA',
    studentsPlaced: 10,
    selectionProcess: ['Coding Test', 'Technical Round 1', 'Technical Round 2', 'AA Round'],
    visitDate: '2024-12-20',
    eligibilityCriteria: 'CGPA >= 8.0',
    placedStudents: [
      { name: 'Vasi Krishna', rollNo: '2021CSE012', package: '44 LPA', role: 'SDE' },
      { name: 'Sneha Reddy', rollNo: '2021CSE034', package: '44 LPA', role: 'SDE' },
      { name: 'Aditya Verma', rollNo: '2021CSE067', package: '44 LPA', role: 'SDE' }
    ],
    interviewExperience: 'Microsoft interview was very friendly. First technical round had tree and DP problems. Second round was more on problem-solving approach - they care about how you think. AA (As Appropriate) round only happens if first 2 go well - this is with senior engineer. They asked about past projects in detail. Coding test had 3 questions, need to solve at least 2 completely. Tip: Explain your thought process clearly, they value communication.'
  },
  {
    _id: 'place004',
    company: 'TCS',
    year: 2024,
    branch: 'All',
    package: '7 LPA',
    studentsPlaced: 150,
    selectionProcess: ['Aptitude Test', 'Technical Interview', 'HR Interview'],
    visitDate: '2024-11-25',
    eligibilityCriteria: 'CGPA >= 6.0',
    placedStudents: [
      { name: 'Rajesh Kumar', rollNo: '2021CSE145', package: '7 LPA', role: 'Assistant System Engineer' },
      { name: 'Pooja Sharma', rollNo: '2021IT078', package: '7 LPA', role: 'Assistant System Engineer' },
      { name: 'Amit Patel', rollNo: '2021ECE234', package: '7 LPA', role: 'Assistant System Engineer' }
    ],
    interviewExperience: 'TCS process is straightforward. Aptitude test covers quant, logical reasoning, and verbal. Technical interview asks basic programming concepts - OOP, DBMS, OS. HR round checks communication skills and willingness to relocate. They hire in large numbers. Preparation: Brush up fundamentals, practice aptitude from IndiaBix. Most students who clear aptitude get through.'
  },
  {
    _id: 'place005',
    company: 'Infosys',
    year: 2024,
    branch: 'All',
    package: '6.5 LPA',
    studentsPlaced: 180,
    selectionProcess: ['Online Test', 'Technical + HR Interview'],
    visitDate: '2024-11-20',
    eligibilityCriteria: 'CGPA >= 6.0',
    placedStudents: [
      { name: 'Sanjay Gupta', rollNo: '2021CSE167', package: '6.5 LPA', role: 'System Engineer' },
      { name: 'Neha Agarwal', rollNo: '2021IT156', package: '6.5 LPA', role: 'System Engineer' },
      { name: 'Vikram Rao', rollNo: '2021ECE189', package: '6.5 LPA', role: 'System Engineer' }
    ],
    interviewExperience: 'Infosys online test has coding, aptitude, and English sections. Coding has 2 easy-medium problems. Interview is combined technical + HR, lasts 20-30 minutes. They ask about projects, basic coding concepts, and career goals. Very beginner-friendly, good for first job. Tip: Be confident, show eagerness to learn. They value attitude over advanced skills for freshers.'
  }
];

export const interviewQuestions = [
  {
    _id: 'int001',
    company: 'Google',
    role: 'SDE',
    difficulty: 'Hard',
    topic: 'System Design',
    question: 'Design a URL shortening service like bit.ly',
    experience: 'Asked in Google L4 interview. Focus on scalability and database design. Discussed hashing algorithms, collision handling, and analytics tracking.',
    sharedBy: 'user004'
  },
  {
    _id: 'int002',
    company: 'Amazon',
    role: 'SDE',
    difficulty: 'Medium',
    topic: 'DSA',
    question: 'Find the longest palindromic substring',
    experience: 'Amazon SDE-1 interview. They wanted optimal O(n) solution using Manacher\'s algorithm. Also discussed brute force and dynamic programming approaches.',
    sharedBy: 'user007'
  },
  {
    _id: 'int003',
    company: 'Microsoft',
    role: 'SDE',
    difficulty: 'Medium',
    topic: 'Trees',
    question: 'Serialize and deserialize a binary tree',
    experience: 'Microsoft interview. Discussed multiple approaches including BFS and DFS. Interviewer was interested in handling null nodes efficiently.',
    sharedBy: 'user002'
  },
  {
    _id: 'int004',
    company: 'Facebook',
    role: 'SDE',
    difficulty: 'Hard',
    topic: 'System Design',
    question: 'Design Facebook News Feed',
    experience: 'Meta E4 interview. Focus on ranking algorithm, caching strategy, and real-time updates. Discussed fan-out on write vs fan-out on read.',
    sharedBy: 'user004'
  },
  {
    _id: 'int005',
    company: 'Google',
    role: 'SDE',
    difficulty: 'Medium',
    topic: 'Arrays',
    question: 'Trapping Rain Water',
    experience: 'Google L3 interview. Started with brute force O(n²), optimized to O(n) using two pointers. Interviewer asked about space optimization.',
    sharedBy: 'user001'
  },
  {
    _id: 'int006',
    company: 'Amazon',
    role: 'SDE',
    difficulty: 'Easy',
    topic: 'Strings',
    question: 'Valid Parentheses',
    experience: 'Amazon SDE-1 screening. Simple stack problem but they asked about edge cases and different bracket types.',
    sharedBy: 'user003'
  },
  {
    _id: 'int007',
    company: 'Microsoft',
    role: 'SDE',
    difficulty: 'Hard',
    topic: 'Dynamic Programming',
    question: 'Edit Distance (Levenshtein Distance)',
    experience: 'Microsoft SDE-2 interview. Had to explain the DP table construction clearly. Follow-up: optimize space complexity.',
    sharedBy: 'user005'
  },
  {
    _id: 'int008',
    company: 'Apple',
    role: 'SDE',
    difficulty: 'Medium',
    topic: 'Graphs',
    question: 'Course Schedule (Detect cycle in directed graph)',
    experience: 'Apple interview. Discussed both DFS and BFS approaches. Interviewer wanted topological sort implementation.',
    sharedBy: 'user006'
  },
  {
    _id: 'int009',
    company: 'Google',
    role: 'SDE',
    difficulty: 'Hard',
    topic: 'System Design',
    question: 'Design Google Drive',
    experience: 'Google L4 interview. Covered file storage, chunking, deduplication, sync mechanism, and conflict resolution. Deep dive into metadata management.',
    sharedBy: 'user008'
  },
  {
    _id: 'int010',
    company: 'Amazon',
    role: 'SDE',
    difficulty: 'Medium',
    topic: 'Binary Search',
    question: 'Search in Rotated Sorted Array',
    experience: 'Amazon interview. Classic binary search variant. Interviewer asked to handle duplicates as follow-up.',
    sharedBy: 'user002'
  },
  {
    _id: 'int011',
    company: 'Facebook',
    role: 'SDE',
    difficulty: 'Medium',
    topic: 'Linked Lists',
    question: 'Add Two Numbers (Linked List)',
    experience: 'Meta interview. Straightforward problem but they tested edge cases thoroughly - different lengths, carry handling.',
    sharedBy: 'user007'
  },
  {
    _id: 'int012',
    company: 'Microsoft',
    role: 'SDE',
    difficulty: 'Easy',
    topic: 'Hash Table',
    question: 'Two Sum',
    experience: 'Microsoft screening round. Simple problem but had to explain time-space tradeoff clearly.',
    sharedBy: 'user001'
  },
  {
    _id: 'int013',
    company: 'Google',
    role: 'SDE',
    difficulty: 'Hard',
    topic: 'Backtracking',
    question: 'N-Queens Problem',
    experience: 'Google L3 interview. Had to optimize and explain pruning strategies. Follow-up: count total solutions.',
    sharedBy: 'user004'
  },
  {
    _id: 'int014',
    company: 'Amazon',
    role: 'SDE',
    difficulty: 'Medium',
    topic: 'Stacks',
    question: 'Largest Rectangle in Histogram',
    experience: 'Amazon SDE-2 interview. Tricky stack problem. Interviewer wanted O(n) solution with detailed explanation.',
    sharedBy: 'user005'
  },
  {
    _id: 'int015',
    company: 'Apple',
    role: 'SDE',
    difficulty: 'Medium',
    topic: 'System Design',
    question: 'Design a Rate Limiter',
    experience: 'Apple interview. Discussed token bucket, leaky bucket, and sliding window algorithms. Focus on distributed systems.',
    sharedBy: 'user009'
  }
];

export const badges = [
  { id: 'first_blood', name: 'First Blood', description: 'Solve your first problem', icon: '🎯' },
  { id: 'problem_solver', name: 'Problem Solver', description: 'Solve 50 problems', icon: '💡' },
  { id: 'coding_ninja', name: 'Coding Ninja', description: 'Solve 100 problems', icon: '🥷' },
  { id: 'streak_master', name: 'Streak Master', description: '30-day coding streak', icon: '🔥' },
  { id: 'mentor', name: 'Mentor', description: 'Help 10 students', icon: '👨‍🏫' },
  { id: 'team_player', name: 'Team Player', description: 'Complete 3 collaborative projects', icon: '🤝' },
  { id: 'interview_ready', name: 'Interview Ready', description: 'Complete 20 mock interviews', icon: '💼' },
  { id: 'sql_wizard', name: 'SQL Wizard', description: 'Master all SQL topics', icon: '🗄️' },
  { id: 'full_stack_dev', name: 'Full Stack Developer', description: 'Complete both frontend and backend tracks', icon: '🚀' }
];

export const skillTracks = {
  DSA: {
    name: 'Data Structures & Algorithms',
    icon: '🧮',
    topics: [
      { id: 'arrays', name: 'Array', problems: 15, completed: 0 },
      { id: 'strings', name: 'String', problems: 12, completed: 0 },
      { id: 'linkedlist', name: 'Linked List', problems: 10, completed: 0 },
      { id: 'trees', name: 'Tree', problems: 12, completed: 0 },
      { id: 'graphs', name: 'Graph', problems: 10, completed: 0 },
      { id: 'dp', name: 'Dynamic Programming', problems: 15, completed: 0 },
      { id: 'sorting', name: 'Sorting', problems: 8, completed: 0 },
      { id: 'searching', name: 'Binary Search', problems: 8, completed: 0 }
    ]
  },
  CP: {
    name: 'Competitive Programming',
    icon: '🏆',
    topics: [
      { id: 'math', name: 'Math Foundations', problems: 10, completed: 0 },
      { id: 'greedy', name: 'Greedy Algorithms', problems: 12, completed: 0 },
      { id: 'twopointers', name: 'Two Pointers', problems: 10, completed: 0 },
      { id: 'binarysearch', name: 'Binary Search', problems: 10, completed: 0 },
      { id: 'numbertheory', name: 'Number Theory', problems: 15, completed: 0 },
      { id: 'gametheory', name: 'Game Theory', problems: 8, completed: 0 }
    ]
  },
  SQL: {
    name: 'SQL & Database Management',
    icon: '🗄️',
    topics: [
      { id: 'basics', name: 'SQL Basics', problems: 10, completed: 0 },
      { id: 'joins', name: 'Joins', problems: 12, completed: 0 },
      { id: 'aggregations', name: 'Aggregations', problems: 10, completed: 0 },
      { id: 'window', name: 'Window Functions', problems: 8, completed: 0 },
      { id: 'optimization', name: 'Query Optimization', problems: 10, completed: 0 }
    ]
  },
  Frontend: {
    name: 'Frontend Development',
    icon: '🎨',
    topics: [
      { id: 'html', name: 'HTML/CSS', problems: 8, completed: 0 },
      { id: 'javascript', name: 'JavaScript', problems: 15, completed: 0 },
      { id: 'react', name: 'React', problems: 12, completed: 0 },
      { id: 'state', name: 'State Management', problems: 10, completed: 0 },
      { id: 'uiux', name: 'UI/UX Principles', problems: 8, completed: 0 }
    ]
  },
  Backend: {
    name: 'Backend Development',
    icon: '⚙️',
    topics: [
      { id: 'nodejs', name: 'Node.js', problems: 10, completed: 0 },
      { id: 'express', name: 'Express', problems: 12, completed: 0 },
      { id: 'apis', name: 'REST APIs', problems: 10, completed: 0 },
      { id: 'auth', name: 'Authentication', problems: 8, completed: 0 },
      { id: 'databases', name: 'Databases', problems: 10, completed: 0 }
    ]
  }
};

export const submissions = [];
