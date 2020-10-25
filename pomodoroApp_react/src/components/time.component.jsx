import React from 'react';

import './time.styles.css';

class Time extends React.Component {
    render () {
        return (
            <div className="timer">
                {
                 <p>{ `${Math.floor(this.props.miliSeconds / 60 / 1000)}:${('0' + ((this.props.miliSeconds/1000) % 60)).slice(-2)}` }</p>
                }
            </div>
        );
    }
}



export default Time;