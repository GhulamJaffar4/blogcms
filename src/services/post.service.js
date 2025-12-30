const Post = require('../models/post.model');
const AppError = require('../utils/appError');

exports.createPost = async (postData, userId) => {
    return await Post.create({ ...postData, author: userId });
};

exports.getAllPosts = async (query) => {
    // Basic pagination & filtering could be added here
    return await Post.find().populate('author', 'username');
};

exports.getPostBySlug = async (slug) => {
    const post = await Post.findOne({ slug }).populate('author', 'username');
    if (!post) {
        throw new AppError('No post found with that slug', 404);
    }
    return post;
};

exports.updatePost = async (slug, updateData, userId) => {
    const post = await Post.findOne({ slug });

    if (!post) {
        throw new AppError('No post found with that slug', 404);
    }

    if (post.author.toString() !== userId.toString()) {
        throw new AppError('You are not authorized to edit this post', 403);
    }

    // If title is updated, slug usually stays same or explicitly updated logic needed. 
    // For simplicity here relying on model pre-save if title changes but findOneAndUpdate bypasses pre-save unless configured.
    // Using findByIdAndUpdate / findOneAndUpdate bypasses hooks by default but we can set option.
    // Actually, better to fetch and save to trigger hooks if title changes.

    if (updateData.title) post.title = updateData.title;
    if (updateData.content) post.content = updateData.content;

    await post.save();
    return post;
};

exports.deletePost = async (slug, userId) => {
    const post = await Post.findOne({ slug });

    if (!post) {
        throw new AppError('No post found with that slug', 404);
    }

    if (post.author.toString() !== userId.toString()) {
        throw new AppError('You are not authorized to delete this post', 403);
    }

    await post.deleteOne();
};
