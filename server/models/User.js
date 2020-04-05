const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, required: true }
});

userSchema.pre('save', next => {
  const user = this;

  bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
    if (err) { return next(err) }

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err) }

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = (candidatePassword, callback) => {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return callback(err) }

    callback(null, isMatch);
  });
};

const UserClass = mongoose.model('user', userSchema);

module.exports = UserClass;