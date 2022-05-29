const path = require('path')
const colors = require('colors')
const express = require('express')
const cors = require('cors')
const http = require('http')
const bodyParser = require('body-parser')
const {Server} = require('socket.io')
const morgan = require('morgan')
const routers = require('./routes/routes.js')

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const PORT = process.env.PORT ?? 3000
const HOST = process.env.HOST ?? 'http://localhost'

app.use(routers.router)
app.use(bodyParser.json()) // парсит реквесты типа content-type - application/json
app.use(bodyParser.urlencoded({ extended: true })) // парсит реквесты типа content-type - application/x-www-form-urlencoded
app.use(cors())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(morgan('combined'))

app.get('/chat', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'chat.html'))
})

// временные пользователи
let users = []

// временные сообщения
let messages = []

io.on('connection', (socket) => {
    // добавляем нового пользователя в список
    users.push(1)
    
    // для новых пользователей загружаем все сообщения
    // при обновлении страницы сообщения не пропадут
    socket.emit('all_messages', messages)
    
    // логируем подключение пользователя
    console.log(colors.bgBrightGreen.black('New user connected'));
    console.log(colors.bgBrightYellow.black(`All users = ${users.length}`))

    socket.on('chat_message', (message) => {
        console.log(colors.bgBrightWhite.black(`Message: ${message}`))
        // добавляем новое сообщение в список
        messages.push(message)
        // отправляем сообщение всем, включая самого отправителя
        io.emit('chat_message', message)
    })
    
    socket.on('disconnect', () => {
        // удаляем пользователя из списка
        users.pop()
        // логируем отключение пользователя
        console.log(colors.bgBrightRed.brightWhite('user disconnected'))
        console.log(colors.bgBrightYellow.black(`All users = ${users.length}`))
    })
})

app.get('/', (req,res) => {
     res.sendFile(path.resolve(__dirname, 'static', 'home.html'))
})

app.get('/favicon.ico', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'favicon.ico'))
})

server.listen(PORT, () => {
    console.log(`Server has been started on ${HOST}:${PORT}`.magenta)
})
