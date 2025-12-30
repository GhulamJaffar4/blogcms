const express = require('express');
const postController = require('../controllers/post.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const commentRouter = require('./comment.routes');
const likeController = require('../controllers/like.controller');

const router = express.Router();

// Nested routes
router.use('/:postId/comments', commentRouter);

// Public routes
router.get('/', postController.getAllPosts);
router.get('/:slug', postController.getPost);

// Protected routes
router.use(authMiddleware.protect);

router.post('/', postController.createPost);
router.patch('/:slug', postController.updatePost);
router.delete('/:slug', postController.deletePost);

router.post('/:postId/like', likeController.toggleLike);

module.exports = router;
