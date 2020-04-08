const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/user', passport.authenticate('jwt', { session: false }), authController.getUser);
router.post('/signin', passport.authenticate('local', { session: false }), authController.signIn);
router.post('/signup', authController.signUp);

module.exports = router;