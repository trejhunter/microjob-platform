const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  method: {
    type: String,
    enum: ['local', 'google', 'facebook', 'linkedin'],
    required: true,
  },
  local: {
    email: {
      type: String,
    },
    password: {
      type: String,
      minlength: 8,
    },
  },
  google: {
    id: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
  },
  facebook: {
    id: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
  },
  linkedin: {
    id: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
  },
  role: {
    type: String,
    enum: ['organization', 'individual'],
  },
});

UserSchema.pre('save', function (next) {
  if (this.method !== 'local') return next();
  if (!this.isModified('local.password')) return next();
  bcrypt.hash(this.local.password, 12, (err, passwordHash) => {
    if (err) return next(err);
    this.local.password = passwordHash;
    next();
  });
});

UserSchema.methods.comparePassword = function (password, callbackFunction) {
  bcrypt.compare(password, this.local.password, (err, isMatch) => {
    if (err) return callbackFunction(err);
    else {
      if (!isMatch) return callbackFunction(null, isMatch);
      return callbackFunction(null, this);
    }
  });
};

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
