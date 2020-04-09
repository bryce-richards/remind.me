const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String,
  phone: String
});

// before saving, generate hashed password
userSchema.pre('save', function(next) {
  const user = this;
  bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
    if (err) { throw err; }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err); }

      // save hashed password as user password
      user.password = hash;
      next();
    });
  });
});

// compare passwords upon sign in
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
};

module.exports = mongoose.model('user', userSchema);