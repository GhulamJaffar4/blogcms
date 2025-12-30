const Comment = require('../models/comment.model');
const Post = require('../models/post.model');
const AppError = require('../utils/appError');

exports.createComment = async (postId, userId, content) => {
    const post = await Post.findById(postId);
    if (!post) {
        throw new AppError('Post not found', 404);
    }

    const comment = await Comment.create({
        content,
        post: postId,
        author: userId
    });

    return await comment.populate('author', 'username');
};

exports.deleteComment = async (commentId, userId) => {
    const comment = await Comment.findById(commentId).populate('post');
    if (!comment) {
        throw new AppError('Comment not found', 404);
    }

    // Allow if user is comment author OR post author
    const isCommentAuthor = comment.author.toString() === userId.toString();
    const isPostAuthor = comment.post.author.toString() === userId.toString();

    if (!isCommentAuthor && !isPostAuthor) {
        throw new AppError('You are not authorized to delete this comment', 403);
    }

    await comment.deleteOne();
};

exports.getCommentsByPost = async (postId) => {
    return await Comment.find({ post: postId }).populate('author', 'username');
};
