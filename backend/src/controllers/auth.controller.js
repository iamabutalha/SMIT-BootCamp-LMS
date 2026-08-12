import asyncHandler from '../middlewares/async-handler.js';
import { sendSuccess } from '../utils/api-response.js';
import * as authService from '../services/auth.service.js';

/**
 * POST /api/v1/auth/register — Public
 * Self-registration for students.
 */
export const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;
  const data = await authService.registerStudent({ name, email, password, phone, file: req.file });
  return sendSuccess(res, { statusCode: 201, message: 'Registered', data });
});

/**
 * POST /api/v1/auth/login — Public
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const data = await authService.loginUser({ email, password });
  return sendSuccess(res, { message: 'Logged in', data });
});

/**
 * GET /api/v1/auth/me — any logged-in user
 * `req.user` is set by verifyToken.
 */
export const getMe = asyncHandler(async (req, res) => {
  return sendSuccess(res, { message: 'Current user', data: req.user.toJSON() });
});
