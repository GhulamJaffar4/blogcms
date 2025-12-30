const Like = require('../models/like.model');
const Post = require('../models/post.model');
const AppError = require('../utils/appError');

exports.toggleLike = async (postId, userId) => {
    const post = await Post.findById(postId);
    if (!post) {
        throw new AppError('Post not found', 404);
    }

    const existingLike = await Like.findOne({ post: postId, user: userId });

    if (existingLike) {
        // Unlike
        await existingLike.deleteOne();
        await Post.findByIdAndUpdate(postId, { $inc: { likesCount: -1 } });
        return { status: 'unliked' };
    } else {
        // Like
        await Like.create({ post: postId, user: userId });
        await Post.findByIdAndUpdate(postId, { $inc: { likesCount: 1 } });
        return { status: 'liked' };
    }
};
