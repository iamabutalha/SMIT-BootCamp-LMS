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
    TASKS: '/student/tasks',
    ATTENDANCE: '/student/attendance',
    PROFILE: '/student/profile',
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
    USERS: '/admin/users',
    STUDENTS: '/admin/students',
    COHORTS: '/admin/cohorts',
    ATTENDANCE: '/admin/attendance',
    TASKS: '/admin/tasks',
    PROFILE: '/admin/profile',
  }),
});
