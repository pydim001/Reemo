const express = require('express')
const bp = require('body-parser')
const mongoose = require('mongoose')
const app = express()

const MsgInfo = require('./db/MsgInfo')
const views = require('./db/views')

mongoose.connect('mongodb://localhost:27017/emailinfo', {useNewUrlParser: true})
.catch(err => {console.log(err)})

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

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

setInterval(views.sendMsg, 1000)

app.get("/", async (req, res) => {
    
    const msgs = await MsgInfo.find()
    //views.clear(MsgInfo)
    res.json({
        data: msgs
    })
})

app.post("/", async (req, res) => {

    const msgs = await MsgInfo.find()

    const prevl = msgs.length

    const msg = new MsgInfo(req.body)
    await msg.save()

    const postl = msgs.length

    let response = 300
    if(postl - prevl < 1){
        response = 200
    }
    res.json({
        res: response
    })
})


app.listen(5000, () => { console.log("Server running on port 5000") })