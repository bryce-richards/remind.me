const jwt = require('jwt-simple');
const User = require('../models/User');

const SECRET = process.env.secret;

const userToken = user => {
  const timestamp = new Date().getTime();

  return jwt.encode({ sub: user.id, iat: timestamp }, SECRET);
};

exports.getUser = (req, res) => {
  const { user } = req;
  res.send(user);
};

exports.signIn = (req, res) => {
  res.send({ token: userToken(req.user)});
};

exports.signUp = (req, res, next) => {
  let phone = '';
  const { firstName, email, password } = req.body;

  if (req.body.hasOwnProperty('phone')) {
    phone = req.body.phone;
  }

  User.findOne({ email }, (err, existingUser) => {
    if (err) { return next(err); }

    if (existingUser) {
      return res.status(422).send({ error: 'Email is already in use' });
    }

    const user = new User({
      firstName,
      email,
      password,
      phone
    });

    user.save(err => {
      if (err) { return next(err); }

      res.json({ token: userToken(user) });
    });
  });
};