const MsgInfo = require("./MsgInfo")
const mailer = require("nodemailer")
const emailValidator = require('deep-email-validator');

// if field1 is before field2 return true, else return false
exports.compare = (field1, field2) => {
    if(parseInt(field1.year) < field2.year){
        return true
    }else if(parseInt(field1.year) > field2.year){
        return false
    }else{
        if(parseInt(field1.month) < field2.month){
            return true
        }else if(parseInt(field1.month) > field2.month){
            return false
        }else{
            if(parseInt(field1.day) < field2.day){
                return true
            }else if(parseInt(field1.day) > field2.day){
                return false
            }else{
                if(parseInt(field1.hour) < field2.hour){
                    return true
                }else if(parseInt(field1.hour) > field2.hour){
                    return false
                }return parseInt(field1.minute) <= field2.minute
            }
        }
    }
}

//sends message at the right time
exports.sendMsg = async () => {
    let msgs = await MsgInfo.find()
    const date = new Date()
    const currdate = {
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        hour: date.getHours(),
        day: date.getDay() + 1,
        minute: date.getMinutes()
    }

    const ct = {
        service: "gmail",
        auth: {
            user: "reemo010580@gmail.com",
            pass: "npixsatxizmlxzw"
        }
    }
    const transporter = mailer.createTransport(ct)
    for await (const msg of msgs){
        if(this.compare(msg, currdate)){
            const options = {
                from: ct.auth.user,
                to: msg.email,
                subject: "Reemo Message",
                text: msg.msg
            }
            transporter.sendMail(options, async (err, info) => {
                if(err){
                    console.log(err)
                }else{
                    console.log(info.response)
                    await MsgInfo.deleteOne({_id: msg._id})
                }   
            })
        }
    }
}

// removes all data in a database, for testing purposes
exports.clear = async (db) => {
    const data = await db.find()
    for await (const packet of data){
        await db.deleteOne({_id: packet._id})
    }
}

// checks if email is valid
exports.validEmail = async (email) => {
    const response = await emailValidator.validate(email)
    return response
}