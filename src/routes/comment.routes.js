const express = require('express');
const commentController = require('../controllers/comment.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// mergeParams: true ensures we get access to params from parent router (e.g. :postId)
const router = express.Router({ mergeParams: true });

router.use(authMiddleware.protect);

router.post('/', commentController.addComment);
router.get('/', commentController.getComments);
router.delete('/:commentId', commentController.deleteComment);

module.exports = router;
