require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const seedAdmin = async () => {
  try {
    console.log('Connecting to MongoDB at:', process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log('DB Connected successfully!');

    const exists = await User.findOne({ email: 'admin@doctor.com' });
    if (exists) {
      console.log('Admin already exists');
      process.exit(0);
    }
    await User.create({
      name: 'Admin',
      email: 'admin@doctor.com',
      password: 'admin123',
    });
    console.log('Admin created: admin@doctor.com / admin123');
    process.exit(0);
  } catch (error) {
    console.error('MongoDB connection Error:', error.message);
    process.exit(1);
  }
};

seedAdmin().catch((e) => {
  console.error(e);
  process.exit(1);
});