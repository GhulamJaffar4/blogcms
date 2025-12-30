const postService = require('../services/post.service');
const catchAsync = require('../utils/catchAsync');

exports.createPost = catchAsync(async (req, res, next) => {
    const post = await postService.createPost(req.body, req.user._id);

    res.status(201).json({
        status: 'success',
        data: {
            post,
        },
    });
});

exports.getAllPosts = catchAsync(async (req, res, next) => {
    const posts = await postService.getAllPosts(req.query);

    res.status(200).json({
        status: 'success',
        results: posts.length,
        data: {
            posts,
        },
    });
});

exports.getPost = catchAsync(async (req, res, next) => {
    const post = await postService.getPostBySlug(req.params.slug);

    res.status(200).json({
        status: 'success',
        data: {
            post,
        },
    });
});

exports.updatePost = catchAsync(async (req, res, next) => {
    const post = await postService.updatePost(req.params.slug, req.body, req.user._id);

    res.status(200).json({
        status: 'success',
        data: {
            post,
        },
    });
});

exports.deletePost = catchAsync(async (req, res, next) => {
    await postService.deletePost(req.params.slug, req.user._id);

    res.status(204).json({
        status: 'success',
        data: null,
    });
});
