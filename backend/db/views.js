const MsgInfo = require("./MsgInfo")

// if field1 is before field2 return true, else return false
exports.compare = (field1, field2) => {
    if(parseInt(field1.year) <= field2.year){
        return true
    }if(parseInt(field1.month) <= field2.month){
        return true
    }if(parseInt(field1.day) <= field2.day){
        return true
    }if(parseInt(field1.hour) <= field2.hour){
        return true
    }if(parseInt(field1.minute) <= field2.minute){
        return true
    }return false
}

exports.sendMsg = async () => {
    let msgs = MsgInfo.find()
    const date = new Date()
    const currdate = {
        month: date.getMonth(),
        year: date.getFullYear(),
        hour: date.getHours(),
        day: date.getDay(),
        minute: date.getMinutes()
    }
    for(let msg in msgs){
        if(this.compare(msg, currdate)){
            const rmsg = MsgInfo.findById(msg._id)
            await rmsg.remove()
        }
    }
}
