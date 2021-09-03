const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const path = require('path')
const { Server } = require('socket.io')
const io = new Server(server)

const mobileAppPath = __dirname + '/../src/app-mobile/dist'
app.use(express.static(mobileAppPath))

app.get('/', function (req,res) {
    res.sendFile(path.resolve(mobileAppPath+'/index.html'))
  })

const port = 3000
server.listen(port, () => {
  console.log('listening on *:' + port)
})

io.on('connection', (socket) => {
  console.log('a user connected');
});
