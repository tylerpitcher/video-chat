const errorHandler = require('./middleware/errorHandler');
const User = require('./models/userModel');
const jwt = require('jsonwebtoken');
const express = require('express');

require('dotenv').config();
require('./db')();

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.on('join', async (roomId, token) => {
    try {
      if (!token) throw new Error('Not authorized');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (!user) throw new Error('Not authorized');

      socket.join(roomId);
  
      socket.broadcast.to(roomId).emit('newUser', { id: socket.id, username: user.username });
  
      socket.on('disconnect', () => {
        socket.broadcast.emit('leave', user.username);
      });
      
      socket.on('call', (data) => {
        io.to(data.to).emit('call', { signal: data.signalData, from: socket.id, username: user.username });
      });
  
      socket.on('yes', (data) => {
        io.to(data.to).emit('yes', data.signal);
      });
    } catch (error) {
      console.log(error);
      socket.disconnect();
    }
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/room', require('./routes/roomRoutes'));
app.use(errorHandler);

server.listen(8000);