const { registerUser, loginUser, getAllUsers } = require('../controllers/userController');
const protect = require('../middleware/authHandler');
const express = require('express');
const router = express.Router();

router.get('/', protect, getAllUsers);
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;