const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

  } catch (error) {
    console.error('MongoDB connection error:', err.message);
    if (process.env.NODE_ENV !== 'production') process.exit(1);
  }
};

module.exports = connectDB;