import { body, param, query } from 'express-validator';
import { ROLES } from '../models/user-model.js';

export const createUserValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('A valid email is required').normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('role').optional().isIn(ROLES).withMessage(`Role must be one of: ${ROLES.join(', ')}`),
  body('phone').optional({ values: 'falsy' }).trim(),
  body('cohortId').optional({ values: 'null' }).isMongoId().withMessage('Invalid cohortId'),
];

export const updateUserValidator = [
  param('id').isMongoId().withMessage('Invalid user id'),
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('phone').optional({ values: 'falsy' }).trim(),
  body('role').optional().isIn(ROLES).withMessage(`Role must be one of: ${ROLES.join(', ')}`),
  body('cohortId').optional({ values: 'null' }).isMongoId().withMessage('Invalid cohortId'),
  body('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),
];

export const updateRoleValidator = [
  param('id').isMongoId().withMessage('Invalid user id'),
  body('role').isIn(ROLES).withMessage(`Role must be one of: ${ROLES.join(', ')}`),
];

export const idParamValidator = [param('id').isMongoId().withMessage('Invalid user id')];

export const listUsersValidator = [
  query('role').optional().isIn(ROLES).withMessage(`Role must be one of: ${ROLES.join(', ')}`),
  query('cohortId').optional().isMongoId().withMessage('Invalid cohortId'),
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
];
