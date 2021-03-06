const jwt = require('jwt-simple');
const User = require('../models/User');

const SECRET = process.env.SECRET;

const formatPhone = phone => {
  // remove any character between numers and prepend "+1" (U.S. number)
  return "+1" + phone.replace(/\D/g,'');
};

const userToken = (user) => {
  const timestamp = new Date().getTime();
  // generate jwt
  return jwt.encode({ sub: user.id, iat: timestamp }, SECRET);
};

exports.signIn = (req, res) => {
  const { firstName, phone } = req.user;
  // send user's first name and jwt
  res.send({ 
    firstName,
    phone,
    token: userToken(req.user)
  });
};

// create new user
exports.signUp = (req, res, next) => {
  const { firstName, email, password, phone } = req.body;
  const phoneNumber = formatPhone(phone);
  
  User.findOne({ email: email }, (err, existingUser) => {
    if (err) { return next(err); }
    // check if email is already registered
    if (existingUser) {
      return res.status(422).send({ error: 'Email is already in use' });
    }
    // if not, create new User
    const user = new User({
      firstName,
      email,
      password,
      phone: phoneNumber
    });
    // save new User and send back
    user.save(function(err) {
      if (err) { return next(err); }
      
      res.send({ 
        firstName,
        phone,
        token: userToken(user) 
      });
    });
  });
};