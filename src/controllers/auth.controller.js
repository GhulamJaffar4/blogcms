const authService = require('../services/auth.service');
const catchAsync = require('../utils/catchAsync');

exports.register = catchAsync(async (req, res, next) => {
    const { user, token } = await authService.register(req.body);

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user,
        },
    });
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password);

    res.status(200).json({
        status: 'success',
        token,
        data: {
            user,
        },
    });
});
