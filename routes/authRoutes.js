const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');

const router = express.Router();

// route to sign in existing user, use local strategy
router.post('/signin', passport.authenticate('local', { session: false }), authController.signIn);
// route to sign up new user
router.post('/signup', authController.signUp);

module.exports = router;