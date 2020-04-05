const authController = require('../controllers/authController');
require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

module.exports = app => {
  app.get('/', requireAuth, (req, res) => {
    res.redirect('/dashboard');
  });

  app.post('/signin', requireSignIn, authController.signIn);
  
  app.post('/signup', authController.signUp);

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};