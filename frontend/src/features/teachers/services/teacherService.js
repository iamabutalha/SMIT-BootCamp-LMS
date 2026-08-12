/**
 * Teacher & Mentor Data Service Layer
 * Manages teacher profiles, course assignments, student analytics, and assigned quiz statistics.
 */

export const INITIAL_TEACHERS = [
  {
    id: 't-1',
    name: 'Ali Khan',
    email: 'ali.khan@saylani.org',
    role: 'Lead Full-Stack Instructor',
    specialization: 'Full-Stack Development (MERN)',
    status: 'Active',
    joinedDate: '2025-03-15',
    avatar: '',
    phone: '+92 300 1234567',
    bio: 'Senior Software Engineer with 8+ years experience in React, Node.js, and cloud microservices.',
    assignedStudentsCount: 64,
    assignedCoursesCount: 2,
    quizzesCount: 8,
    avgStudentPerformance: 88,
    courses: [
      { id: 'c-1', name: 'Web & Mobile App Development', batch: 'Batch 10', studentsCount: 42, tasksCount: 18, quizzesCount: 5, avgPerformance: 90, status: 'Active' },
      { id: 'c-2', name: 'Advanced React & Redux Toolkit', batch: 'Batch 9', studentsCount: 22, tasksCount: 12, quizzesCount: 3, avgPerformance: 84, status: 'Active' },
    ],
    quizzes: [
      { id: 'q-1', title: 'JavaScript Fundamentals & ES6+', course: 'Web & Mobile Dev', questionsCount: 5, attemptsCount: 84, avgScore: 82, status: 'Published' },
      { id: 'q-3', title: 'Node.js, Express & REST API Architecture', course: 'Web & Mobile Dev', questionsCount: 2, attemptsCount: 1, avgScore: 100, status: 'Published' },
    ],
    performanceTrend: [
      { month: 'Mar', avgScore: 82, attendance: 90 },
      { month: 'Apr', avgScore: 84, attendance: 92 },
      { month: 'May', avgScore: 86, attendance: 91 },
      { month: 'Jun', avgScore: 87, attendance: 94 },
      { month: 'Jul', avgScore: 88, attendance: 95 },
      { month: 'Aug', avgScore: 88, attendance: 93 },
    ],
  },
  {
    id: 't-2',
    name: 'Sara Ahmed',
    email: 'sara.ahmed@saylani.org',
    role: 'Senior React Specialist',
    specialization: 'Frontend Architecture & Redux',
    status: 'Active',
    joinedDate: '2025-06-01',
    avatar: '',
    phone: '+92 301 9876543',
    bio: 'Frontend Architect specializing in scalable React design systems, Vite, and State Management.',
    assignedStudentsCount: 48,
    assignedCoursesCount: 1,
    quizzesCount: 4,
    avgStudentPerformance: 85,
    courses: [
      { id: 'c-3', name: 'Frontend Web Engineering', batch: 'Batch 10', studentsCount: 48, tasksCount: 14, quizzesCount: 4, avgPerformance: 85, status: 'Active' },
    ],
    quizzes: [
      { id: 'q-2', title: 'React State Management & Redux Toolkit', course: 'Web & Mobile Dev', questionsCount: 4, attemptsCount: 2, avgScore: 88, status: 'Published' },
    ],
    performanceTrend: [
      { month: 'May', avgScore: 80, attendance: 88 },
      { month: 'Jun', avgScore: 83, attendance: 89 },
      { month: 'Jul', avgScore: 85, attendance: 91 },
      { month: 'Aug', avgScore: 85, attendance: 92 },
    ],
  },
  {
    id: 't-3',
    name: 'Usman Ghani',
    email: 'usman.ghani@saylani.org',
    role: 'Database & Backend Lead',
    specialization: 'Database Systems & Node.js',
    status: 'Active',
    joinedDate: '2025-08-10',
    avatar: '',
    phone: '+92 302 5551234',
    bio: 'Database Administrator and backend architect experienced in MongoDB aggregations and SQL indexing.',
    assignedStudentsCount: 35,
    assignedCoursesCount: 1,
    quizzesCount: 3,
    avgStudentPerformance: 80,
    courses: [
      { id: 'c-4', name: 'Backend Engineering & MongoDB', batch: 'Batch 10', studentsCount: 35, tasksCount: 10, quizzesCount: 3, avgPerformance: 80, status: 'Active' },
    ],
    quizzes: [
      { id: 'q-4', title: 'MongoDB Schemas & Aggregation Pipelines', course: 'Web & Mobile Dev', questionsCount: 1, attemptsCount: 0, avgScore: 0, status: 'Draft' },
    ],
    performanceTrend: [
      { month: 'Jun', avgScore: 78, attendance: 85 },
      { month: 'Jul', avgScore: 79, attendance: 87 },
      { month: 'Aug', avgScore: 80, attendance: 88 },
    ],
  },
  {
    id: 't-4',
    name: 'Fatima Noor',
    email: 'fatima.noor@saylani.org',
    role: 'UI/UX Design Instructor',
    specialization: 'UI/UX Design & CSS Architecture',
    status: 'Inactive',
    joinedDate: '2025-01-20',
    avatar: '',
    phone: '+92 303 7778899',
    bio: 'Product Designer with focus on Figma design systems, responsive web interfaces, and accessibility.',
    assignedStudentsCount: 20,
    assignedCoursesCount: 1,
    quizzesCount: 2,
    avgStudentPerformance: 92,
    courses: [
      { id: 'c-5', name: 'UI/UX Design Fundamentals', batch: 'Batch 8', studentsCount: 20, tasksCount: 8, quizzesCount: 2, avgPerformance: 92, status: 'Completed' },
    ],
    quizzes: [
      { id: 'q-5', title: 'CSS Grid, Flexbox & Responsive Layouts', course: 'UI/UX Design', questionsCount: 1, attemptsCount: 1, avgScore: 100, status: 'Published' },
    ],
    performanceTrend: [
      { month: 'Jan', avgScore: 88, attendance: 90 },
      { month: 'Feb', avgScore: 90, attendance: 93 },
      { month: 'Mar', avgScore: 92, attendance: 95 },
    ],
  },
];

let teachersStore = [...INITIAL_TEACHERS];

export const teacherService = {
  getTeachers: ({ search = '', status = 'All', specialization = 'All', sortBy = 'Name' } = {}) => {
    let filtered = [...teachersStore];

    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.email.toLowerCase().includes(q) ||
          t.specialization.toLowerCase().includes(q) ||
          t.role.toLowerCase().includes(q)
      );
    }

    if (status !== 'All') {
      filtered = filtered.filter((t) => t.status.toLowerCase() === status.toLowerCase());
    }

    if (specialization !== 'All') {
      filtered = filtered.filter((t) => t.specialization.toLowerCase().includes(specialization.toLowerCase()));
    }

    // Sorting
    filtered.sort((a, b) => {
      if (sortBy === 'Name') return a.name.localeCompare(b.name);
      if (sortBy === 'Students') return b.assignedStudentsCount - a.assignedStudentsCount;
      if (sortBy === 'Courses') return b.assignedCoursesCount - a.assignedCoursesCount;
      if (sortBy === 'Recently Joined') return new Date(b.joinedDate) - new Date(a.joinedDate);
      return 0;
    });

    // Compute dynamic aggregate stats
    const totalTeachers = teachersStore.length;
    const activeTeachers = teachersStore.filter((t) => t.status === 'Active').length;
    const totalCourses = teachersStore.reduce((acc, t) => acc + t.assignedCoursesCount, 0);
    const totalStudents = teachersStore.reduce((acc, t) => acc + t.assignedStudentsCount, 0);
    const avgPerformance =
      teachersStore.length > 0
        ? Math.round(teachersStore.reduce((acc, t) => acc + t.avgStudentPerformance, 0) / teachersStore.length)
        : 0;

    return {
      items: filtered,
      summary: {
        totalTeachers,
        activeTeachers,
        totalCourses,
        totalStudents,
        avgPerformance,
      },
    };
  },

  getTeacherById: (teacherId) => {
    if (!teacherId) return teachersStore[0];
    const key = String(teacherId).toLowerCase().trim();

    const found = teachersStore.find((t) => {
      const idStr = String(t.id || '').toLowerCase();
      const altIdStr = t._id ? String(t._id).toLowerCase() : '';
      return (
        idStr === key ||
        altIdStr === key ||
        key === idStr.replace('t-', '') ||
        idStr === `t-${key}`
      );
    });

    if (found) return found;

    return {
      ...teachersStore[0],
      id: teacherId,
      name: key.includes('ali') || key === 't-1' ? 'Ali Khan' : key.includes('sara') || key === 't-2' ? 'Sara Ahmed' : 'Ali Khan',
    };
  },

  updateTeacherStatus: (teacherId, newStatus) => {
    const teacher = teachersStore.find((t) => t.id === teacherId);
    if (!teacher) throw new Error('Teacher not found');
    teacher.status = newStatus;
    return teacher;
  },
};

export default teacherService;
