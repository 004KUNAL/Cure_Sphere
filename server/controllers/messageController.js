const Message = require('../models/Message');

// @desc    Get messages for a conversation
// @route   GET /api/messages/:userId
// @access  Private
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: req.params.userId },
        { sender: req.params.userId, receiver: req.user._id }
      ]
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
exports.sendMessage = async (req, res) => {
  try {
    const { receiver, text } = req.body;
    const message = await Message.create({
      sender: req.user._id,
      receiver,
      text
    });
    res.status(201).json(message);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Get conversation list
// @route   GET /api/messages/conversations
// @access  Private
exports.getConversations = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [{ sender: req.user._id }, { receiver: req.user._id }]
    })
    .populate('sender', 'name avatar')
    .populate('receiver', 'name avatar')
    .sort({ createdAt: -1 });

    const conversations = [];
    const seen = new Set();

    messages.forEach(msg => {
      const otherUser = msg.sender._id.toString() === req.user._id.toString() ? msg.receiver : msg.sender;
      if (!seen.has(otherUser._id.toString())) {
        seen.add(otherUser._id.toString());
        conversations.push({
          user: otherUser,
          lastMessage: msg.text,
          createdAt: msg.createdAt
        });
      }
    });

    res.json(conversations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
