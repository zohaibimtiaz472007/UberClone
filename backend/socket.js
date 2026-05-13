const socketIo = require("socket.io");
const UserModel = require("./src/models/user.model");
const CaptainModel = require("./src/models/captain.model");

let io;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on('join', async (data) => {
      const { userId, role } = data;
      if(role === 'user') {
        await UserModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if(role === 'captain') {
        await CaptainModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
      socket.join(userId);
      console.log(`Socket ${socket.id} joined room: ${userId}`);

    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  return io;
}

function sendMessageToSocketId(socketId, messageObject) {
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  }
}

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};
