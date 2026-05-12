const Post = require('../models/Post');

// @desc    Get all public posts
// @route   GET /api/posts
// @access  Public
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ scope: 'public' })
      .populate('user', 'name role avatar bio')
      .populate('comments.user', 'name avatar')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get doctor-only posts
// @route   GET /api/posts/doctors
// @access  Private (Doctor only)
exports.getDoctorPosts = async (req, res) => {
  try {
    const posts = await Post.find({ scope: 'doctors-only' })
      .populate('user', 'name role avatar bio')
      .populate('comments.user', 'name avatar')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
exports.createPost = async (req, res) => {
  try {
    const { content, category, scope } = req.body;
    let media = [];

    if (req.files && req.files.length > 0) {
      media = req.files.map(file => ({
        url: `/uploads/${file.filename}`,
        type: file.mimetype.startsWith('video') ? 'video' : 'image'
      }));
    }

    if (scope === 'doctors-only' && req.user.role !== 'doctor') {
      return res.status(403).json({ message: 'Only doctors can post in this section' });
    }

    const post = await Post.create({
      user: req.user._id,
      content,
      category,
      media,
      scope: scope || 'public'
    });

    const populatedPost = await Post.findById(post._id).populate('user', 'name role avatar');
    res.status(201).json(populatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Like a post
// @route   PUT /api/posts/:id/like
// @access  Private
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.likes.includes(req.user._id)) {
      post.likes = post.likes.filter(id => id.toString() !== req.user._id.toString());
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();
    res.json(post.likes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Save a post
// @route   PUT /api/posts/:id/save
// @access  Private
exports.savePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.saves.includes(req.user._id)) {
      post.saves = post.saves.filter(id => id.toString() !== req.user._id.toString());
    } else {
      post.saves.push(req.user._id);
    }

    await post.save();
    res.json(post.saves);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Comment on a post
// @route   POST /api/posts/:id/comment
// @access  Private
exports.commentOnPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const newComment = {
      user: req.user._id,
      text: req.body.text
    };

    post.comments.push(newComment);
    await post.save();
    
    const populatedPost = await Post.findById(post._id).populate('comments.user', 'name avatar');
    res.json(populatedPost.comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await post.deleteOne();
    res.json({ message: 'Post removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get user posts
// @route   GET /api/posts/user/:id
// @access  Public
exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.id })
      .populate('user', 'name role avatar')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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
