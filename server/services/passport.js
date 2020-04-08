const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const SECRET = process.env.secret;

const User = require('../models/User');

// local strategy
const localOptions = { 
  usernameField: 'email', 
  passwordField: 'password' 
};

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }

    user.comparePassword(password, (err, isMatch) => {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }

      return done(null, user);
    })
  });
});

// jwt strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: SECRET,
  passReqToCallback: true
};
const jwtLogin = new JwtStrategy(jwtOptions, (req, payload, done) => {
  User.findById(payload.sub, (err, user) => {
    if (err) { return done(err, false); }

    if (user) {
      req.user = user;
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(localLogin);
passport.use(jwtLogin);