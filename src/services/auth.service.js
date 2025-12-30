const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

exports.register = async (userData) => {
    const newUser = await User.create({
        username: userData.username,
        email: userData.email,
        password: userData.password,
    });

    const token = signToken(newUser._id);

    return { user: newUser, token };
};

exports.login = async (email, password) => {
    // 1) Check if email and password exist
    if (!email || !password) {
        throw new AppError('Please provide email and password', 400);
    }

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
        throw new AppError('Incorrect email or password', 401);
    }

    // 3) If everything ok, send token to client
    const token = signToken(user._id);

    return { user, token };
};
