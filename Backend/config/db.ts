
import mongoose from 'mongoose';

// Database Connection Function
export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect('mongodb://localhost:27017/Ecommerce_admin');

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
