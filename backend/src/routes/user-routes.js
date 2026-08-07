import { Router } from 'express';
import {
  createUser,
  listUsers,
  getUser,
  updateUser,
  updateUserRole,
  deleteUser,
} from '../controllers/user-controller.js';
import verifyToken from '../middlewares/verify-token.js';
import authorizeRoles from '../middlewares/authorize-roles.js';
import validateRequest from '../middlewares/validate-request.js';
import {
  createUserValidator,
  updateUserValidator,
  updateRoleValidator,
  idParamValidator,
  listUsersValidator,
} from '../validators/user-validator.js';

const router = Router();

// Every user route requires authentication.
router.use(verifyToken);

router.post('/', authorizeRoles('ADMIN'), createUserValidator, validateRequest, createUser);
router.get('/', authorizeRoles('ADMIN'), listUsersValidator, validateRequest, listUsers);

// Readable by ADMIN or the user themselves (ownership checked in the controller).
router.get('/:id', idParamValidator, validateRequest, getUser);

router.patch('/:id', authorizeRoles('ADMIN'), updateUserValidator, validateRequest, updateUser);
router.patch(
  '/:id/role',
  authorizeRoles('ADMIN'),
  updateRoleValidator,
  validateRequest,
  updateUserRole
);
router.delete('/:id', authorizeRoles('ADMIN'), idParamValidator, validateRequest, deleteUser);

export default router;
