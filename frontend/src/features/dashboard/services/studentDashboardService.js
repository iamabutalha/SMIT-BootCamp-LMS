/**
 * Student Dashboard Data & Service Layer
 * Aggregates student learning analytics, attendance, assignments, quizzes, and team progress.
 * Designed for seamless transition to backend REST APIs.
 */

export const MOCK_STUDENT_DASHBOARD_DATA = {
  student: {
    id: '1',
    name: 'Muhammad Hamza',
    rollNumber: '102341',
    email: 'hamza.student@saylani.org.pk',
    batch: 'MERN Stack — Batch 12',
    team: 'Team Alpha',
    teamLead: 'Muhammad Hamza',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    joinedDate: '2026-01-15',
  },

  summary: {
    overallProgress: 78,
    attendanceRate: 92,
    tasksCompleted: { completed: 18, total: 24 },
    assignments: { completed: 12, total: 15 },
    quizAverage: 86,
    currentStreakDays: 7,
  },

  progressOverTime: [
    { week: 'Week 1', progress: 35, tasks: 3 },
    { week: 'Week 2', progress: 44, tasks: 6 },
    { week: 'Week 3', progress: 52, tasks: 9 },
    { week: 'Week 4', progress: 61, tasks: 12 },
    { week: 'Week 5', progress: 70, tasks: 15 },
    { week: 'Week 6', progress: 78, tasks: 18 },
  ],

  attendance: {
    rate: 92,
    totalDays: 24,
    present: 22,
    leave: 1,
    absent: 1,
    distribution: [
      { name: 'Present', value: 22, color: '#57BA7F' },
      { name: 'Leave', value: 1, color: '#DAA622' },
      { name: 'Absent', value: 1, color: '#DE646D' },
    ],
  },

  taskPerformance: {
    assigned: 24,
    completed: 18,
    pending: 4,
    overdue: 2,
    breakdown: [
      { label: 'Completed', percentage: 75, color: '#21C75D' },
      { label: 'Pending', percentage: 17, color: '#0284C7' },
      { label: 'Overdue', percentage: 8, color: '#DE646D' },
    ],
  },

  latestAssignments: [
    {
      id: 'asg-1',
      title: 'React Authentication & Protected Routes',
      course: 'Frontend Development',
      dueDate: 'Aug 14, 2026',
      status: 'Completed',
      score: '92%',
      gradeColor: '#21C75D',
    },
    {
      id: 'asg-2',
      title: 'Express & REST API Integration',
      course: 'Backend Development',
      dueDate: 'Aug 16, 2026',
      status: 'Pending',
      score: '—',
      gradeColor: '#0284C7',
    },
    {
      id: 'asg-3',
      title: 'JWT Authentication Middleware',
      course: 'Backend Development',
      dueDate: 'Aug 10, 2026',
      status: 'Overdue',
      score: '—',
      gradeColor: '#DE646D',
    },
    {
      id: 'asg-4',
      title: 'MongoDB Schema & Mongoose Aggregation',
      course: 'Database Architecture',
      dueDate: 'Aug 22, 2026',
      status: 'Submitted',
      score: 'Reviewing',
      gradeColor: '#9D6BE2',
    },
  ],

  quizPerformance: {
    averageScore: 86,
    attemptedCount: 8,
    highestScore: 100,
    pendingCount: 2,
    recentQuizzes: [
      {
        id: 'q-1',
        title: 'JavaScript Fundamentals & ES6+',
        attempt: 'Attempt 1',
        score: '80%',
        percentage: 80,
        status: 'Passed',
        date: '2026-08-01',
      },
      {
        id: 'q-2',
        title: 'React State Management & RTK',
        attempt: 'Attempt 1',
        score: '100%',
        percentage: 100,
        status: 'Passed',
        date: '2026-08-04',
      },
      {
        id: 'q-3',
        title: 'Node.js, Express & Architecture',
        attempt: 'Attempt 1',
        score: '78%',
        percentage: 78,
        status: 'Passed',
        date: '2026-08-08',
      },
    ],
  },

  recentActivity: [
    {
      id: 'act-1',
      type: 'assignment',
      title: 'Completed React Authentication assignment',
      time: '2 hours ago',
      iconColor: 'bg-emerald-50 text-[#21C75D]',
    },
    {
      id: 'act-2',
      type: 'quiz',
      title: 'Submitted Node.js & Express Architecture Quiz',
      time: 'Yesterday',
      iconColor: 'bg-sky-50 text-[#0284C7]',
    },
    {
      id: 'act-3',
      type: 'attendance',
      title: 'Attendance marked Present for Web Batch 12',
      time: 'Yesterday',
      iconColor: 'bg-emerald-50 text-[#57BA7F]',
    },
    {
      id: 'act-4',
      type: 'team',
      title: 'Joined Team Alpha as Team Lead',
      time: '3 days ago',
      iconColor: 'bg-purple-50 text-[#9D6BE2]',
    },
  ],

  upcomingDeadlines: [
    {
      id: 'dl-1',
      title: 'React API Integration Assignment',
      dueDate: 'Due Tomorrow',
      urgency: 'high',
      course: 'Frontend Development',
    },
    {
      id: 'dl-2',
      title: 'Node Authentication Quiz',
      dueDate: 'Due in 3 days',
      urgency: 'medium',
      course: 'Backend Development',
    },
    {
      id: 'dl-3',
      title: 'MongoDB Pipeline Submission',
      dueDate: 'Due in 5 days',
      urgency: 'normal',
      course: 'Database Architecture',
    },
  ],

  teamOverview: {
    teamName: 'Team Alpha',
    teamLead: 'Muhammad Hamza',
    memberCount: 5,
    projectName: 'Bootcamp LMS Platform',
    progress: 72,
    members: [
      { name: 'Muhammad Hamza', role: 'Lead', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
      { name: 'Fatima Ahmed', role: 'Frontend', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
      { name: 'Usman Ghani', role: 'Backend', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
      { name: 'Aisha Malik', role: 'UI/UX', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
      { name: 'Bilal Hussain', role: 'Database', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
    ],
  },

  learningProgress: [
    { module: 'Frontend Development', percentage: 85, color: '#21C75D' },
    { module: 'Backend Development', percentage: 72, color: '#0284C7' },
    { module: 'Database Architecture', percentage: 68, color: '#9D6BE2' },
    { module: 'DevOps & Deployment', percentage: 45, color: '#DAA622' },
  ],
};

export const studentDashboardService = {
  getStudentDashboardOverview: async (studentId = '1') => {
    // Simulate lightweight API response delay
    await new Promise((resolve) => setTimeout(resolve, 150));

    return {
      ...MOCK_STUDENT_DASHBOARD_DATA,
      student: {
        ...MOCK_STUDENT_DASHBOARD_DATA.student,
        id: studentId,
      },
    };
  },
};

export default studentDashboardService;
