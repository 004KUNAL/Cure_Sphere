const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Doctor = require('./models/Doctor');
const Medicine = require('./models/Medicine');
const Post = require('./models/Post');

dotenv.config();

const doctors = [
  {
    name: 'Dr. Sarah Johnson',
    email: 'sarah@example.com',
    password: 'password123',
    role: 'doctor',
    specialization: 'Cardiologist',
    experience: 12,
    about: 'Expert in heart health and cardiovascular surgeries with over 12 years of experience in top hospitals.',
    fees: 100,
  },
  {
    name: 'Dr. Michael Chen',
    email: 'michael@example.com',
    password: 'password123',
    role: 'doctor',
    specialization: 'Dermatologist',
    experience: 8,
    about: 'Specialist in skin treatments, laser surgeries, and cosmetic procedures for all skin types.',
    fees: 80,
  },
  {
    name: 'Dr. Elena Rodriguez',
    email: 'elena@example.com',
    password: 'password123',
    role: 'doctor',
    specialization: 'Pediatrician',
    experience: 15,
    about: 'Dedicated to providing comprehensive healthcare for children from infancy through adolescence.',
    fees: 70,
  },
  {
    name: 'Dr. James Wilson',
    email: 'james@example.com',
    password: 'password123',
    role: 'doctor',
    specialization: 'Neurologist',
    experience: 20,
    about: 'Leading expert in brain disorders, stroke recovery, and advanced neurological research.',
    fees: 150,
  }
];

const medicines = [
  {
    name: 'Amoxicillin 500mg',
    category: 'Antibiotics',
    description: 'Used to treat a wide variety of bacterial infections.',
    price: 15,
    stock: 100,
    requiresPrescription: true,
    manufacturer: 'HealthPharm',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=2060'
  },
  {
    name: 'Paracetamol 650mg',
    category: 'Pain Relief',
    description: 'Relieves pain and reduces fever.',
    price: 5,
    stock: 500,
    requiresPrescription: false,
    manufacturer: 'MediCare',
    image: 'https://images.unsplash.com/photo-1550572017-ed20015502d3?auto=format&fit=crop&q=80&w=2070'
  },
  {
    name: 'Vitamin C 1000mg',
    category: 'Supplements',
    description: 'Supports immune system and skin health.',
    price: 12,
    stock: 300,
    requiresPrescription: false,
    manufacturer: 'NatureCare',
    image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&q=80&w=2077'
  },
  {
    name: 'Metformin 500mg',
    category: 'Diabetes',
    description: 'Used with a proper diet and exercise program to control high blood sugar.',
    price: 20,
    stock: 200,
    requiresPrescription: true,
    manufacturer: 'GlucoGuard',
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=2070'
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');
    
    // Clear existing
    await User.deleteMany({ role: 'doctor' });
    await Doctor.deleteMany({});
    await Medicine.deleteMany({});

    for (let d of doctors) {
      const user = await User.create({
        name: d.name,
        email: d.email,
        password: d.password,
        role: 'doctor',
        isVerified: true
      });

      await Doctor.create({
        user: user._id,
        specialization: d.specialization,
        experience: d.experience,
        about: d.about,
        fees: d.fees,
        availability: [
          { day: 'Monday', slots: ['09:00', '10:00', '11:00'] },
          { day: 'Wednesday', slots: ['14:00', '15:00', '16:00'] },
          { day: 'Friday', slots: ['10:00', '12:00', '14:00'] }
        ],
        isVerified: true
      });
    }

    await Medicine.insertMany(medicines);
    console.log('Medicines Seeded!');

    // Get a user for posts
    const sampleUser = await User.findOne({ role: 'doctor' });
    if (sampleUser) {
      const posts = [
        {
          user: sampleUser._id,
          content: "Always remember to stay hydrated! Drinking at least 8 glasses of water a day can significantly improve your skin health and energy levels.",
          category: 'Health Tips',
          scope: 'public'
        },
        {
          user: sampleUser._id,
          content: "Discussing a recent case of rare autoimmune response. Has anyone seen similar symptoms in pediatric patients recently?",
          category: 'Case Discussion',
          scope: 'doctors-only'
        }
      ];
      await Post.insertMany(posts);
      console.log('Posts Seeded!');
    }

    console.log('Data Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error seeding data: ${error.message}`);
    process.exit(1);
  }
};

seedData();
