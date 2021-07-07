const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.set('port', 3333);
app.use(cors());
app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(app.get('port'), () => {
  console.log(`START APP on ${app.get('port')}...`);
});
