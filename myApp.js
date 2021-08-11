const { menubar } = require("menubar");
const exec = require("child_process").exec;
const mb = menubar();
var validUrl = require("valid-url");

const express = require("express");
const app = express();
const port = 3000;

function execute(command, callback) {
  exec(command, (error, stdout, stderr) => {
    callback(stdout);
  });
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname+"/index.html");
});
app.get("/chrome", (req, res) => {
  res.sendFile(__dirname+"/chrome.html");
});

app.post("/chrome", (req, res) => {
  if (validUrl.isUri(req.body.link)) {
    execute('start "" "' + req.body.link + '"', (output) => {
      res.send(output);
    });
  } else {
    res.send("error");
  }
});

app.get("/shutdown", (req, res) => {
  execute("shutdown -s", (output) => {
    res.send(output);
  });
});

app.get("/stop", (req, res) => {
  execute("shutdown -a", (output) => {
    res.send(output);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

mb.on("ready", () => {
  express();
  console.log("app is ready");
});
