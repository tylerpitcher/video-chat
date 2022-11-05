const { getRoom, createRoom, deleteRoom, getMyRooms } = require('../controllers/roomController');
const protect = require('../middleware/authHandler');
const express = require('express');
const router = express.Router();

router.use(protect);
router.route('/:roomId').get(getRoom).delete(deleteRoom);
router.route('/').get(getMyRooms).post(createRoom);

module.exports = router;