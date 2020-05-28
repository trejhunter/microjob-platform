const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  role: {
    type: String,
    enum: ['organization', 'minister'],
    required: true,
  },
});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  bcrypt.hash(this.password, 12, (err, passwordHash) => {
    if (err) return next(err);
    this.password = passwordHash;
    next();
  });
});

UserSchema.methods.comparePassword = function (password, callbackFunction) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return callbackFunction(err);
    else {
      if (!isMatch) return callbackFunction(null, isMatch);
      return callbackFunction(null, this);
    }
  });
};

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
