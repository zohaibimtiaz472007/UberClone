const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const usercontroller = require('../controllers/user.controller');
const authMiddleware = require("../middlewares/auth.middleware")


router.post('/register', [ 
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('fullname.firstName').isLength({ min: 3, max: 100 }).notEmpty().withMessage('First name is required'),
    body('fullname.lastname').isLength({ min: 3, max: 100 }).notEmpty().withMessage('Last name is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
 ], usercontroller.registerUser);




router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], usercontroller.loginUser);

router.get('/profile',authMiddleware.authUser ,usercontroller.getUserProfile);

router.get("/logout", authMiddleware.authUser, usercontroller.logoutUser);

module.exports = router;