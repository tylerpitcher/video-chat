const asyncHandler = require('express-async-handler');
const Room = require('../models/roomModel');
const User = require('../models/userModel');

const getMyRooms = asyncHandler(async (req, res) => {
  const user = req.user;
  const rooms = await Room.find({ _id: {$in: user.rooms} });
  res.status(200).json(rooms);
});

const getRoom = asyncHandler(async (req, res) => {
  const roomId = req.params.roomId;

  if (!roomId) {
    res.status(400);
    throw new Error('Room id is required');
  }
  
  try {
    const room = await Room.findById(roomId);
    res.status(200).json(room);
  } catch (error) {
    res.status(400);
    throw new Error('Room does not exist');
  }
});

const createRoom = asyncHandler(async (req, res) => {
  const { name, members } = req.body;

  const roomExists = Boolean(await Room.findOne({ name }));
  if (roomExists) {
    res.status(400);
    throw new Error('Room already exists');
  }

  const newRoom = await Room.create({
    name,
    members,
    owner: req.user._id,
  });

  (await User.find({ _id: {$in: members} })).forEach(async (user) => {
    await User.findByIdAndUpdate(user._id, {
      rooms: [...user.rooms, newRoom._id],
    });
  });

  await User.findByIdAndUpdate(req.user._id, {
    rooms: [...req.user.rooms, newRoom._id],
  });

  res.status(201).json({ id: newRoom._id });
});

const deleteRoom = asyncHandler(async (req, res) => {});

module.exports = {
  getMyRooms,
  getRoom,
  createRoom,
  deleteRoom,
};