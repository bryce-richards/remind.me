const authController = require('../controllers/authController');
const passport = require('passport');
const requireAuth = passport.authenticate('local', { session: false });

module.exports = app => {
  app.get('/auth/user', authController.getUser);

  app.post('/auth/signin', requireAuth, authController.signIn);
  
  app.post('/auth/signup', authController.signUp);
};