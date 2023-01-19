const mongoose = require('mongoose');
const { regexp } = require('../utils/regex');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return regexp.emailCheck.test(v);
      },
      message: 'Email is not correct',
    },
  },
  password: {
    type: String,
    select: false,
    minlength: 6,
    maxlength: 60,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model('user', userSchema);
