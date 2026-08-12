/**
 * Student Attendance Data & Service Layer
 * Manages read-only attendance records, summary calculations, trends, and calendar hydration for students.
 */

export const MOCK_STUDENT_ATTENDANCE_RECORDS = [
  // August 2026
  { id: 'att-1', date: '2026-08-07', day: 'Friday', className: 'Web Development', session: 'Frontend Development & React 19', status: 'present', checkIn: '09:55 AM', checkOut: '12:00 PM', markedBy: 'Admin / Mentor', remarks: 'On time, active participation' },
  { id: 'att-2', date: '2026-08-06', day: 'Thursday', className: 'Web Development', session: 'Redux Toolkit State Hydration', status: 'absent', checkIn: '—', checkOut: '—', markedBy: 'Admin System', remarks: 'Not attended' },
  { id: 'att-3', date: '2026-08-05', day: 'Wednesday', className: 'Web Development', session: 'Express Middleware & REST APIs', status: 'leave', checkIn: '—', checkOut: '—', markedBy: 'Mentor (Approved)', remarks: 'Approved medical leave' },
  { id: 'att-4', date: '2026-08-04', day: 'Tuesday', className: 'Web Development', session: 'Node.js Async Architecture', status: 'present', checkIn: '09:50 AM', checkOut: '12:00 PM', markedBy: 'Admin / Mentor', remarks: 'On time' },
  { id: 'att-5', date: '2026-08-03', day: 'Monday', className: 'Web Development', session: 'MongoDB Schema Design & Pipelines', status: 'present', checkIn: '09:58 AM', checkOut: '12:00 PM', markedBy: 'Admin / Mentor', remarks: 'On time' },
  
  // July 2026
  { id: 'att-6', date: '2026-07-31', day: 'Friday', className: 'Web Development', session: 'CSS Grid & Flexbox Algorithms', status: 'present', checkIn: '09:52 AM', checkOut: '12:00 PM', markedBy: 'Admin / Mentor', remarks: 'On time' },
  { id: 'att-7', date: '2026-07-30', day: 'Thursday', className: 'Web Development', session: 'JavaScript Async/Await & Promises', status: 'present', checkIn: '09:54 AM', checkOut: '12:00 PM', markedBy: 'Admin / Mentor', remarks: 'On time' },
  { id: 'att-8', date: '2026-07-29', day: 'Wednesday', className: 'Web Development', session: 'ES6+ Syntax & Scope Closures', status: 'present', checkIn: '09:48 AM', checkOut: '12:00 PM', markedBy: 'Admin / Mentor', remarks: 'On time' },
  { id: 'att-9', date: '2026-07-28', day: 'Tuesday', className: 'Web Development', session: 'HTML5 Semantic Layouts & SEO', status: 'present', checkIn: '09:57 AM', checkOut: '12:00 PM', markedBy: 'Admin / Mentor', remarks: 'On time' },
  { id: 'att-10', date: '2026-07-27', day: 'Monday', className: 'Web Development', session: 'Git Workflow & Branching Strategies', status: 'present', checkIn: '09:50 AM', checkOut: '12:00 PM', markedBy: 'Admin / Mentor', remarks: 'On time' },
  { id: 'att-11', date: '2026-07-24', day: 'Friday', className: 'Web Development', session: 'Tailwind CSS v4 Utility Architecture', status: 'present', checkIn: '09:55 AM', checkOut: '12:00 PM', markedBy: 'Admin / Mentor', remarks: 'On time' },
  { id: 'att-12', date: '2026-07-23', day: 'Thursday', className: 'Web Development', session: 'React Hooks & Custom Hook Creation', status: 'present', checkIn: '09:51 AM', checkOut: '12:00 PM', markedBy: 'Admin / Mentor', remarks: 'On time' },
  { id: 'att-13', date: '2026-07-22', day: 'Wednesday', className: 'Web Development', session: 'Context API & State Management', status: 'present', checkIn: '09:53 AM', checkOut: '12:00 PM', markedBy: 'Admin / Mentor', remarks: 'On time' },
  { id: 'att-14', date: '2026-07-21', day: 'Tuesday', className: 'Web Development', session: 'REST Client & Axios Interceptors', status: 'present', checkIn: '09:49 AM', checkOut: '12:00 PM', markedBy: 'Admin / Mentor', remarks: 'On time' },
  { id: 'att-15', date: '2026-07-20', day: 'Monday', className: 'Web Development', session: 'JWT Token Storage & Refresh Flows', status: 'absent', checkIn: '—', checkOut: '—', markedBy: 'Admin System', remarks: 'Not attended' },

  // June 2026
  { id: 'att-16', date: '2026-06-30', day: 'Tuesday', className: 'Web Development', session: 'Web Fundamentals & Browser DOM', status: 'present', checkIn: '09:50 AM', checkOut: '12:00 PM', markedBy: 'Admin / Mentor', remarks: 'On time' },
  { id: 'att-17', date: '2026-06-29', day: 'Monday', className: 'Web Development', session: 'HTTP Protocol & Status Codes', status: 'present', checkIn: '09:56 AM', checkOut: '12:00 PM', markedBy: 'Admin / Mentor', remarks: 'On time' },
  { id: 'att-18', date: '2026-06-26', day: 'Friday', className: 'Web Development', session: 'Command Line & Developer Tools', status: 'present', checkIn: '09:52 AM', checkOut: '12:00 PM', markedBy: 'Admin / Mentor', remarks: 'On time' },
  { id: 'att-19', date: '2026-06-25', day: 'Thursday', className: 'Web Development', session: 'MERN Stack Overview & Setup', status: 'leave', checkIn: '—', checkOut: '—', markedBy: 'Mentor (Approved)', remarks: 'Family event leave' },
  { id: 'att-20', date: '2026-06-24', day: 'Wednesday', className: 'Web Development', session: 'Cohort Orientation & Guidelines', status: 'present', checkIn: '09:45 AM', checkOut: '12:00 PM', markedBy: 'Admin / Mentor', remarks: 'On time' },
];

export const studentAttendanceService = {
  getStudentAttendanceData: async ({
    year = '2026',
    month = 'All',
    status = 'All',
    search = '',
    page = 1,
    limit = 10,
  } = {}) => {
    // Simulate lightweight API response
    await new Promise((resolve) => setTimeout(resolve, 150));

    let records = [...MOCK_STUDENT_ATTENDANCE_RECORDS];

    // Filter by Year
    if (year !== 'All') {
      records = records.filter((r) => r.date.startsWith(year));
    }

    // Filter by Month
    if (month !== 'All') {
      const monthNumberMap = {
        January: '01', February: '02', March: '03', April: '04',
        May: '05', June: '06', July: '07', August: '08',
        September: '09', October: '10', November: '11', December: '12',
      };
      const mStr = monthNumberMap[month];
      if (mStr) {
        records = records.filter((r) => r.date.substring(5, 7) === mStr);
      }
    }

    // Filter by Status
    if (status !== 'All') {
      records = records.filter((r) => r.status.toLowerCase() === status.toLowerCase());
    }

    // Filter by Search Query
    if (search.trim()) {
      const q = search.toLowerCase();
      records = records.filter(
        (r) =>
          r.session.toLowerCase().includes(q) ||
          r.className.toLowerCase().includes(q) ||
          r.day.toLowerCase().includes(q) ||
          r.remarks.toLowerCase().includes(q) ||
          r.date.includes(q)
      );
    }

    // Compute Summary Stats from entire dataset
    const totalClasses = MOCK_STUDENT_ATTENDANCE_RECORDS.length;
    const presentCount = MOCK_STUDENT_ATTENDANCE_RECORDS.filter((r) => r.status === 'present').length;
    const absentCount = MOCK_STUDENT_ATTENDANCE_RECORDS.filter((r) => r.status === 'absent').length;
    const leaveCount = MOCK_STUDENT_ATTENDANCE_RECORDS.filter((r) => r.status === 'leave').length;
    const attendanceRate = totalClasses > 0 ? Math.round((presentCount / totalClasses) * 100) : 0;

    // Performance Status Category
    let performanceCategory = 'Excellent';
    let performanceColor = '#21C65C';
    if (attendanceRate >= 90) {
      performanceCategory = 'Excellent Attendance';
      performanceColor = '#57BA7F';
    } else if (attendanceRate >= 75) {
      performanceCategory = 'Good Attendance';
      performanceColor = '#0284C7';
    } else if (attendanceRate >= 60) {
      performanceCategory = 'Needs Improvement';
      performanceColor = '#DAA622';
    } else {
      performanceCategory = 'Critical Attendance Warning';
      performanceColor = '#DE646D';
    }

    // Trend Data for Monthly Bar/Line Charts
    const trendData = [
      { month: 'Jun', present: 4, absent: 0, leave: 1 },
      { month: 'Jul', present: 9, absent: 1, leave: 0 },
      { month: 'Aug', present: 3, absent: 1, leave: 1 },
    ];

    // Pagination Calculation
    const totalRecords = records.length;
    const startIndex = (page - 1) * limit;
    const paginatedRecords = records.slice(startIndex, startIndex + limit);

    return {
      summary: {
        totalClasses: 50, // total curriculum sessions
        recordedSessions: totalClasses,
        present: presentCount + 24, // total 46 present
        absent: absentCount, // 2 absent
        leave: leaveCount, // 2 leave
        attendanceRate: 92, // 46/50 = 92%
        performanceCategory: 'Excellent Attendance',
        performanceColor: '#57BA7F',
      },
      trendData,
      records: paginatedRecords,
      allRecords: records,
      pagination: {
        page,
        limit,
        totalRecords,
        totalPages: Math.ceil(totalRecords / limit) || 1,
      },
    };
  },
};

export default studentAttendanceService;
