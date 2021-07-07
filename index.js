const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.set('port', 3333); //порт приложения

app.use(cors()); //разрешаем cors
app.use(express.static('static')); //определяем папку для статики

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(app.get('port'), () => {
  console.log(`Starting APP on ${app.get('port')}...`);
});
