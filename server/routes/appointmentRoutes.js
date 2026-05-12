const express = require('express');
const router = express.Router();
const { bookAppointment, getMyAppointments, updateAppointmentStatus } = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, bookAppointment);
router.get('/my', protect, getMyAppointments);
router.put('/:id', protect, updateAppointmentStatus);

module.exports = router;
