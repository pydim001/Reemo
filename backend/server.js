const express = require('express')
const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE')
    if ('OPTIONS' === req.method) {
        res.send(200)
    } else {
        next();
    }
})

const sendEmail = () => {
    const current = new Date()
}

setInterval(sendEmail, 60000)

app.get("/", (req, res) => {
    res.json({

    })
})

app.post("/", (req, res) => {
    res.status(200)
})

app.listen(5000, () => { console.log("Server running on port 5000") })