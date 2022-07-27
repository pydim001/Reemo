import { useState } from "react";
import postFetch from "../fetch";
import "./Home.scss"

function Home() {

    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [gmail, setGmail] = useState();
    const [msg, setMsg] = useState();

    const sDate = (val) => { setDate(val.target.value) }
    const sTime = (val) => { setTime(val.target.value) }
    const sGmail = (val) => { setGmail(val.target.value) }
    const sMsg = (val) => { setMsg(val.target.value) }

    let month = null;
    let day = null;
    let year = null;

    let hour = null;
    let minute = null;

    //formats date
    const formatTemp = (date, time) => {
        const dateArr = date.split("-");
        const timeArr = time.split(":");
        [year, month, day] = dateArr;
        [hour, minute] = timeArr;
    }

    //checks if date and time are after the current day
    //accounts for up to 15 minutes delay
    const invalidTime = (month, day, year, hour, minute) => {
        const today = new Date()
        const [currhour, currmin, currmon, currday, curryear] = [today.getHours(), today.getMinutes(), today.getMonth(), today.getDay(), today.getFullYear()]
    }

    const [response, setRes] = useState()

    //button function to send info
    const send = () => {
        formatTemp(date, time)
        const info = {
            "month": month,
            "day": day,
            "year": year,
            "hour": hour,
            "minute": minute,
            "gmail": gmail,
            "msg": msg
        }
        postFetch("/", info).then(res => { setRes(res) })
    }

    return (
        <div id="app">
            <div id="when">
                <div id="date" className="when">
                    <label className="labels">Date:</label>
                    <input type="date" id="date-input" onChange={sDate} />
                </div>
                <div id="time" className="when">
                    <label className="labels">Time:</label>
                    <input type="time" id="time-input" onChange={sTime} />
                </div>
            </div>
            <div id="gmail">
                <label className="labels">Gmail:</label>
                <input type="text" id="gmail-input" onChange={sGmail} />
            </div>
            <div id="para">
                <p className="labels" id="msg-label">Message:</p>
                <textarea id="msg-input" rows="10" cols="100" onChange={sMsg}></textarea>
            </div>
            <div id="attach">
                <label for="attack-input" id="custom-attach-input">
                    <input type="file" id="attach-input" />
                    <span className="text">Add Files</span>
                </label>
            </div>
            <div id="send">
                <button id="send-btn" onClick={send}>
                    Send
                </button>
            </div>
        </div>
    )
}

export default Home;
