const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  specialization: {
    type: String,
    required: [true, 'Please add a specialization']
  },
  experience: Number,
  about: String,
  fees: Number,
  clinicLocation: {
    address: String,
    city: String,
  },
  upiId: {
    type: String,
    default: ''
  },
  upiQR: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    default: 0
  },
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: String,
      rating: Number,
      comment: String,
      createdAt: { type: Date, default: Date.now }
    }
  ],
  availability: [
    {
      day: String,
      slots: [String]
    }
  ],
  isVerified: {
    type: Boolean,
    default: false
  },
  isOnline: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Doctor', DoctorSchema);
