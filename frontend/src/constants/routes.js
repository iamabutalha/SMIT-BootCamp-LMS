/**
 * Centralized Route Path Constants
 */
export const ROUTES = Object.freeze({
  ROOT: '/',
  DASHBOARD: '/dashboard',
  LOGIN: '/login',
  REGISTER: '/register',
  UNAUTHORIZED: '/unauthorized',
  NOT_FOUND: '/404',

  STUDENT: Object.freeze({
    ROOT: '/student',
    DASHBOARD: '/student',
    LOGIN: '/student/login',
    SIGNUP: '/student/signup',
    REGISTER: '/student/signup',
    TASKS: '/student/tasks',
    ATTENDANCE: '/student/attendance',
    PROFILE: '/student/profile',
    ASSIGNMENTS: '/student/assignments',
    QUIZZES: '/student/quizzes',
    QUIZ_DETAIL: (id) => `/student/quizzes/${id}`,
    QUIZ_ATTEMPT: (id) => `/student/quizzes/${id}/attempt`,
    QUIZ_RESULT: (id) => `/student/quizzes/${id}/result`,
  }),

  MENTOR: Object.freeze({
    ROOT: '/mentor',
    DASHBOARD: '/mentor',
    COHORTS: '/mentor/cohorts',
    ATTENDANCE: '/mentor/attendance',
    TASKS: '/mentor/tasks',
    SUBMISSIONS: '/mentor/submissions',
  }),

  ADMIN: Object.freeze({
    ROOT: '/admin',
    DASHBOARD: '/admin',
    LOGIN: '/admin/login',
    USERS: '/admin/users',
    STUDENTS: '/admin/students',
    COHORTS: '/admin/cohorts',
    TEAMS: '/admin/teams',
    ATTENDANCE: '/admin/attendance',
    TASKS: '/admin/tasks',
    PROFILE: '/admin/profile',
    QUIZZES: '/admin/quizzes',
    QUIZZES_CREATE: '/admin/quizzes/create',
    QUIZZES_DETAIL: (id) => `/admin/quizzes/${id}`,
    QUIZZES_EDIT: (id) => `/admin/quizzes/${id}/edit`,
    TEACHERS: '/admin/teachers',
    TEACHER_DETAIL: (id) => `/admin/teachers/${id}`,
    REPORTS: '/admin/reports',
  }),
});
