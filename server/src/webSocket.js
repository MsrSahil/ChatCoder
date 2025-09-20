const OnlineUsers = {};

const webSocket = (io) => {
  io.on("connection", (socket) => {

    socket.on("CreatePath", (userID) => {
      OnlineUsers[userID] = socket.id;
      console.log("Online Users", OnlineUsers);
    });

    socket.on("DeletePath", (userID) => {
      delete OnlineUsers[userID];
      console.log("Online Users", OnlineUsers);
    });

    socket.on("SendMessage", ({ from, to, text, timestamp }) => {
      const receiverSocketID = OnlineUsers[to];

      if (receiverSocketID) {
        io.to(receiverSocketID).emit("ReceiveMessage", {
          from,
          to,
          text,
          timestamp,
        });
      }
    });
  });
};

export default webSocket;