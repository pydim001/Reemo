import "./Home.scss"

function Home() {
    return (
        <div id="app">
            <div id="when">
                <div id="date" className="when">
                    <label className="labels">Date:</label>
                    <input type="date" id="date-input" />
                </div>
                <div id="time" className="when">
                    <label className="labels">Time:</label>
                    <input type="time" id="time-input" />
                </div>
            </div>
            <div id="gmail">
                <label className="labels">Gmail:</label>
                <input type="text" id="gmail-input" />
            </div>
            <div id="para">

            </div>
            <div id="attach">

            </div>
            <div id="send">

            </div>
        </div>
    )
}

export default Home;
