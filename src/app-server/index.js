const express = require('express')
const app = express()
const http = require('http')
const { SocketAddress } = require('net')
const server = http.createServer(app)
const path = require('path')
const { Server } = require('socket.io')

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})
app.io = io

const mobileAppPath = __dirname + '/../src/app-mobile/dist'

app.use(express.static(mobileAppPath))
app.use(require('body-parser').json())

app.get('/', function (req, res) {
  res.sendFile(path.resolve(mobileAppPath + '/index.html'))
})

app.post('/api/deck-config', function (req, res) {
  console.log(req.body)
  req.app.io.emit('newDeckConfig', req.body)
  return res.send('Updated')
})

const port = 3000

server.listen(port, () => {
  console.log('listening on *:' + port)
})

io.on('connection', (socket) => {
  console.log('A user connected');
});
