const jwt = require('jwt-simple');
const User = require('../models/user');

const SECRET = process.env.secret;

const userToken = user => {
  const timestamp = new Date().getTime();

  return jwt.encode({ sub: user.id, iat: timestamp }, SECRET);
};

exports.signIn = (req, res) => {
  res.send({ token: userToken(req.user)});
};

exports.signUp = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  
  if (!email || !password) {
    return res.status(422).send({ error: 'Please provide an email and password' })
  }

  User.findOne({ email }, (err, existingUser) => {
    if (err) { return next(err); }

    if (existingUser) {
      return res.status(422).send({ error: 'Email is already in use' });
    }

    const user = new User({
      email,
      password
    });

    user.save(err => {
      if (err) { return next(err); }

      res.json({ token: userToken(user) });
    });
  });
};