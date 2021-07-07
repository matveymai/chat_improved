import express from 'express'
import http from 'http'
import path from 'path'
import cors from 'cors'


const __dirname = path.resolve()
const app = express()
const server = http.createServer(app)

const PORT = process.env.PORT ?? 3000

app.use(cors({
    origin: 'localhost'
}))

app.use(express.static(path.resolve(__dirname, 'static')))



app.get('/', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'index.html'))
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