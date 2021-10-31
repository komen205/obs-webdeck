module.exports = function(server) {
  const io = require("socket.io")(server);

  io.listen(server);
  connection = require('./obs/connect')();
  console.log(connection)
  io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("triggerobs", (socket) => {
      require('./obs/switch-scene')(connection);
    });
  });
};
