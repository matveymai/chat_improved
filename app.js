const path = require('path')
const express = require('express')
const cors = require('cors')
const http = require('http')
const bodyParser= require('body-parser')
const morgan = require('morgan')
const middlewares = require('./middlewares.js')

const app = express()
const server = http.createServer(app)
//const logger = morgan(':method :url :status :res[content-length] - :response-time ms')
const PORT = process.env.PORT ?? 3000

app.set("view engine", "hbs")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(express.static('static'))
app.use(morgan('combined'))
//app.use(middlewares.logger)


app.get('/', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'index.html'))
    console.log(process.env)
})

app.get('/favicon.ico', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'favicon.ico'))
})

app.get('/about', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'about.html'))
})

app.get('/profile', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'profile.html'))
})

app.get('/:name', (req, res) => {
    let name = req.params.name
    res.json({
        message: `Hello ${name}`
    })
})

server.listen(PORT, () => {
    console.log(`Server has been started on ${PORT}...`)
})