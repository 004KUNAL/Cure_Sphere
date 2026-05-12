const Emergency = require('../models/Emergency');

// @desc    Create new emergency request
// @route   POST /api/emergency
// @access  Private
exports.createEmergency = async (req, res) => {
  try {
    const { type, location } = req.body;
    const emergency = await Emergency.create({
      user: req.user._id,
      type,
      location
    });
    res.status(201).json(emergency);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's emergency history
// @route   GET /api/emergency/my
// @access  Private
exports.getMyEmergencies = async (req, res) => {
  try {
    const emergencies = await Emergency.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(emergencies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all active emergencies (for admins/responders)
// @route   GET /api/emergency/active
// @access  Private/Admin
exports.getActiveEmergencies = async (req, res) => {
  try {
    const emergencies = await Emergency.find({ status: { $ne: 'completed' } }).populate('user', 'name phone');
    res.json(emergencies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
