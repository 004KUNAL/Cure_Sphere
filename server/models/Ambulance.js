const mongoose = require('mongoose');

const AmbulanceSchema = new mongoose.Schema({
  driverName: {
    type: String,
    required: true
  },
  numberPlate: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [0, 0] // [longitude, latitude]
    }
  },
  status: {
    type: String,
    enum: ['available', 'busy', 'offline'],
    default: 'available'
  },
  type: {
    type: String,
    enum: ['Basic', 'Advanced', 'ICU'],
    default: 'Basic'
  },
  hospital: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

AmbulanceSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Ambulance', AmbulanceSchema);
