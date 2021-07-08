const path = require('path')
const express = require('express')
const cors = require('cors')
const http = require('http')
const bodyParser= require('body-parser')
const morgan = require('morgan')
const hbs = require('hbs')
const middlewares = require('./middlewares.js')

const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT ?? 3000

app.set("view engine", "hbs")
app.set('views', path.resolve(__dirname, 'hbs'))
hbs.registerPartials(path.resolve(__dirname, 'hbs', 'partials'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
//app.use(express.static(path.resolve(__dirname, 'static'))
app.use(morgan('combined'))
//app.use(middlewares.logger)

app.get('/', (req,res) => {
     res.render('index', {
         title: "Home Page"
     })
})

app.get('/about', (req,res) => {
    res.render('about')
})

app.get('/profile', (req,res) => {
    res.render('profile')
})

app.get('/favicon.ico', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'favicon.ico'))
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