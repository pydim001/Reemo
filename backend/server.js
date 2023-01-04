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

setInterval(views.sendMsg, 60000)

app.get("/", async (req, res) => {
    
    const msgs = await MsgInfo.find()
    //views.clear(MsgInfo)
    res.json({
        data: msgs
    })
})

app.post("/", async (req, res) => {
    const validEmailInfo = await views.validEmail(req.body.email)
    const validEmail = 
        validEmailInfo.validators.regex.valid &&
        validEmailInfo.validators.typo.valid &&
        validEmailInfo.validators.disposable.valid &&
        validEmailInfo.validators.mx.valid
    // console.log(validEmailInfo)
    if(!validEmail){
        res.json({
            res: "Invalid Email",
            err: validEmailInfo.reason
        })
    }else{
        const msg = new MsgInfo(req.body)
        await msg.save()
        res.json({
            res: "OK"
        })
    }
})


app.listen(5000, () => { console.log("Server running on port 5000") })