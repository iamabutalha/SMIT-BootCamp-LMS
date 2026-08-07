import asyncHandler from './async-handler.js';
import ApiError from '../utils/api-error.js';
import { verifyJwt } from '../utils/generate-token.js';
import User from '../models/user-model.js';

/**
 * Authentication middleware.
 * Verifies the `Authorization: Bearer <token>` header, loads the user, and
 * attaches it to `req.user`. Rejects with 401 if missing/invalid/inactive.
 *
 * The whole team imports this to protect their routes.
 */
const verifyToken = asyncHandler(async (req, _res, next) => {
  const header = req.headers.authorization || '';

  if (!header.startsWith('Bearer ')) {
    throw ApiError.unauthorized('No token provided');
  }

  const token = header.slice(7).trim();
  const decoded = verifyJwt(token); // throws -> handled as 401 in errorHandler

  const user = await User.findById(decoded.id);
  if (!user || !user.isActive) {
    throw ApiError.unauthorized('User no longer exists or is inactive');
  }

  req.user = user;
  next();
});

export default verifyToken;
