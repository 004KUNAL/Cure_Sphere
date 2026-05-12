const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Enable CORS - Move to top
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    const allowedOrigins = process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : [];
    const currentOrigin = origin.toLowerCase();
    const isVercel = currentOrigin.endsWith('.vercel.app');
    if (isVercel || allowedOrigins.includes(origin) || allowedOrigins.includes('*') || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Security headers
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

// Static folder
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const authRoutes = require('./routes/authRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const postRoutes = require('./routes/postRoutes');
const messageRoutes = require('./routes/messageRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const orderRoutes = require('./routes/orderRoutes');
const emergencyRoutes = require('./routes/emergencyRoutes');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/emergency', emergencyRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('CureSphere API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
