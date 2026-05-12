const express = require('express');
const router = express.Router();
const { getDoctors, getDoctorById, createDoctorProfile, toggleStatus, updateDoctorProfile } = require('../controllers/doctorController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', getDoctors);
router.put('/status', protect, authorize('doctor'), toggleStatus);
router.put('/profile', protect, authorize('doctor'), upload.single('upiQR'), updateDoctorProfile);
router.get('/:id', getDoctorById);
router.post('/', protect, authorize('doctor', 'admin'), createDoctorProfile);

module.exports = router;
