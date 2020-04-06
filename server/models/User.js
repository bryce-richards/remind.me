const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: {
      validator: v => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(v.toLowerCase());
      },
      message: props => `${props.value} is not a valid email address.`
    }
  },
  password: { type: String, required: true },
  phone: {
    type: String,
    validate: {
      validator: v => {
        const re = /\d{3}-\d{3}-\d{4}/;
        return re.test(v);
      },
      message: props => `${props.value} is not a valid phone number.`
    }
  }
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

mongoose.model('user', userSchema);