const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    year: String,
    month: String,
    day: String,
    hour: String,
    minute: String,
    gmail: String,
    msg: String
})

module.exports = mongoose.model("MsgInfo", schema)