import asyncHandler from '../middlewares/async-handler.js';
import ApiError from '../utils/api-error.js';
import { sendSuccess, buildPaginated } from '../utils/api-response.js';
import * as userService from '../services/user-service.js';

/**
 * POST /api/v1/users — ADMIN
 * Admin creates a user with any role.
 */
export const createUser = asyncHandler(async (req, res) => {
  const data = await userService.createUser(req.body);
  return sendSuccess(res, { statusCode: 201, message: 'User created', data });
});

/**
 * GET /api/v1/users — ADMIN
 * List users with filters + pagination.
 */
export const listUsers = asyncHandler(async (req, res) => {
  const { role, cohortId } = req.query;
  const page = req.query.page || 1;
  const limit = req.query.limit || 20;

  const { items, total } = await userService.listUsers({ role, cohortId, page, limit });
  return sendSuccess(res, {
    message: 'Users fetched',
    data: buildPaginated(items, { page, limit, total }),
  });
});

/**
 * GET /api/v1/users/:id — ADMIN or the user themselves
 */
export const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // A non-admin may only read their own record.
  if (req.user.role !== 'ADMIN' && req.user._id.toString() !== id) {
    throw ApiError.forbidden('You can only view your own profile');
  }

  const data = await userService.getUserById(id);
  return sendSuccess(res, { message: 'User fetched', data });
});

/**
 * PATCH /api/v1/users/:id — ADMIN
 */
export const updateUser = asyncHandler(async (req, res) => {
  const data = await userService.updateUser(req.params.id, req.body);
  return sendSuccess(res, { message: 'User updated', data });
});

/**
 * PATCH /api/v1/users/:id/role — ADMIN
 */
export const updateUserRole = asyncHandler(async (req, res) => {
  const data = await userService.updateUserRole(req.params.id, req.body.role);
  return sendSuccess(res, { message: 'User role updated', data });
});

/**
 * DELETE /api/v1/users/:id — ADMIN
 * Soft delete.
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const data = await userService.softDeleteUser(req.params.id);
  return sendSuccess(res, { message: 'User deactivated', data });
});


/**
 * PATCH /api/v1/users/:id/profile-image
 * User can update their own profile image OR Admin can update any user's image.
 */
export const updateProfileImage = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Authorization Check: Non-Admin can only update their own profile
  if (req.user.role !== 'ADMIN' && req.user._id.toString() !== id) {
    throw ApiError.forbidden('You can only update your own profile image');
  }

  // File Validation Check
  if (!req.file) {
    throw ApiError.badRequest('Please upload an image file');
  }

  // Call Service Layer
  const data = await userService.updateUserProfileImage(id, req.file.buffer);

  return sendSuccess(res, {
    message: 'Profile image updated successfully',
    data,
  });
});