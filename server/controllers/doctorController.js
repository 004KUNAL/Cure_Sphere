const Doctor = require('../models/Doctor');

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('user', 'name email avatar');
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get doctor by ID
// @route   GET /api/doctors/:id
// @access  Public
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('user', 'name email avatar');
    if (doctor) {
      res.json(doctor);
    } else {
      res.status(404).json({ message: 'Doctor not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create doctor profile
// @route   POST /api/doctors
// @access  Private (Doctor)
exports.createDoctorProfile = async (req, res) => {
  try {
    const { specialization, experience, about, fees, clinicLocation } = req.body;
    const doctor = await Doctor.create({
      user: req.user._id,
      specialization,
      experience,
      about,
      fees,
      clinicLocation
    });
    res.status(201).json(doctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Toggle doctor online/offline status
// @route   PUT /api/doctors/status
// @access  Private (Doctor)
exports.toggleStatus = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ user: req.user._id });
    if (!doctor) return res.status(404).json({ message: 'Doctor profile not found' });

    doctor.isOnline = !doctor.isOnline;
    await doctor.save();

    res.json({ isOnline: doctor.isOnline });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update doctor profile
// @route   PUT /api/doctors/profile
// @access  Private (Doctor)
exports.updateDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ user: req.user._id });
    if (!doctor) return res.status(404).json({ message: 'Doctor profile not found' });

    if (req.body.specialization) doctor.specialization = req.body.specialization;
    if (req.body.experience) doctor.experience = req.body.experience;
    if (req.body.fees) doctor.fees = req.body.fees;
    if (req.body.about) doctor.about = req.body.about;
    if (req.body.upiId) doctor.upiId = req.body.upiId;
    
    if (req.body.clinicLocation) {
        try {
            doctor.clinicLocation = JSON.parse(req.body.clinicLocation);
        } catch (e) {
            console.error("Error parsing clinicLocation:", e);
        }
    }

    if (req.file) {
      doctor.upiQR = `/uploads/${req.file.filename}`;
    }

    const updatedDoctor = await doctor.save();
    res.json(updatedDoctor);
  } catch (error) {
    console.error('Update Doctor Profile Error:', error);
    res.status(500).json({ message: error.message });
  }
};
