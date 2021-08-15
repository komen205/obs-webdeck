const { menubar } = require("menubar");
const exec = require("child_process").exec;
const mb = menubar();
const express = require("express");
const app = express();
const port = 1234;
const OBSWebSocket = require("obs-websocket-js");
const obs = new OBSWebSocket();
obs
  .connect({
    address: "localhost:4444",
    password: "123",
  })
  .then(() => {
    console.log(`Success! We're connected & authenticated.`);

    return obs.send("GetSceneList");
  })
  .then((data) => {
    console.log(`${data.scenes.length} Available Scenes!`);
  
    data.scenes.forEach((scene) => {
      if (scene.name !== data.currentScene) {
        console.log(
          `Found a different scene! Switching to Scene: ${scene.name}`
        );

        obs.send("SetCurrentScene", {
          "scene-name": scene.name,
        });
      }
    });
  })
  .catch((err) => {
    // Promise convention dicates you have a catch on every chain.
    console.log(err);
  });

  
obs.on("StartStreaming", (data) => {
  console.log(`Started streaming`);
});

obs.on("StopStreaming", (data) => {
  console.log(`Stopped streaming`);
});


obs.on("SwitchScenes", (data) => {
  console.log(`New Active Scene: ${data.sceneName}`);
});

// You must add this handler to avoid uncaught exceptions.
obs.on("error", (err) => {
  console.error("socket error:", err);
});

app.get("/switch", (req, res) => {
  obs.send("SetCurrentScene", {
    "scene-name": req.query.scene,
  });
  res.send('done');
});

app.get("/start", (req, res) => {
  obs.send("StartStreaming");
});

app.get("/stop", (req, res) => {
  obs.send("StopStreaming");
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

mb.on("ready", () => {
  express();
  console.log("app is ready");
});
