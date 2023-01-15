import { useRef, useState } from "react";
import postFetch from "../fetch";
import Error from "../components/Error";
import "./Home.scss";

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

    const fileRef = useRef(null)
    const [fileExceed, setFileExceeded] = useState("")

    const getFiles = () => {
        setFileExceeded("")
        fileRef.current.click()
    }
    const upload = (e) => {
        let total = 0;
        for(const file of e.target.files){
            total += file.size
            if(total > 10e6){
                setFileExceeded("Your files exceed 10MB")
                break
            }
        }
    }

    //formats date
    const formatTemp = (date, time) => {
        const dateArr = date.split("-");
        const timeArr = time.split(":");
        [year, month, day] = dateArr.map(val => parseInt(val));
        [hour, minute] = timeArr.map(val => parseInt(val));
    }

    //checks if date and time are after the current day
    const validTime = (month, day, year, hour, minute) => {
        const today = new Date()
        const [currhour,
            currmin,
            currmon,
            currday,
            curryear] = [today.getHours(),
            today.getMinutes(),
            today.getMonth(),
            today.getDay(),
            today.getFullYear()]
            // console.log(month, day, year, hour, minute)
            // console.log(currmon + 1, currday + 1, curryear, currhour, currmin)
            if(curryear < year){
                return true
            }else if(curryear > year){
                return false
            }else{
                if(currmon + 1 < month){
                    return true
                }else if(currmon + 1 > month){
                    return false
                }else{
                    if(currday + 1 < day){
                        return true
                    }else if(currday + 1> day){
                        return false
                    }else{
                        if(currhour < hour){
                            return true
                        }else if(currhour > hour){
                            return false
                        }return currmin <= minute
                    }
                }
            }
    }

    // eslint-disable-next-line
    const [response, setRes] = useState()
    const [errorScreen, setErrorScreen] = useState()

    //button function to send info
    const send = () => {
        formatTemp(date, time)
        const info = {
            "month": month,
            "day": day,
            "year": year,
            "hour": hour,
            "minute": minute,
            "email": gmail,
            "msg": msg
        }
        const confirm = validTime(month, day, year, hour, minute)
        //console.log(confirm)
        if (confirm) {
            setErrorScreen(null)
            postFetch("/", info, setRes)
        }else{
            setErrorScreen(<Error />)
        }
    }

    return (
        <div id="app">
            <div id="err-msg">
                {errorScreen}
                {fileExceed}
            </div>
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
                <textarea id="msg-input" rows="10" cols="100" onChange={sMsg} maxLength="5000"></textarea>
            </div>
            <div id="attach">
                <input type="file" id="attach-input" ref={fileRef} onChange={upload} multiple />
                <button for="attack-input" id="custom-attach-input" onClick={getFiles}>
                    <span className="text">Add Files</span>
                </button>
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
