import { Router } from 'express';
import { register, login, getMe } from '../controllers/auth.controller.js';
import verifyToken from '../middlewares/verify-token.js';
import validateRequest from '../middlewares/validate-request.js';
import { registerValidator, loginValidator } from '../validators/auth-validator.js';
import upload from '../middlewares/multer.js';

const router = Router();

router.post('/register', upload.single('profileImage'), registerValidator, validateRequest, register);
router.post('/login', loginValidator, validateRequest, login);
router.get('/me', verifyToken, getMe);

export default router;
