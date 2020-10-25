import React from "react";

import './setTimer.styles.css';

class SetTimer extends React.Component {


    render() {
        return(
            <div className="setTimer">

            <button onClick={this.props.plusMinutes} >
                +5 Minutes
            </button>

            <button onClick={this.props.minusMinutes} >
                -5 Minutes
            </button>
            
        </div>
        )
    }
};

export default SetTimer;