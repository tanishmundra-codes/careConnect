import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Counselor from '../Backend/models/counsellor.js';

dotenv.config();

const counselors = [
  {
    name: 'Dr. Sarah Johnson',
    specialization: 'Anxiety & Depression',
    experience: '8 years',
    rating: 4.9,
    availability: 'Available today',
    image: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    name: 'Dr. Michael Chen',
    specialization: 'Academic Stress & ADHD',
    experience: '6 years',
    rating: 4.8,
    availability: 'Available tomorrow',
    image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    name: 'Dr. Emily Rodriguez',
    specialization: 'Trauma & PTSD',
    experience: '10 years',
    rating: 4.9,
    availability: 'Available this week',
    image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connected for seeding...');

    // ❌ We are removing this line for the first run
    // await Counselor.deleteMany({});
    // console.log('Existing counselors cleared.');

    // This will now be the first operation, which creates the collection
    await Counselor.insertMany(counselors);
    console.log('✅ Counselors have been successfully seeded!');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
    console.log('Database connection closed.');
  }
};

seedDB();

