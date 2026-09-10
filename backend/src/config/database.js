import mongoose from 'mongoose';
import { env } from './env.js';
import logger from '../shared/logger/logger.js';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI);
    console.log(`\nMongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
