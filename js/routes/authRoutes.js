
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { check } = require('express-validator');

router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
], register);

router.post('/login', login);

module.exports = router;