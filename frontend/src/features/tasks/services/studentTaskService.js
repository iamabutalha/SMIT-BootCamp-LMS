/**
 * Student Tasks Data & Service Layer
 * Manages task assignments, team tasks, submission payloads, and task details for students.
 */

export const INITIAL_STUDENT_TASKS = [
  {
    id: 'task-101',
    title: 'Build Authentication & Protected Routes System',
    description: 'Implement role-separated login pages for Admin and Student, RTK Query auth state hydration, and JWT token interceptors.',
    instructions: [
      'Implement separate /admin/login and /student/login entry routes.',
      'Enforce role validation in StudentProtectedRoute and AdminProtectedRoute guards.',
      'Set up Axios / RTK Query baseQuery authorization headers with LocalStorage token persistence.',
      'Push your complete source code repository to GitHub and submit the repo URL.',
    ],
    category: 'Frontend Development',
    priority: 'High',
    status: 'In Progress',
    assignedDate: '2026-08-01',
    dueDate: '2026-08-18',
    assignmentType: 'Individual',
    team: 'Team Alpha',
    cohort: 'MERN Stack — Batch 12',
    assignedBy: 'Ali Khan (Lead Instructor)',
    progress: 75,
    submission: null,
  },
  {
    id: 'task-102',
    title: 'Express REST API & Controller Architecture',
    description: 'Design and deploy REST API routes for cohort teams, student registration, and attendance logging.',
    instructions: [
      'Create Express controller handlers for GET, POST, and PATCH endpoints.',
      'Implement global error-handling middleware with 4-parameter (err, req, res, next) signature.',
      'Validate request body parameters using Zod or Joi schemas.',
      'Deploy backend service to Vercel/Render and submit live deployment URL.',
    ],
    category: 'Backend Architecture',
    priority: 'Medium',
    status: 'Submitted',
    assignedDate: '2026-07-28',
    dueDate: '2026-08-15',
    assignmentType: 'Team',
    team: 'Team Alpha',
    cohort: 'MERN Stack — Batch 12',
    assignedBy: 'Sara Ahmed (Senior Mentor)',
    progress: 100,
    submission: {
      githubUrl: 'https://github.com/saylani-bootcamp/express-api-cohort12',
      deploymentUrl: 'https://api-cohort12.onrender.com',
      comments: 'All 8 REST endpoints tested with Postman and deployed successfully.',
      submittedAt: '2026-08-11 04:30 PM',
    },
  },
  {
    id: 'task-103',
    title: 'MongoDB Schemas & Mongoose Aggregation Pipelines',
    description: 'Construct optimized Mongoose database models and complex multi-stage aggregation queries for student metrics.',
    instructions: [
      'Define Mongoose schema models for Students, Quizzes, Attempts, and Cohorts.',
      'Create $match, $group, and $lookup aggregation pipelines for score distribution stats.',
      'Write database seed scripts for local environment testing.',
    ],
    category: 'Database Architecture',
    priority: 'High',
    status: 'Overdue',
    assignedDate: '2026-07-20',
    dueDate: '2026-08-08',
    assignmentType: 'Team',
    team: 'Team Alpha',
    cohort: 'MERN Stack — Batch 12',
    assignedBy: 'Usman Ghani (Database Mentor)',
    progress: 40,
    submission: null,
  },
  {
    id: 'task-104',
    title: 'Tailwind CSS v4 Design System & UI Components',
    description: 'Build reusable UI component library including Buttons, Inputs, Cards, Badges, Modals, and Skeletons.',
    instructions: [
      'Follow SMIT brand color palette contract (#006B3C, #21C75D, #E8F7DF, #F8F9FB).',
      'Forward native HTML props correctly to prevent DOM attribute warnings.',
      'Ensure 100% responsive design across Mobile, Tablet, and Desktop breakpoints.',
    ],
    category: 'UI/UX Design Systems',
    priority: 'Low',
    status: 'Completed',
    assignedDate: '2026-07-10',
    dueDate: '2026-08-05',
    assignmentType: 'Cohort',
    team: 'Team Alpha',
    cohort: 'MERN Stack — Batch 12',
    assignedBy: 'Fatima Noor (Design Lead)',
    progress: 100,
    submission: {
      githubUrl: 'https://github.com/saylani-bootcamp/lms-ui-components',
      deploymentUrl: 'https://lms-design-system.vercel.app',
      comments: 'Component library approved and integrated into core app.',
      submittedAt: '2026-08-04 11:00 AM',
    },
  },
  {
    id: 'task-105',
    title: 'Redux Toolkit Store Hydration & RTK Query Caching',
    description: 'Set up global Redux store, RTK Query baseApi injection, and tag invalidation strategies for quizzes.',
    instructions: [
      'Configure Redux store in src/app/store/index.js with devTools enabled.',
      'Inject feature endpoints for quizzes and teachers extending baseApi.',
      'Set up tag invalidation on create, update, duplicate, and delete mutations.',
    ],
    category: 'Frontend Development',
    priority: 'Medium',
    status: 'Pending',
    assignedDate: '2026-08-05',
    dueDate: '2026-08-22',
    assignmentType: 'Individual',
    team: 'Team Alpha',
    cohort: 'MERN Stack — Batch 12',
    assignedBy: 'Ali Khan (Lead Instructor)',
    progress: 0,
    submission: null,
  },
];

let tasksStore = [...INITIAL_STUDENT_TASKS];

export const studentTaskService = {
  getStudentTasks: async ({
    studentId = '1',
    tab = 'All',
    status = 'All',
    priority = 'All',
    assignmentType = 'All',
    search = '',
    sortBy = 'Due Soon',
  } = {}) => {
    // Simulate lightweight API response
    await new Promise((resolve) => setTimeout(resolve, 150));

    let filtered = [...tasksStore];

    // Tab Filtering
    if (tab === 'My Tasks') {
      filtered = filtered.filter((t) => t.assignmentType === 'Individual');
    } else if (tab === 'Team Tasks') {
      filtered = filtered.filter((t) => t.assignmentType === 'Team' || t.assignmentType === 'Cohort');
    } else if (tab === 'Completed') {
      filtered = filtered.filter((t) => t.status === 'Completed' || t.status === 'Submitted');
    } else if (tab === 'Overdue') {
      filtered = filtered.filter((t) => t.status === 'Overdue');
    }

    // Status Filter
    if (status !== 'All') {
      filtered = filtered.filter((t) => t.status.toLowerCase() === status.toLowerCase());
    }

    // Priority Filter
    if (priority !== 'All') {
      filtered = filtered.filter((t) => t.priority.toLowerCase() === priority.toLowerCase());
    }

    // Assignment Type Filter
    if (assignmentType !== 'All') {
      filtered = filtered.filter((t) => t.assignmentType.toLowerCase() === assignmentType.toLowerCase());
    }

    // Search Query
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.team.toLowerCase().includes(q)
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      if (sortBy === 'Due Soon') return new Date(a.dueDate) - new Date(b.dueDate);
      if (sortBy === 'Newest') return new Date(b.assignedDate) - new Date(a.assignedDate);
      if (sortBy === 'Oldest') return new Date(a.assignedDate) - new Date(b.assignedDate);
      if (sortBy === 'Priority') {
        const pMap = { High: 3, Medium: 2, Low: 1 };
        return pMap[b.priority] - pMap[a.priority];
      }
      return 0;
    });

    // Dynamic Summary Stats Calculation
    const total = tasksStore.length;
    const completed = tasksStore.filter((t) => t.status === 'Completed').length;
    const inProgress = tasksStore.filter((t) => t.status === 'In Progress').length;
    const submitted = tasksStore.filter((t) => t.status === 'Submitted').length;
    const pending = tasksStore.filter((t) => t.status === 'Pending').length;
    const overdue = tasksStore.filter((t) => t.status === 'Overdue').length;

    return {
      items: filtered,
      summary: {
        total,
        completed,
        inProgress,
        submitted,
        pending,
        overdue,
      },
    };
  },

  getTaskById: async (taskId) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const task = tasksStore.find((t) => t.id === taskId);
    if (!task) return null;
    return { ...task };
  },

  submitTaskAttempt: async (taskId, submissionData, studentInfo = {}) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const index = tasksStore.findIndex((t) => t.id === taskId);
    if (index === -1) throw new Error('Task not found');

    const updatedTask = {
      ...tasksStore[index],
      status: 'Submitted',
      progress: 100,
      submission: {
        githubUrl: submissionData.githubUrl || '',
        deploymentUrl: submissionData.deploymentUrl || '',
        comments: submissionData.comments || '',
        submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        studentName: studentInfo.name || 'Muhammad Hamza',
      },
    };

    tasksStore[index] = updatedTask;
    return updatedTask;
  },
};

export default studentTaskService;
