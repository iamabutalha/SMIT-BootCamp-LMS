import mongoose from 'mongoose';
import dns from 'dns';
import { env } from 'process';

dns.setServers(['8.8.8.8', '8.8.4.4']);
mongoose.set('bufferCommands', false);

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is missing.');
    }

    if (mongoose.connection.readyState === 1) {
      return;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
      minPoolSize: 2,
    });

    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Database Error] Connection failed: ${error.message}`);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('[Database Warning] MongoDB connection lost.');
});

mongoose.connection.on('error', (err) => {
  console.error(`[Database Error] Mongoose runtime error: ${err}`);
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('[Database] Connection closed due to app termination.');
  process.exit(0);
});

export default connectDB;