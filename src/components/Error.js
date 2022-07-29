import React from 'react';

function Error(props) {
    if (props.error) {
        return (
            <div id="err-comp">
                The time and date you entered has to be atleast fifteen minutes in the future.
            </div>
        );
    }
}

export default Error;