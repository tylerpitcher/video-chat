const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'Please add a room name'],
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please add a owner'],
  },
  members: [String],
});

module.exports = mongoose.model('Room', schema);