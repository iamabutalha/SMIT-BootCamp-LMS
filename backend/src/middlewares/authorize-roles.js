import ApiError from '../utils/api-error.js';

/**
 * Role-Based Access Control (RBAC) middleware factory.
 * Must run AFTER `verifyToken` (which sets `req.user`).
 *
 * Usage: `router.post('/', verifyToken, authorizeRoles('ADMIN'), handler)`
 *
 * @param {...('ADMIN'|'MENTOR'|'STUDENT')} allowedRoles
 * @returns {import('express').RequestHandler}
 */
const authorizeRoles =
  (...allowedRoles) =>
  (req, _res, next) => {
    if (!req.user) {
      return next(ApiError.unauthorized('Authentication required'));
    }
    if (!allowedRoles.includes(req.user.role)) {
      return next(ApiError.forbidden('You do not have permission to perform this action'));
    }
    return next();
  };

export default authorizeRoles;
