const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a medicine name']
  },
  category: {
    type: String,
    required: [true, 'Please add a category']
  },
  description: String,
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  stock: {
    type: Number,
    default: 0
  },
  image: String,
  requiresPrescription: {
    type: Boolean,
    default: false
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  manufacturer: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Medicine', MedicineSchema);
