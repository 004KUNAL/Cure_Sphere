const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  const { name, email, password, role, phone } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'user',
      phone: phone || ''
    });

    if (user && role === 'doctor') {
      const Doctor = require('../models/Doctor');
      await Doctor.create({
        user: user._id,
        specialization: req.body.specialization || 'General Physician',
        experience: req.body.experience || 0,
        fees: req.body.fees || 0,
        clinicLocation: {
          city: req.body.city || ''
        }
      });
    }

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar || null,
        medicalId: user.medicalId,
        token: generateToken(user._id)
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar || null,
        medicalId: user.medicalId,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user profile by ID
// @route   GET /api/auth/profile/:id
// @access  Public
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password').lean();
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    if (user.role === 'doctor') {
      const Doctor = require('../models/Doctor');
      const doctorInfo = await Doctor.findOne({ user: user._id });
      if (doctorInfo) {
        user.doctorInfo = doctorInfo;
      }
    }
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Follow/Unfollow user
// @route   PUT /api/auth/follow/:id
// @access  Private
exports.followUser = async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!targetUser) return res.status(404).json({ message: 'User not found' });

    if (targetUser.followers.includes(req.user._id)) {
      // Unfollow
      targetUser.followers = targetUser.followers.filter(id => id.toString() !== req.user._id.toString());
      currentUser.following = currentUser.following.filter(id => id.toString() !== req.params.id);
    } else {
      // Follow
      targetUser.followers.push(req.user._id);
      currentUser.following.push(req.params.id);
    }

    await targetUser.save();
    await currentUser.save();

    res.json({ followers: targetUser.followers, following: currentUser.following });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Toggle profile privacy
// @route   PUT /api/auth/privacy
// @access  Private
exports.togglePrivacy = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.isPrivate = !user.isPrivate;
    await user.save();
    res.json({ isPrivate: user.isPrivate });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      if (req.body.name !== undefined) user.name = req.body.name;
      if (req.body.email !== undefined) user.email = req.body.email;
      if (req.body.bio !== undefined) user.bio = req.body.bio;
      
      if (req.body.medicalId) {
        try {
          user.medicalId = JSON.parse(req.body.medicalId);
        } catch (e) {
          console.error("Error parsing medicalId:", e);
        }
      }
      
      if (req.body.vendorInfo) {
        try {
          user.vendorInfo = JSON.parse(req.body.vendorInfo);
        } catch (e) {
          console.error("Error parsing vendorInfo:", e);
        }
      }
      
      if (req.files) {
        if (req.files.avatar) user.avatar = `/uploads/${req.files.avatar[0].filename}`;
        if (req.files.cover) user.cover = `/uploads/${req.files.cover[0].filename}`;
        if (req.files.upiQR) user.vendorInfo.upiQR = `/uploads/${req.files.upiQR[0].filename}`;
      }

      const updatedUser = await user.save();
      // Return safe fields including the new avatar so the client can update state
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        bio: updatedUser.bio,
        avatar: updatedUser.avatar || null,
        cover: updatedUser.cover || null,
        isPrivate: updatedUser.isPrivate,
        followers: updatedUser.followers,
        following: updatedUser.following,
        medicalId: updatedUser.medicalId,
        vendorInfo: updatedUser.vendorInfo,
        createdAt: updatedUser.createdAt,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error('Update Profile Error:', err);
    res.status(500).json({ message: err.message });
  }
};
