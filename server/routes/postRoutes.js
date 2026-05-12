const express = require('express');
const router = express.Router();
const { 
  getPosts, 
  getDoctorPosts, 
  createPost, 
  likePost, 
  savePost,
  commentOnPost,
  deletePost,
  getUserPosts,
  getUserLikedPosts,
  getUserComments
} = require('../controllers/postController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', getPosts);
router.post('/', protect, upload.array('media', 4), createPost);
router.get('/doctors', protect, authorize('doctor'), getDoctorPosts);
router.get('/user/:id', getUserPosts);
router.get('/user/:id/likes', getUserLikedPosts);
router.get('/user/:id/comments', getUserComments);
router.put('/:id/like', protect, likePost);
router.put('/:id/save', protect, savePost);
router.post('/:id/comment', protect, commentOnPost);
router.delete('/:id', protect, deletePost);

module.exports = router;
