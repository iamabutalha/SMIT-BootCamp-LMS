/**
 * Role Constants for RBAC
 * Must match backend roles strictly (UPPERCASE per API_CONTRACT.md): ADMIN, MENTOR, STUDENT
 */
export const ROLES = Object.freeze({
  ADMIN: 'ADMIN',
  MENTOR: 'MENTOR',
  STUDENT: 'STUDENT',
});

export const ROLE_LABELS = Object.freeze({
  [ROLES.ADMIN]: 'Administrator',
  [ROLES.MENTOR]: 'Mentor',
  [ROLES.STUDENT]: 'Student',
});
