import mongoose from 'mongoose';

let isConnected = false;

const dbConnect = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'resumeBuilder',
    });

    isConnected = true;
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error(' MongoDB connection failed:', error);
    throw error;
  }
};

export default dbConnect;
