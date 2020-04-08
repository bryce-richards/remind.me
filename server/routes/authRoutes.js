const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');

const router = express.Router();
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

router.get('/user', requireAuth, authController.getUser);
router.post('/signin', requireSignIn, authController.signIn);
router.post('/signup', authController.signUp);

module.exports = router;