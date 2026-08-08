// Load environment variables before any module reads process.env.
import 'dotenv/config';
import app from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT} (${process.env.NODE_ENV || 'development'})`);
    });

    // Graceful shutdown on unhandled rejections and termination signals.
    const shutdown = (signal) => {
      console.log(`\n${signal} received. Shutting down...`);
      server.close(() => process.exit(0));
    };
    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('unhandledRejection', (err) => {
      console.error('[unhandledRejection]', err);
      server.close(() => process.exit(1));
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
};

start();
