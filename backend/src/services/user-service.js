import User from '../models/user-model.js';
import ApiError from '../utils/api-error.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';

/**
 * Admin-creates a user with any role.
 * @param {object} input - name, email, password, role?, phone?, cohortId?
 * @returns {Promise<object>} the created user (without password)
 */
export const createUser = async ({ name, email, password, role, phone, cohortId }) => {
  const exists = await User.findOne({ email });
  if (exists) {
    throw ApiError.conflict('Email already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role || 'STUDENT',
    phone: phone || null,
    cohortId: cohortId || null,
  });

  return user.toJSON();
};

/**
 * Lists users with optional role/cohort filters and pagination.
 * @param {{ role?: string, cohortId?: string, page?: number, limit?: number }} query
 * @returns {Promise<{ items: object[], total: number, page: number, limit: number }>}
 */
export const listUsers = async ({ role, cohortId, page = 1, limit = 20 }) => {
  const filter = {};
  if (role) filter.role = role;
  if (cohortId) filter.cohortId = cohortId;

  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    User.countDocuments(filter),
  ]);

  return { items: items.map((u) => u.toJSON()), total, page, limit };
};

/**
 * Fetches a single user by id.
 * @param {string} id
 * @returns {Promise<object>}
 */
export const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) throw ApiError.notFound('User not found');
  return user.toJSON();
};

const UPDATABLE_FIELDS = ['name', 'phone', 'role', 'cohortId', 'isActive'];

/**
 * Updates whitelisted fields on a user.
 * @param {string} id
 * @param {object} updates
 * @returns {Promise<object>}
 */
export const updateUser = async (id, updates) => {
  const user = await User.findById(id);
  if (!user) throw ApiError.notFound('User not found');

  for (const key of UPDATABLE_FIELDS) {
    if (updates[key] !== undefined) {
      user[key] = updates[key];
    }
  }

  await user.save();
  return user.toJSON();
};

/**
 * Changes only a user's role.
 * @param {string} id
 * @param {string} role
 * @returns {Promise<object>}
 */
export const updateUserRole = async (id, role) => {
  const user = await User.findByIdAndUpdate(id, { role }, { new: true, runValidators: true });
  if (!user) throw ApiError.notFound('User not found');
  return user.toJSON();
};

/**
 * Soft-deletes a user (sets isActive: false).
 * @param {string} id
 * @returns {Promise<{ _id: string }>}
 */
export const softDeleteUser = async (id) => {
  const user = await User.findByIdAndUpdate(id, { isActive: false }, { new: true });
  if (!user) throw ApiError.notFound('User not found');
  return { _id: user._id.toString() };
};


/**
 * Upload & Update Profile Image
 */
export const updateUserProfileImage = async (userId, fileBuffer) => {
  const user = await User.findById(userId);
  if (!user) {
    throw ApiError.notFound('User not found');
  }

  // Step 1: Purani image ko Cloudinary se safe delete karna
  if (user.profileImage && user.profileImage.publicId) {
    await deleteFromCloudinary(user.profileImage.publicId);
  }

  // Step 2: Nayi image Cloudinary par upload karna
  const uploadResult = await uploadToCloudinary(fileBuffer, 'saylani-lms/profiles');

  // Step 3: DB record update karna
  user.profileImage = {
    url: uploadResult.url,
    publicId: uploadResult.publicId,
  };

  await user.save();
  return user;
};