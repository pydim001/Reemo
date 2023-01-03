const MsgInfo = require("./MsgInfo")

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

exports.sendMsg = async () => {
    let msgs = MsgInfo.find()
    const date = new Date()
    const currdate = {
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        hour: date.getHours(),
        day: date.getDay(),
        minute: date.getMinutes()
    }
    for(let msg in msgs){
        if(this.compare(msg, currdate)){
            await MsgInfo.deleteOne(msg._id)
        }
    }
}

// removes all data in a database, for testing purposes
exports.clear = async (db) => {
    const data = db.find()
    for(let packet in data){
        await db.deleteOne(packet._id)
    }
}
