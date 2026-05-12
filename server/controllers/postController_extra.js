const Post = require('../models/Post');

// ... existing code ...

// @desc    Get user's liked posts
// @route   GET /api/posts/user/:id/likes
// @access  Public
exports.getUserLikedPosts = async (req, res) => {
  try {
    const posts = await Post.find({ likes: req.params.id })
      .populate('user', 'name role avatar')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get user's comments/replies
// @route   GET /api/posts/user/:id/comments
// @access  Public
exports.getUserComments = async (req, res) => {
  try {
    const posts = await Post.find({ 'comments.user': req.params.id })
      .populate('user', 'name role avatar')
      .sort({ createdAt: -1 });
    
    // Extract only the comments by this user
    const replies = [];
    posts.forEach(post => {
      post.comments.forEach(comment => {
        if (comment.user.toString() === req.params.id) {
          replies.push({
            postContent: post.content,
            postId: post._id,
            commentText: comment.text,
            createdAt: comment.createdAt
          });
        }
      });
    });
    
    res.json(replies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
