const express = require('express');
const router = express.Router();
const { getMessages, sendMessage, getConversations } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

router.get('/conversations', protect, getConversations);
router.get('/:userId', protect, getMessages);
router.post('/', protect, sendMessage);

module.exports = router;
