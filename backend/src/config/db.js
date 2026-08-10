import mongoose from 'mongoose';
import dns from 'dns';

// Use Google DNS to bypass ISP DNS issues with MongoDB Atlas SRV records.
dns.setServers(['8.8.8.8', '8.8.4.4']);
mongoose.set('bufferCommands', false);

/**
 * Connects to MongoDB using Mongoose.
 * Reads the connection string from `MONGODB_URI`.
 * @returns {Promise<typeof mongoose>} the connected mongoose instance
 */
const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  // Fail fast instead of buffering queries for 30s when the DB is unreachable.
  mongoose.set('strictQuery', true);

  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  const conn = await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
    maxPoolSize: 10,
    minPoolSize: 2,
  });
  console.log(`MongoDB connected: ${conn.connection.host}`);
  return conn;
};

mongoose.connection.on('disconnected', () => {
  console.warn('[Database] MongoDB connection lost.');
});

mongoose.connection.on('error', (err) => {
  console.error('[Database] Mongoose error:', err);
});

export default connectDB;
