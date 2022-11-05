const mongoose = require('mongoose');

const schema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please add a username'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
  },
  rooms: {
    type: Array,
    required: false,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', schema);