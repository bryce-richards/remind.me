const authController = require('../controllers/authController');
const passportService = require('../services/passport');
const passport = require('passport');

// const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

module.exports = app => {
  // app.get('/auth/user', requireAuth, authController.getUser);

  app.post('/auth/signin', requireSignIn, authController.signIn);
  
  app.post('/auth/signup', authController.signUp);
};