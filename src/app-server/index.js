const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');

const mobileAppPath = __dirname + '/../src/app-mobile/dist'
app.use(express.static(mobileAppPath));

app.get('/', function (req,res) {
    res.sendFile(path.resolve(mobileAppPath+'/index.html'));
  }); 

server.listen(3000, () => {
  console.log('listening on *:3000');
});