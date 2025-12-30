const commentService = require('../services/comment.service');
const catchAsync = require('../utils/catchAsync');

exports.addComment = catchAsync(async (req, res, next) => {
    const comment = await commentService.createComment(req.params.postId, req.user._id, req.body.content);

    res.status(201).json({
        status: 'success',
        data: {
            comment
        }
    });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
    await commentService.deleteComment(req.params.commentId, req.user._id);

    res.status(204).json({
        status: 'success',
        data: null
    });
});

exports.getComments = catchAsync(async (req, res, next) => {
    const comments = await commentService.getCommentsByPost(req.params.postId);

    res.status(200).json({
        status: 'success',
        results: comments.length,
        data: {
            comments
        }
    });
});
