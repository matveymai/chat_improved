const path = require('path')
const express = require('express')
const cors = require('cors')
const http = require('http')
const middlewares = require('./middlewares.js')


const app = express()
const server = http.createServer(app)

const PORT = process.env.PORT ?? 3000

app.use(cors({
    origin: 'localhost'
}))

app.use(express.static('static'))
app.use(middlewares.reqTime)
app.use(middlewares.logger)

app.get('/', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'index.html'))
    console.log(req.reqTime)
})

app.get('/about', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'about.html'))
})

app.get('/profile', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'profile.html'))
})

server.listen(PORT, () => {
    console.log(`Server has been started on ${PORT}...`)
})