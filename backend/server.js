import { validTime } from '../src/Home/Home'

const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb://localhost/emailinfo', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => { console.error(error) })
db.once('open', () => { console.log("Connected to Database") })


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE')
    if ('OPTIONS' === req.method) {
        res.sendStatus(200)
    } else {
        next();
    }
})

app.get("/", (req, res) => {

    const sendEmail = () => {
        const current = new Date()
    }

    setInterval(sendEmail, 1000)
    
    res.json({

    })
})

app.post("/", (req, res) => {
    res.sendStatus(200)
})

app.listen(5000, () => { console.log("Server running on port 5000") })