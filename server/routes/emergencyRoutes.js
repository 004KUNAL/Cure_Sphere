const express = require('express');
const router = express.Router();
const { createEmergency, getMyEmergencies, getActiveEmergencies } = require('../controllers/emergencyController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createEmergency);
router.get('/my', protect, getMyEmergencies);
router.get('/active', protect, getActiveEmergencies);

module.exports = router;
