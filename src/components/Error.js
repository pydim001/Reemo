import React from 'react';
import "./Error.scss"

function Error(props) {
    return (
        <div id="err-comp">
            The time and date you entered has to be in the future.
        </div>
    );
}

export default Error;