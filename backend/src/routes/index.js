import { Router } from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';

const router = Router();

// Health check — handy for uptime monitors and deploy smoke tests.
router.get('/health', (_req, res) => {
  res.json({ success: true, message: 'API is healthy', data: { uptime: process.uptime() } });
});

// Ali Jan — Auth & Users
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

// Faisal — add cohort & task routers here:
// router.use('/cohorts', cohortRoutes);
// router.use('/tasks', taskRoutes);

// Abu Talha — add attendance & submission routers here:
// router.use('/attendance', attendanceRoutes);
// router.use('/submissions', submissionRoutes);

export default router;
