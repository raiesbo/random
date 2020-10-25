import React from 'react';
import './App.css';
import Time from './components/time.component';
import SetTimer from './components/setTimer.component';

class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			miliSeconds: 1500000,
			button: true
		};

	}
	
	tick = () => {
		if(this.state.miliSeconds > 0) {
			this.setState({
				miliSeconds: this.state.miliSeconds - 1000
			})
		} else {
			//Stop loop
			clearInterval(this.timerLoop)

			//Alert message
			alert("Your have achived a Pomodoro!")

			//Reset Time
			this.setState({
				miliSeconds: 1500000,
				button: !this.state.button
			})
		}
	}

	// Handles the Start/Stop button
	timeControl = () => {
		if (this.state.button) {
			//Start timer loop
			this.timerLoop = setInterval(() => {
				this.tick()
			}, 1000);

		} else {
			//Stop loop
			clearInterval(this.timerLoop)

			//Reset the countdown
			this.setState({
				miliSeconds: 1500000
			})

		}

		this.setState({
			button: !this.state.button
		})

	}

	//Sets the proper time
	plusMinutes = () => {
		return this.setState({
			miliSeconds: this.state.miliSeconds + 300000
		})
	}

	minusMinutes = () => {
		return this.setState({
			miliSeconds: this.state.miliSeconds - 300000
		})
    }


	render () {
		return (
			<div className="App">
				<div className="container">

					<Time miliSeconds={this.state.miliSeconds} />

					<div className="buttons">
					{this.state.button ? <SetTimer plusMinutes={this.plusMinutes} minusMinutes={this.minusMinutes} /> : null } 
					</div>
					
					<div className="start">
						<button
							onClick={this.timeControl}
							className="controller"
						>
							{this.state.button? "START" : "STOP"}
						</button>
					</div>
				</div>
			</div>
		  );
	}
};



export default App;

