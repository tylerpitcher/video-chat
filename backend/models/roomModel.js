const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'Please add a room name'],
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: [true, 'Please add a owner'],
  },
  members: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Room', schema);