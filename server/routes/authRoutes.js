const express = require('express');
const router = express.Router();
const { register, login, getMe, getProfile, followUser, togglePrivacy, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/profile/:id', getProfile);
router.put('/profile', protect, upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'cover', maxCount: 1 }, { name: 'upiQR', maxCount: 1 }]), updateProfile);
router.put('/follow/:id', protect, followUser);
router.put('/privacy', protect, togglePrivacy);

module.exports = router;
