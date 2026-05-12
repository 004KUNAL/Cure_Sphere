const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'doctor', 'admin', 'vendor'],
    default: 'user'
  },
  bio: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
  },
  cover: {
    type: String,
    default: ''
  },
  isPrivate: {
    type: Boolean,
    default: false
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  phone: String,
  medicalId: {
    bloodGroup: { type: String, default: 'Not Set' },
    allergies: { type: String, default: 'None' },
    medications: { type: String, default: 'None' },
    emergencyContact: {
      name: { type: String, default: '' },
      phone: { type: String, default: '' },
      relationship: { type: String, default: '' }
    },
    chronicConditions: { type: String, default: 'None' }
  },
  vendorInfo: {
    upiId: { type: String, default: '' },
    upiQR: { type: String, default: '' },
    storeName: { type: String, default: '' },
    storeAddress: { type: String, default: '' }
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  otp: String,
  otpExpires: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function() {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
