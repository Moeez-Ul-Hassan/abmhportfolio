require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = 'admin@example.com';
    const name = 'Admin User';
    const password = 'adminpass';

    const existing = await User.findOne({ email });
    if (existing) {
      console.log('Admin user already exists.');
      return process.exit(0);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      name,
      passwordHash,
    });

    await user.save();
    console.log('Admin user created:', email);
    process.exit(0);
  } catch (err) {
    console.error('Error creating admin user:', err.message);
    process.exit(1);
  }
};

run();
