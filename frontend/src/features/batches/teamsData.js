/**
 * Teams & Cohorts Data & Service Abstraction Layer
 * Provides mock data and state helpers for Team Details, Members, & Tasks.
 * Ready for easy integration with RTK Query (batchesApi & tasksApi) when backend is connected.
 */

export const INITIAL_TEAMS_DATA = [
  {
    _id: '1',
    name: 'Team Alpha — Web Development',
    batch: 'Batch 12',
    description: 'Full-stack web development team focusing on React, Node.js, Express, and MongoDB LMS platforms.',
    mentorName: 'Ahmed Raza',
    status: 'active',
    createdAt: '2026-01-15',
    members: [
      { id: 's1', rollNumber: '102341', name: 'Muhammad Ali', email: 'ali@saylani.org', role: 'Team Lead', joinedAt: '2026-01-15' },
      { id: 's2', rollNumber: '102342', name: 'Fatima Ahmed', email: 'fatima@saylani.org', role: 'Frontend Developer', joinedAt: '2026-01-18' },
      { id: 's3', rollNumber: '102346', name: 'Zainab Bibi', email: 'zainab@saylani.org', role: 'Backend Developer', joinedAt: '2026-02-01' },
      { id: 's4', rollNumber: '102347', name: 'Hamza Khan', email: 'hamza@saylani.org', role: 'UI/UX Designer', joinedAt: '2026-02-05' },
    ],
    tasks: [
      {
        id: 't1',
        title: 'Implement Authentication & Role Authorization',
        description: 'Build JWT login, refresh tokens, and role-based route guards for Student and Admin domains.',
        status: 'Completed',
        priority: 'High',
        dueDate: '2026-08-10',
        assignedTo: 'Muhammad Ali',
        assignedToRoll: '102341',
      },
      {
        id: 't2',
        title: 'Create Responsive LMS Admin Dashboard',
        description: 'Design key performance indicators, Recharts analytics, and sidebar navigation.',
        status: 'Completed',
        priority: 'High',
        dueDate: '2026-08-11',
        assignedTo: 'Fatima Ahmed',
        assignedToRoll: '102342',
      },
      {
        id: 't3',
        title: 'Attendance History & Matrix View',
        description: 'Build Year, Month, Week, and Date drilldown views for student attendance tracking.',
        status: 'In Progress',
        priority: 'Medium',
        dueDate: '2026-08-15',
        assignedTo: 'Zainab Bibi',
        assignedToRoll: '102346',
      },
      {
        id: 't4',
        title: 'Backend API Endpoints Integration',
        description: 'Connect RTK Query endpoints with MongoDB database models and Express routes.',
        status: 'Pending',
        priority: 'High',
        dueDate: '2026-08-20',
        assignedTo: 'Hamza Khan',
        assignedToRoll: '102347',
      },
    ],
  },
  {
    _id: '2',
    name: 'Team Beta — Mobile App Development',
    batch: 'Batch 5',
    description: 'Cross-platform mobile application development team building React Native & Expo applications.',
    mentorName: 'Sara Khan',
    status: 'active',
    createdAt: '2026-02-10',
    members: [
      { id: 's5', rollNumber: '102343', name: 'Usman Ghani', email: 'usman@saylani.org', role: 'Team Lead', joinedAt: '2026-02-10' },
      { id: 's6', rollNumber: '102344', name: 'Aisha Malik', email: 'aisha@saylani.org', role: 'Mobile Dev', joinedAt: '2026-02-12' },
    ],
    tasks: [
      {
        id: 't5',
        title: 'Setup React Native Expo Navigation',
        description: 'Configure React Navigation stack and bottom tab bar for iOS and Android.',
        status: 'Completed',
        priority: 'High',
        dueDate: '2026-08-05',
        assignedTo: 'Usman Ghani',
        assignedToRoll: '102343',
      },
      {
        id: 't6',
        title: 'Push Notifications & Attendance Alerts',
        description: 'Integrate Firebase Cloud Messaging (FCM) for instant student notifications.',
        status: 'In Progress',
        priority: 'Medium',
        dueDate: '2026-08-18',
        assignedTo: 'Aisha Malik',
        assignedToRoll: '102344',
      },
    ],
  },
  {
    _id: '3',
    name: 'Team Gamma — AI & Machine Learning',
    batch: 'Batch 3',
    description: 'Artificial Intelligence team working on automated grading models and NLP analytics.',
    mentorName: 'Tariq Mehmood',
    status: 'completed',
    createdAt: '2025-10-01',
    members: [
      { id: 's7', rollNumber: '102345', name: 'Bilal Hussain', email: 'bilal@saylani.org', role: 'AI Specialist', joinedAt: '2025-10-01' },
    ],
    tasks: [
      {
        id: 't7',
        title: 'Train Automated Assignment Scoring Model',
        description: 'Build Python FastAPI service to evaluate submitted code assignments.',
        status: 'Completed',
        priority: 'High',
        dueDate: '2026-06-30',
        assignedTo: 'Bilal Hussain',
        assignedToRoll: '102345',
      },
    ],
  },
];

export const AVAILABLE_STUDENTS_POOL = [
  { id: 'pool-1', rollNumber: '102348', name: 'Sana Tariq', email: 'sana@saylani.org', role: 'Member' },
  { id: 'pool-2', rollNumber: '102349', name: 'Kashif Ali', email: 'kashif@saylani.org', role: 'Member' },
  { id: 'pool-3', rollNumber: '102350', name: 'Maryam Nawaz', email: 'maryam@saylani.org', role: 'Member' },
  { id: 'pool-4', rollNumber: '102351', name: 'Omer Farooq', email: 'omer@saylani.org', role: 'Member' },
  { id: 'pool-5', rollNumber: '102352', name: 'Hassan Raza', email: 'hassan@saylani.org', role: 'Member' },
];
