const jwt = require('jwt-simple');
const User = require('../models/User');

const SECRET = process.env.secret;

const formatPhone = phone => {
  return "+1" + phone.replace(/\D/g,'');
};

const userToken = (user) => {
  const timestamp = new Date().getTime();

  return jwt.encode({ sub: user.id, iat: timestamp }, SECRET);
};

exports.getUser = (req, res) => {
  const { firstName } = req.user;

  res.send({ 
    firstName,
    token: userToken(req.user)
  });
};

exports.signIn = (req, res) => {
  const { firstName } = req.user;

  res.send({ 
    firstName,
    token: userToken(req.user)
  });
};

exports.signUp = (req, res, next) => {
  const { firstName, email, password, phone } = req.body;
  const phoneNumber = formatPhone(phone);

  User.findOne({ email }, (err, existingUser) => {
    if (err) { return next(err); }

    if (existingUser) {
      return res.status(422).send({ error: 'Email is already in use' });
    }

    const user = new User({
      firstName,
      email,
      password,
      phone: phoneNumber
    });

    user.save(function(err) {
      if (err) { return next(err); }

      res.send({ 
        firstName,
        token: userToken(user) 
      });
    });
  });
};