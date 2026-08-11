/**
 * Student Details & Performance Data Service Layer
 * Aggregates student profiles, team assignments, attendance logs, tasks, & assignment grades.
 * Ready to hook up to backend REST/RTK Query APIs (usersApi, attendanceApi, tasksApi).
 */

export const MOCK_STUDENTS_DETAILS = {
  '1': {
    id: '1',
    rollNumber: '102341',
    name: 'Muhammad Ali',
    email: 'ali@example.com',
    course: 'Web & Mobile Dev',
    batch: 'Batch 10',
    status: 'Active',
    joinedDate: '2026-01-10',
    avatar: '',
    team: {
      id: '1',
      name: 'Team Alpha — Web Development',
      teamLead: 'Muhammad Ali',
      description: 'Full-stack web development team focusing on React, Node.js, Express, and MongoDB LMS platforms.',
      membersCount: 4,
      progress: 75,
    },
    overview: {
      attendanceRate: 92,
      tasksCompleted: 18,
      tasksTotal: 24,
      assignmentsCompleted: 14,
      assignmentsTotal: 18,
      overallPerformance: 86,
    },
    attendance: {
      rate: 92,
      presentCount: 23,
      absentCount: 2,
      leaveCount: 1,
      logs: [
        { date: '2026-08-11', day: 'Tuesday', status: 'Present', checkIn: '09:00 AM', remarks: 'On time' },
        { date: '2026-08-10', day: 'Monday', status: 'Present', checkIn: '09:05 AM', remarks: 'On time' },
        { date: '2026-08-08', day: 'Saturday', status: 'Absent', checkIn: '—', remarks: 'Unexcused absence' },
        { date: '2026-08-07', day: 'Friday', status: 'Present', checkIn: '08:55 AM', remarks: 'Early arrival' },
        { date: '2026-08-06', day: 'Thursday', status: 'Leave', checkIn: '—', remarks: 'Approved medical leave' },
        { date: '2026-08-05', day: 'Wednesday', status: 'Present', checkIn: '09:02 AM', remarks: 'On time' },
      ],
      trend: [
        { label: 'Week 1', rate: 95 },
        { label: 'Week 2', rate: 90 },
        { label: 'Week 3', rate: 92 },
        { label: 'Week 4', rate: 88 },
        { label: 'Week 5', rate: 96 },
        { label: 'Week 6', rate: 92 },
      ],
    },
    performance: {
      attendanceScore: 92,
      taskCompletionScore: 75,
      assignmentCompletionScore: 78,
      onTimeSubmissionScore: 88,
      overallScore: 86,
      chartData: [
        { metric: 'Attendance', student: 92, cohortAverage: 82 },
        { metric: 'Task Completion', student: 75, cohortAverage: 70 },
        { metric: 'Assignment Grade', student: 88, cohortAverage: 76 },
        { metric: 'On-Time Rate', student: 88, cohortAverage: 80 },
        { metric: 'Overall', student: 86, cohortAverage: 77 },
      ],
    },
    assignments: [
      { id: 'as-1', title: 'React Authentication System', description: 'JWT tokens, role guards, and context API', dueDate: '2026-08-10', status: 'Completed', score: 92 },
      { id: 'as-2', title: 'Redux Toolkit Store Setup', description: 'Slice reducers, RTK Query baseApi, and state selectors', dueDate: '2026-08-05', status: 'Completed', score: 88 },
      { id: 'as-3', title: 'Recharts Dashboard Analytics', description: 'Interactive area, bar, and donut charts', dueDate: '2026-08-15', status: 'In Progress', score: null },
      { id: 'as-4', title: 'Node.js Express REST API', description: 'MongoDB schemas, controllers, and error middlewares', dueDate: '2026-08-20', status: 'Pending', score: null },
    ],
    tasks: [
      { id: 'tk-1', title: 'JWT Auth Guards', priority: 'High', dueDate: '2026-08-10', status: 'Completed', progress: 100 },
      { id: 'tk-2', title: 'Admin Dashboard Widgets', priority: 'High', dueDate: '2026-08-11', status: 'Completed', progress: 100 },
      { id: 'tk-3', title: 'Attendance History Matrix', priority: 'Medium', dueDate: '2026-08-15', status: 'In Progress', progress: 60 },
      { id: 'tk-4', title: 'MongoDB API Routes', priority: 'High', dueDate: '2026-08-20', status: 'Pending', progress: 0 },
    ],
    activities: [
      { id: 1, title: 'Submitted Assignment "React Authentication System"', time: '2 hours ago', type: 'success' },
      { id: 2, title: 'Completed Task "Admin Dashboard Widgets"', time: '1 day ago', type: 'info' },
      { id: 3, title: 'Marked Present in Web Development Class', time: '2 days ago', type: 'info' },
      { id: 4, title: 'Grade Received: 92% on React Task', time: '3 days ago', type: 'success' },
    ],
  },
  '2': {
    id: '2',
    rollNumber: '102342',
    name: 'Fatima Ahmed',
    email: 'fatima@example.com',
    course: 'Web & Mobile Dev',
    batch: 'Batch 10',
    status: 'Active',
    joinedDate: '2026-01-12',
    avatar: '',
    team: {
      id: '1',
      name: 'Team Alpha — Web Development',
      teamLead: 'Muhammad Ali',
      description: 'Full-stack web development team focusing on React, Node.js, Express, and MongoDB LMS platforms.',
      membersCount: 4,
      progress: 75,
    },
    overview: {
      attendanceRate: 88,
      tasksCompleted: 15,
      tasksTotal: 20,
      assignmentsCompleted: 12,
      assignmentsTotal: 16,
      overallPerformance: 82,
    },
    attendance: {
      rate: 88,
      presentCount: 21,
      absentCount: 3,
      leaveCount: 0,
      logs: [
        { date: '2026-08-11', day: 'Tuesday', status: 'Present', checkIn: '09:05 AM', remarks: 'On time' },
        { date: '2026-08-10', day: 'Monday', status: 'Present', checkIn: '09:10 AM', remarks: 'On time' },
      ],
      trend: [
        { label: 'Week 1', rate: 90 },
        { label: 'Week 2', rate: 85 },
        { label: 'Week 3', rate: 88 },
      ],
    },
    performance: {
      attendanceScore: 88,
      taskCompletionScore: 75,
      assignmentCompletionScore: 75,
      onTimeSubmissionScore: 85,
      overallScore: 82,
      chartData: [
        { metric: 'Attendance', student: 88, cohortAverage: 82 },
        { metric: 'Task Completion', student: 75, cohortAverage: 70 },
        { metric: 'Assignment Grade', student: 85, cohortAverage: 76 },
        { metric: 'On-Time Rate', student: 85, cohortAverage: 80 },
        { metric: 'Overall', student: 82, cohortAverage: 77 },
      ],
    },
    assignments: [
      { id: 'as-20', title: 'CSS Grid & Flexbox Layouts', description: 'Responsive LMS layout design', dueDate: '2026-08-01', status: 'Completed', score: 85 },
    ],
    tasks: [
      { id: 'tk-20', title: 'Frontend UI Components', priority: 'Medium', dueDate: '2026-08-05', status: 'Completed', progress: 100 },
    ],
    activities: [
      { id: 1, title: 'Completed Task "Frontend UI Components"', time: '3 days ago', type: 'info' },
    ],
  },
};

export const getStudentDetails = (studentId) => {
  if (!studentId) return MOCK_STUDENTS_DETAILS['1'];
  const key = String(studentId);
  if (MOCK_STUDENTS_DETAILS[key]) {
    return MOCK_STUDENTS_DETAILS[key];
  }
  const foundByRoll = Object.values(MOCK_STUDENTS_DETAILS).find(
    (s) => String(s.rollNumber) === key || String(s.id) === key
  );
  if (foundByRoll) {
    return foundByRoll;
  }
  // Return template populated with given ID / rollNumber so it never fails to display
  return {
    ...MOCK_STUDENTS_DETAILS['1'],
    id: key,
    rollNumber: key.startsWith('10') ? key : `1023${key.slice(-2)}`,
    name: key === '3' ? 'Usman Ghani' : key === '4' ? 'Aisha Malik' : key === '5' ? 'Bilal Hussain' : 'Muhammad Ali',
  };
};
