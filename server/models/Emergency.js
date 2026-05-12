const mongoose = require('mongoose');

const emergencySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['cardiac', 'breathing', 'unconscious', 'bleeding', 'seizure', 'fever', 'other']
  },
  location: {
    lat: String,
    lng: String
  },
  status: {
    type: String,
    enum: ['pending', 'dispatched', 'arrived', 'completed', 'cancelled'],
    default: 'pending'
  },
  assignedUnit: {
    type: String,
    default: 'AMB-' + Math.floor(100 + Math.random() * 900)
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Emergency', emergencySchema);
