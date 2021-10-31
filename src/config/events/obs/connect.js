const OBSWebSocket = require("obs-websocket-js");
const obs = new OBSWebSocket();
module.exports = function() {
  obs.connect({
    address: "localhost:4444",
    password: "123",
  });
  
};
