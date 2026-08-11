/**
 * Dashboard Analytics Data & Service Layer
 * Provides time-period based metrics for charts and progress summaries.
 * Designed to easily connect with RTK Query or backend APIs when ready.
 */

export const ANALYTICS_DATA = {
  this_month: {
    studentProgress: [
      { week: 'Week 1', progress: 35, target: 40 },
      { week: 'Week 2', progress: 48, target: 50 },
      { week: 'Week 3', progress: 57, target: 60 },
      { week: 'Week 4', progress: 68, target: 70 },
      { week: 'Week 5', progress: 74, target: 75 },
      { week: 'Week 6', progress: 82, target: 85 },
    ],
    attendance: [
      { name: 'Present', value: 82, color: '#57BA7F' },
      { name: 'Absent', value: 10, color: '#DE646D' },
      { name: 'Leave', value: 8, color: '#DAA622' },
    ],
    taskStatus: [
      { name: 'Completed', count: 65, color: '#38A65D' },
      { name: 'Pending', count: 25, color: '#C88B0D' },
      { name: 'Overdue', count: 10, color: '#CF3E44' },
    ],
    summary: {
      averageProgress: 72,
      topPerformersCount: 8,
      atRiskCount: 5,
      modulesCompleted: 64,
    },
  },
  this_week: {
    studentProgress: [
      { week: 'Mon', progress: 70, target: 75 },
      { week: 'Tue', progress: 72, target: 75 },
      { week: 'Wed', progress: 75, target: 75 },
      { week: 'Thu', progress: 78, target: 80 },
      { week: 'Fri', progress: 80, target: 80 },
      { week: 'Sat', progress: 82, target: 85 },
    ],
    attendance: [
      { name: 'Present', value: 86, color: '#57BA7F' },
      { name: 'Absent', value: 8, color: '#DE646D' },
      { name: 'Leave', value: 6, color: '#DAA622' },
    ],
    taskStatus: [
      { name: 'Completed', count: 22, color: '#38A65D' },
      { name: 'Pending', count: 8, color: '#C88B0D' },
      { name: 'Overdue', count: 2, color: '#CF3E44' },
    ],
    summary: {
      averageProgress: 76,
      topPerformersCount: 10,
      atRiskCount: 3,
      modulesCompleted: 70,
    },
  },
  today: {
    studentProgress: [
      { week: '9 AM', progress: 65, target: 70 },
      { week: '12 PM', progress: 70, target: 70 },
      { week: '3 PM', progress: 78, target: 80 },
      { week: '6 PM', progress: 82, target: 82 },
    ],
    attendance: [
      { name: 'Present', value: 90, color: '#57BA7F' },
      { name: 'Absent', value: 6, color: '#DE646D' },
      { name: 'Leave', value: 4, color: '#DAA622' },
    ],
    taskStatus: [
      { name: 'Completed', count: 8, color: '#38A65D' },
      { name: 'Pending', count: 3, color: '#C88B0D' },
      { name: 'Overdue', count: 1, color: '#CF3E44' },
    ],
    summary: {
      averageProgress: 80,
      topPerformersCount: 12,
      atRiskCount: 2,
      modulesCompleted: 75,
    },
  },
};

export const TOP_STUDENTS = [
  { id: '1', rank: 1, name: 'Muhammad Ali', rollNumber: '102341', progress: 92, avatar: '' },
  { id: '2', rank: 2, name: 'Ali Raza', rollNumber: '102342', progress: 88, avatar: '' },
  { id: '3', rank: 3, name: 'Ahmed Khan', rollNumber: '102343', progress: 85, avatar: '' },
  { id: '4', rank: 4, name: 'Hamza Mehmood', rollNumber: '102344', progress: 82, avatar: '' },
];
