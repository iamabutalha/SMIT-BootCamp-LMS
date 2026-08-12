/**
 * Admin Reports Analytics Service
 * Centralized service layer providing aggregated metrics, time-series data,
 * performance risk analytics, and export capabilities.
 */

// Initial mock dataset for reports analytics
const INITIAL_REPORTS_DATA = {
  kpi: {
    totalStudents: { value: 142, change: '+8.4%', isPositive: true, comparison: 'vs previous month' },
    avgAttendance: { value: '88.6%', change: '+4.2%', isPositive: true, comparison: 'vs previous month' },
    assignmentCompletion: { value: '84.2%', change: '+6.1%', isPositive: true, comparison: 'vs previous month' },
    avgQuizScore: { value: '76.8%', change: '-2.1%', isPositive: false, comparison: 'vs previous month' },
    taskCompletion: { value: '91.4%', change: '+5.8%', isPositive: true, comparison: 'vs previous month' },
    overallProgress: { value: '82.5%', change: '+4.8%', isPositive: true, comparison: 'vs previous month' },
  },

  performanceTrend: [
    { period: 'Week 1', attendance: 85, assignments: 78, quizzes: 74, tasks: 86, overall: 80.75 },
    { period: 'Week 2', attendance: 88, assignments: 82, quizzes: 76, tasks: 88, overall: 83.5 },
    { period: 'Week 3', attendance: 86, assignments: 80, quizzes: 72, tasks: 89, overall: 81.75 },
    { period: 'Week 4', attendance: 91, assignments: 86, quizzes: 78, tasks: 92, overall: 86.75 },
    { period: 'Week 5', attendance: 89, assignments: 84, quizzes: 75, tasks: 90, overall: 84.5 },
    { period: 'Week 6', attendance: 92, assignments: 88, quizzes: 81, tasks: 94, overall: 88.75 },
  ],

  attendance: {
    distribution: [
      { name: 'Present', value: 78, count: 111, color: '#57BA7F' },
      { name: 'Leave', value: 14, count: 20, color: '#DAA622' },
      { name: 'Absent', value: 8, count: 11, color: '#DE646D' },
    ],
    trend: [
      { week: 'Week 1', rate: 91 },
      { week: 'Week 2', rate: 94 },
      { week: 'Week 3', rate: 89 },
      { week: 'Week 4', rate: 95 },
    ],
    insight: 'Attendance improved by 4.2% compared with the previous period.',
  },

  assignments: {
    total: 28,
    completed: 24,
    pending: 3,
    overdue: 1,
    avgCompletionRate: '85.7%',
    topPerformers: [
      { id: 's1', rollNumber: '102341', name: 'Muhammad Ali', completed: 28, pending: 0, score: '96%' },
      { id: 's2', rollNumber: '102342', name: 'Fatima Ahmed', completed: 27, pending: 1, score: '94%' },
      { id: 's3', rollNumber: '102345', name: 'Bilal Hussain', completed: 26, pending: 2, score: '91%' },
      { id: 's4', rollNumber: '102346', name: 'Zainab Bibi', completed: 28, pending: 0, score: '98%' },
    ],
  },

  quizzes: {
    total: 12,
    avgScore: '76.8%',
    highestScore: '98%',
    lowestScore: '42%',
    passRate: '87.5%',
    trend: [
      { quiz: 'Q1: HTML', avgScore: 88 },
      { quiz: 'Q2: CSS', avgScore: 82 },
      { quiz: 'Q3: JS Basics', avgScore: 74 },
      { quiz: 'Q4: React', avgScore: 79 },
      { quiz: 'Q5: Node.js', avgScore: 71 },
      { quiz: 'Q6: MongoDB', avgScore: 76 },
    ],
    topPerformers: [
      { id: 's6', rollNumber: '102346', name: 'Zainab Bibi', attempts: 12, avgScore: '96.4%', passRate: '100%' },
      { id: 's1', rollNumber: '102341', name: 'Muhammad Ali', attempts: 12, avgScore: '94.2%', passRate: '100%' },
      { id: 's2', rollNumber: '102342', name: 'Fatima Ahmed', attempts: 11, avgScore: '91.8%', passRate: '100%' },
      { id: 's5', rollNumber: '102345', name: 'Bilal Hussain', attempts: 12, avgScore: '88.5%', passRate: '91.6%' },
    ],
  },

  tasks: {
    total: 45,
    completed: 38,
    inProgress: 5,
    pending: 2,
    completionRate: '84.4%',
    topTeams: [
      { teamId: 't1', teamName: 'Team Alpha', members: 12, completedTasks: 42, completionRate: '93.3%' },
      { teamId: 't2', teamName: 'Team Beta', members: 10, completedTasks: 38, completionRate: '88.8%' },
      { teamId: 't3', teamName: 'Team Gamma', members: 11, completedTasks: 35, completionRate: '83.3%' },
      { teamId: 't4', teamName: 'Team Delta', members: 9, completedTasks: 28, completionRate: '70.0%' },
    ],
  },

  teams: [
    { id: 't1', name: 'Team Alpha', members: 12, attendance: '94%', taskCompletion: '93%', assignmentCompletion: '95%', quizScore: '86%', overallScore: 92, status: 'EXCELLENT' },
    { id: 't2', name: 'Team Beta', members: 10, attendance: '90%', taskCompletion: '88%', assignmentCompletion: '90%', quizScore: '82%', overallScore: 87.5, status: 'EXCELLENT' },
    { id: 't3', name: 'Team Gamma', members: 11, attendance: '85%', taskCompletion: '83%', assignmentCompletion: '84%', quizScore: '76%', overallScore: 82, status: 'GOOD' },
    { id: 't4', name: 'Team Delta', members: 9, attendance: '74%', taskCompletion: '70%', assignmentCompletion: '68%', quizScore: '62%', overallScore: 68.5, status: 'NEEDS ATTENTION' },
  ],

  students: [
    { id: 's1', studentId: 's1', rollNumber: '102341', name: 'Muhammad Ali', team: 'Team Alpha', attendance: '96%', tasks: '95%', assignments: '96%', quizScore: '94%', overallScore: 95.2, status: 'EXCELLENT' },
    { id: 's2', studentId: 's2', rollNumber: '102342', name: 'Fatima Ahmed', team: 'Team Alpha', attendance: '94%', tasks: '92%', assignments: '94%', quizScore: '92%', overallScore: 93, status: 'EXCELLENT' },
    { id: 's3', studentId: 's3', rollNumber: '102343', name: 'Usman Ghani', team: 'Team Beta', attendance: '88%', tasks: '84%', assignments: '86%', quizScore: '78%', overallScore: 84, status: 'GOOD' },
    { id: 's4', studentId: 's4', rollNumber: '102344', name: 'Aisha Malik', team: 'Team Delta', attendance: '68%', tasks: '55%', assignments: '58%', quizScore: '48%', overallScore: 57.25, status: 'AT RISK' },
    { id: 's5', studentId: 's5', rollNumber: '102345', name: 'Bilal Hussain', team: 'Team Beta', attendance: '90%', tasks: '88%', assignments: '91%', quizScore: '88%', overallScore: 89.25, status: 'GOOD' },
    { id: 's6', studentId: 's6', rollNumber: '102346', name: 'Zainab Bibi', team: 'Team Alpha', attendance: '98%', tasks: '96%', assignments: '98%', quizScore: '96%', overallScore: 97, status: 'EXCELLENT' },
    { id: 's7', studentId: 's7', rollNumber: '102347', name: 'Hamza Khan', team: 'Team Delta', attendance: '64%', tasks: '52%', assignments: '50%', quizScore: '44%', overallScore: 52.5, status: 'AT RISK' },
  ],

  atRisk: [
    { id: 's4', studentId: 's4', rollNumber: '102344', name: 'Aisha Malik', riskReason: 'Low Attendance & Assignments', attendance: 68, completion: 58, score: 48, status: 'AT RISK' },
    { id: 's7', studentId: 's7', rollNumber: '102347', name: 'Hamza Khan', riskReason: 'Low Attendance & Quizzes', attendance: 64, completion: 50, score: 44, status: 'AT RISK' },
  ],

  teachers: [
    { id: 'tch1', name: 'Sir Inzamam Malik', students: 65, assignments: 14, quizzes: 6, avgStudentScore: '86.4%', completionRate: '92%' },
    { id: 'tch2', name: 'Sir Ishaq Hassan', students: 77, assignments: 14, quizzes: 6, avgStudentScore: '82.1%', completionRate: '88%' },
  ],

  insights: [
    { type: 'success', text: 'Attendance improved by 5.4% this month across all active cohorts.' },
    { type: 'success', text: 'Assignment completion is highest in Team Alpha (95% completion rate).' },
    { type: 'warning', text: '2 students currently have attendance below 75% threshold.' },
    { type: 'warning', text: 'Quiz performance dropped 2.1% compared with the previous assessment cycle.' },
    { type: 'success', text: 'Task completion increased by 5.8% following recent lab sprint.' },
  ],
};

export const adminReportService = {
  /**
   * Fetch complete admin report summary based on filters
   */
  async getReportData(filters = {}) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredData = JSON.parse(JSON.stringify(INITIAL_REPORTS_DATA));

        // Filter by Team if selected
        if (filters.team && filters.team !== 'ALL') {
          filteredData.students = filteredData.students.filter(
            (s) => s.team.toLowerCase() === filters.team.toLowerCase()
          );
        }

        // Filter by Performance Level if selected
        if (filters.performance && filters.performance !== 'ALL') {
          filteredData.students = filteredData.students.filter(
            (s) => s.status.toUpperCase() === filters.performance.toUpperCase()
          );
        }

        resolve({
          success: true,
          data: filteredData,
        });
      }, 400);
    });
  },

  /**
   * Export Report dataset to formatted CSV string and trigger browser download
   */
  exportToCSV(data, fileName = 'Bootcamp_Admin_Report.csv') {
    if (!data) return;

    let csvContent = 'data:text/csv;charset=utf-8,';

    // Summary Section
    csvContent += 'SAYLANI MASS IT TRAINING — BOOTCAMP ADMIN REPORT\n';
    csvContent += `Generated On,${new Date().toLocaleDateString()}\n\n`;

    // KPI Summary
    csvContent += 'KEY PERFORMANCE INDICATORS\n';
    csvContent += 'Metric,Value,Change,Comparison Period\n';
    csvContent += `Total Students,${data.kpi.totalStudents.value},${data.kpi.totalStudents.change},${data.kpi.totalStudents.comparison}\n`;
    csvContent += `Average Attendance,${data.kpi.avgAttendance.value},${data.kpi.avgAttendance.change},${data.kpi.avgAttendance.comparison}\n`;
    csvContent += `Assignment Completion,${data.kpi.assignmentCompletion.value},${data.kpi.assignmentCompletion.change},${data.kpi.assignmentCompletion.comparison}\n`;
    csvContent += `Average Quiz Score,${data.kpi.avgQuizScore.value},${data.kpi.avgQuizScore.change},${data.kpi.avgQuizScore.comparison}\n`;
    csvContent += `Task Completion,${data.kpi.taskCompletion.value},${data.kpi.taskCompletion.change},${data.kpi.taskCompletion.comparison}\n`;
    csvContent += `Overall Progress,${data.kpi.overallProgress.value},${data.kpi.overallProgress.change},${data.kpi.overallProgress.comparison}\n\n`;

    // Team Performance
    csvContent += 'TEAM PERFORMANCE RANKING\n';
    csvContent += 'Team Name,Members,Attendance,Task Completion,Assignment Completion,Quiz Score,Overall Score,Status\n';
    data.teams.forEach((t) => {
      csvContent += `${t.name},${t.members},${t.attendance},${t.taskCompletion},${t.assignmentCompletion},${t.quizScore},${t.overallScore}%,${t.status}\n`;
    });
    csvContent += '\n';

    // Student Roster
    csvContent += 'STUDENT PERFORMANCE ROSTER\n';
    csvContent += 'Roll Number,Student Name,Team,Attendance,Task Completion,Assignment Completion,Quiz Score,Overall Score,Status\n';
    data.students.forEach((s) => {
      csvContent += `${s.rollNumber},${s.name},${s.team},${s.attendance},${s.tasks},${s.assignments},${s.quizScore},${s.overallScore}%,${s.status}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};

export default adminReportService;
