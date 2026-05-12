const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const { createNotification } = require('./notificationController');

// @desc    Book an appointment
// @route   POST /api/appointments
// @access  Private
exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, type, date, time, notes, paymentMethodId } = req.body;

    const doctor = await Doctor.findById(doctorId).populate('user');
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    // Mock Payment Simulation
    // In a real app, you would use stripe.paymentIntents.create here
    const paymentStatus = paymentMethodId ? 'paid' : 'pending';

    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor: doctorId,
      type,
      date,
      time,
      notes,
      amount: doctor.fees,
      paymentStatus,
      paymentId: paymentMethodId ? `mock_pay_${Date.now()}` : null
    });

    // Notify Doctor
    await createNotification(
      doctor.user._id,
      'New Appointment Request',
      `${req.user.name} has requested a ${type} consultation on ${new Date(date).toLocaleDateString()}.`,
      'appointment',
      `/profile/${doctor.user._id}`
    );

    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get my appointments
// @route   GET /api/appointments/my
// @access  Private
exports.getMyAppointments = async (req, res) => {
  try {
    let query = { patient: req.user._id };

    if (req.user.role === 'doctor') {
      const doctorProfile = await Doctor.findOne({ user: req.user._id });
      if (doctorProfile) {
        query = { $or: [{ patient: req.user._id }, { doctor: doctorProfile._id }] };
      }
    }

    const appointments = await Appointment.find(query)
    .populate('patient', 'name email avatar phone')
    .populate({
      path: 'doctor',
      populate: { path: 'user', select: 'name email avatar' }
    })
    .sort({ date: 1, time: 1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id
// @access  Private
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findById(req.params.id)
      .populate('patient')
      .populate({
        path: 'doctor',
        populate: { path: 'user', select: 'name' }
      });

    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    appointment.status = status;
    await appointment.save();

    // Notify Patient
    const statusText = status === 'confirmed' ? 'approved' : status;
    await createNotification(
      appointment.patient._id,
      `Appointment ${statusText.charAt(0).toUpperCase() + statusText.slice(1)}`,
      `Dr. ${appointment.doctor.user.name} has ${statusText} your appointment for ${new Date(appointment.date).toLocaleDateString()}.`,
      'appointment',
      `/profile/${appointment.patient._id}`
    );

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
