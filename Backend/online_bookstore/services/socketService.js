const { Server } = require('socket.io');

let io;

const initializeSocket = (server) => {
  io = new Server(server);

  io.on('connection', (socket) => {
    console.log('New client connected');
    
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

const emitNewBookAdded = (book) => {
  io.emit('newBookAdded', book);
};

const emitOrderPlaced = (order) => {
  io.emit('orderPlaced', order);
};

module.exports = { initializeSocket, emitNewBookAdded, emitOrderPlaced };
