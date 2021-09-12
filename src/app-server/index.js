const express = require("express");
const app = express();
const http = require("http");
const { SocketAddress } = require("net");
const server = http.createServer(app);
const path = require("path");
var cors = require("cors");
var portFinder = require("find-free-port");
const OBSWebSocket = require("obs-websocket-js");

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

    io.on("connection", (socket) => {
      console.log("A user connected");
      socket.on("triggerobs", (socket) => {
        const obs = new OBSWebSocket();
        obs.connect({
          address: 'localhost:4444',
          password: '123'
      })
      .then(() => {
          console.log(`Success! We're connected & authenticated.`);
  
          return obs.send('GetSceneList');
      })
      .then(data => {
          console.log(`${data.scenes.length} Available Scenes!`);
  
          data.scenes.forEach(scene => {
              if (scene.name !== data.currentScene) {
                  console.log(`Found a different scene! Switching to Scene: ${scene.name}`);
  
                  obs.send('SetCurrentScene', {
                      'scene-name': scene.name
                  });
              }
          });
      })
      .catch(err => { // Promise convention dicates you have a catch on every chain.
          console.log(err);
      });

      });
    });
  })
  .catch((err) => {
    console.error(err);
  });
