import User from '../models/user-model.js';
import ApiError from '../utils/api-error.js';
import { generateToken } from '../utils/generate-token.js';

/**
 * Registers a new STUDENT (public self-registration).
 * Role is always forced to STUDENT regardless of input.
 *
 * @param {{ name: string, email: string, password: string, phone?: string }} input
 * @returns {Promise<{ token: string, user: object }>}
 */
export const registerStudent = async ({ name, email, password, phone }) => {
  const exists = await User.findOne({ email });
  if (exists) {
    throw ApiError.conflict('Email already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    phone: phone || null,
    role: 'STUDENT',
  });

  const token = generateToken({ id: user._id.toString(), role: user.role });
  return { token, user: user.toJSON() };
};

/**
 * Authenticates a user by email + password.
 *
 * @param {{ email: string, password: string }} input
 * @returns {Promise<{ token: string, user: object }>}
 */
export const loginUser = async ({ email, password }) => {
  // Password is `select: false`, so explicitly include it here.
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    throw ApiError.unauthorized('Invalid email or password');
  }
  if (!user.isActive) {
    throw ApiError.forbidden('Account is inactive');
  }

  const token = generateToken({ id: user._id.toString(), role: user.role });
  return { token, user: user.toJSON() };
};
