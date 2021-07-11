const path = require('path')
const colors = require('colors')
const express = require('express')
const cors = require('cors')
const http = require('http')
const bodyParser= require('body-parser')
const { Server } = require('socket.io')
const morgan = require('morgan')
const hbs = require('hbs')
const middlewares = require('./middlewares.js')
const routers = require('./routes/routes.js')
const helpers = require('./helpers.js')


const app = express()
const server = http.createServer(app)
const io = new Server(server)
const PORT = process.env.PORT ?? 3000

app.set("view engine", "hbs")
app.set('views', path.resolve(__dirname, 'hbs'))
hbs.registerPartials(path.resolve(__dirname, 'hbs', 'partials'))

app.use(routers.router)
app.use(bodyParser.json()) // parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true })) // parse requests of content-type - application/x-www-form-urlencoded
app.use(cors())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(morgan('combined'))
//app.use(middlewares.logger)

app.get('/hello', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'hello.html'))
})

app.get('/chat', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'chat.html'))
})

let users = []

io.on('connection', (socket) => {
    users.push(1)
    console.log(colors.bgBrightGreen.black('New user connected'));
    console.log(colors.bgBrightYellow.black(`All users = ${users.length}`))

    socket.on('message_from_client', (message) => {
        console.log(colors.bgBrightWhite.black(`Messsage: ${message}`))

        socket.broadcast.emit('message_from_server', {
            hello: "Hello NodeJS",
            data: message
        })
    })

    socket.on('disconnect', () => {
    users.pop()
    console.log(colors.bgBrightRed.brightWhite('user disconnected'))
    console.log(colors.bgBrightYellow.black(`All users = ${users.length}`))
  })
})

app.get('/', (req,res) => {
     res.render('home', {
         title: "Home Page",
         active: "home"
     })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: "About Page",
        active: "about"
    })
})

app.get('/profile', (req,res) => {
    res.render('profile', {
        title: "Profile Page",
        active: "profile"
    })
})

/*let users = [
    {id: 1, name: 'Neo', status: 'online'},
    {id: 2, name: 'Alice', status: 'online'},
    {id: 3, name: 'Mad Max', status: 'offline'},
    {id: 4, name: 'Sponge Bob', status: 'online'},
    {id: 5, name: 'Jhon Wick', status: 'offline'}
]*/

app.get('/users', (req,res) => {
    res.render('users', {
        title: "Users Page",
        users: users
    })
})

app.get('/favicon.ico', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'favicon.ico'))
})

//app.get('/:name', (req, res) => {
//    let name = req.params.name
//    res.json({
//        message: `Hello ${name}`
//    })
//})

server.listen(PORT, () => {
    console.log(`Server has been started on ${PORT}...`)
})