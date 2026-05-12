const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: false
  },
  media: [{
    url: String,
    type: {
      type: String,
      enum: ['image', 'video'],
      default: 'image'
    }
  }],
  category: {
    type: String,
    enum: ['General', 'Health Tips', 'Medical Research', 'Case Discussion'],
    default: 'General'
  },
  scope: {
    type: String,
    enum: ['public', 'doctors-only'],
    default: 'public'
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  saves: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  reposts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', PostSchema);
