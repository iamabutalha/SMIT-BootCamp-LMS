import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';

import apiRoutes from './routes/index.js';
import notFound from './middlewares/not-found.js';
import errorHandler from './middlewares/error-handler.js';

const app = express();

// --- Security & core middleware ---------------------------------------------
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(',') || '*',
    credentials: true,
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(hpp());
app.use(compression());

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

// Basic global rate limit to blunt brute-force / abuse.
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many requests, please try again later' },
  })
);

// --- Routes -----------------------------------------------------------------
app.get('/', (_req, res) => {
  res.json({ success: true, message: 'SMIT Bootcamp LMS API', data: { version: 'v1' } });
});

app.use('/api/v1', apiRoutes);

// --- Error handling (must be last) ------------------------------------------
app.use(notFound);
app.use(errorHandler);

export default app;
