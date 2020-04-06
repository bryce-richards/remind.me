const authController = require('../controllers/authController');
require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

module.exports = app => {
  app.get('/api/user', requireAuth, authController.getUser);

  app.post('/signin', requireSignIn, authController.signIn);
  
  app.post('/signup', authController.signUp);

  app.get('/signout', authController.signOut);
};