// import mongoose from 'mongoose';

// /**
//  * Connects to MongoDB using Mongoose.
//  * Reads the connection string from `MONGODB_URI`.
//  * @returns {Promise<typeof mongoose>} the connected mongoose instance
//  */
// const connectDB = async () => {
//   const uri = process.env.MONGODB_URI;

//   if (!uri) {
//     throw new Error('MONGODB_URI is not defined in environment variables');
//   }

//   // Fail fast instead of buffering queries for 30s when the DB is unreachable.
//   mongoose.set('strictQuery', true);

//   const conn = await mongoose.connect(uri);
//   console.log(`MongoDB connected: ${conn.connection.host}`);
//   return conn;
// };

// export default connectDB;
