const express = require("express");
const app = express();
const http = require("http");
const { SocketAddress } = require("net");
const server = http.createServer(app);
const path = require("path");
var cors = require("cors");
var portFinder = require("find-free-port");

const ioOptions = {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
};
const io = require("socket.io")(server, ioOptions);
app.io = io;


const mobileAppPath = __dirname + "/../src/app-mobile/dist";

app.use(cors());
app.use(require("body-parser").json());
app.use(express.static(mobileAppPath));

app.get("/", function(req, res) {
  res.sendFile(path.resolve(mobileAppPath + "/index.html"));
});

app.post("/api/deck-config", function(req, res) {
  //console.log(req.body);
  req.app.io.emit("newDeckConfig", req.body);
  return res.send("Updated");
});

portFinder(3000)
  .then(([freePort]) => {
    server.listen(freePort, () => {
      console.log("listening on *:" + freePort);
    });
    require('./events/socket')(server);
  })
  .catch((err) => {
    console.error(err);
  });
