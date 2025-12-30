const likeService = require('../services/like.service');
const catchAsync = require('../utils/catchAsync');

exports.toggleLike = catchAsync(async (req, res, next) => {
    const result = await likeService.toggleLike(req.params.postId, req.user._id);

    res.status(200).json({
        status: 'success',
        data: result
    });
});
