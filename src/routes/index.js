const express = require('express');
const authRoutes = require('./auth.routes');
const postRoutes = require('./post.routes');
const commentController = require('../controllers/comment.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/posts', postRoutes);

// Helper route for deleting comments directly if not nested (optional, but requested architecture implies comments are linked. 
// My comment route is nested but I also need a way to delete a specific comment by ID without knowing post ID?
// Actually my service deleteComment only needs commentId. 
// So I will add a direct route for comments deletion if needed, OR stick to nested.
// The user request said "Delete comment (only comment owner or post author)".
// Standard REST often allows DELETE /comments/:id.
// I'll add a separate top-level route for comments just for delete to be safe/flexible, 
// or I can handle it in the nested one if I pass params correctly. 
// However, the nested route `/:postId/comments/:commentId` works fine. 
// Let's also expose a top level /comments for deletion if we want to be very standard, 
// but nested under posts is good for context. 
// Actually, looking at my nested route `router.delete('/:commentId', ...)` inside comment.routes.js
// It will be accessed as DELETE /posts/:postId/comments/:commentId
// This is fine.

module.exports = router;
