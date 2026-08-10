/**
 * Single Source of Truth for API Endpoint Paths
 * Strictly mapped to docs/API_CONTRACT.md
 */
export const ENDPOINTS = Object.freeze({
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
  },
  USERS: {
    BASE: '/users',
    BY_ID: (id) => `/users/${id}`,
    CHANGE_ROLE: (id) => `/users/${id}/role`,
  },
  COHORTS: {
    BASE: '/cohorts',
    BY_ID: (id) => `/cohorts/${id}`,
    ASSIGN_MENTOR: (id) => `/cohorts/${id}/assign-mentor`,
    STUDENTS: (id) => `/cohorts/${id}/students`,
    DASHBOARD: (id) => `/cohorts/${id}/dashboard`,
  },
  ATTENDANCE: {
    BASE: '/attendance',
    BY_ID: (id) => `/attendance/${id}`,
    BY_STUDENT: (studentId) => `/attendance/student/${studentId}`,
  },
  TASKS: {
    BASE: '/tasks',
    BY_ID: (id) => `/tasks/${id}`,
    SUBMISSIONS: (taskId) => `/tasks/${taskId}/submissions`,
    SUBMIT: (taskId) => `/tasks/${taskId}/submissions`,
  },
  SUBMISSIONS: {
    REVIEW: (id) => `/submissions/${id}/review`,
    BY_STUDENT: (studentId) => `/submissions/student/${studentId}`,
  },
  PROGRESS: {
    STUDENT: (id) => `/students/${id}/progress`,
  },
});
