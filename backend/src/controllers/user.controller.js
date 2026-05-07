const userModel = require('../models/user.model');
const userService = require('../services/user.services');
const blackListTokenModel = require('../models/blackListToken.model');
const  { validationResult } = require('express-validator');




module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({ email });
    if (isUserAlreadyExists) {
        return res.status(400).json({ message: 'User with this email already exists' });
    }
    const hashPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstName: fullname.firstName,
        lastname: fullname.lastname,
        email,
        password: hashPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({
        message: 'User registered successfully',
        user: {
            id: user._id,
            email: user.email,
            fullname: user.fullname
        },
        token
    });


}


module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();
    res.cookie('token', token)

    res.status(200).json({
        message: 'Login successful',
        user: {
            id: user._id,
            email: user.email,
            fullname: user.fullname
        },
        token
    });

}

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user)

}

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await blackListTokenModel.create({ token });
    res.status(200).json({ message: 'Logout successful' });
}