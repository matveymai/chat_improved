const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
  socket.on('message from client', (message) => {
    console.log('message from client: ' + message);
    connections.push(socket);
    console.log(`all users are ${connections.length}`)
    io.sockets.emit('message from server', message);
  });

  socket.on('disconnect', () => {
    connections.splice(connections.indexOf(socket), 1);
    console.log(`all users are ${connections.length}`)
    socket.emit('disconnect', { alert: "someone exited..."})
  })
});

server.listen(3000, () => {
  console.log('START APP on ...');
});
