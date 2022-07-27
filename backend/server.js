const express = require('express')
const app = express()

app.get("/", (req, res) => {
    res.json({

    })
})

app.post("/", (req, res) => {
    console.log(req.body)
    res.status(200)
})

app.listen(5000, () => { console.log("Server running on port 5000") })