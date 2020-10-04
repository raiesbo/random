
let game = {
	'min': 1,
	'max': 10
};



document.addEventListener("DOMContentLoaded", function() {
	console.log("ready");
	game.output = document.querySelector('.output');
	game.message = document.querySelector('.message');
	game.guessInput = document.querySelector('input');
	game.btn = document.querySelector('button');
	game.btn.addEventListener('click', guessValue);

	init();
})

function guessValue() {
	if(game.btn.classList.contains("replay")) {
		init()
		game.btn.innerHTML = "Guess";
		game.guessInput.style.display = "block";
		game.btn.classList.remove("replay");
	} else {
		game.guesses++;
		let tempGuess = Number(game.guessInput.value);
		game.guessInput.value = "";
		if(isNaN(tempGuess)) {
			message("Please enter only Digits", "#b83b5e");
		} else if (tempGuess === game.num) {
			message(`Correct! It was ${game.num}. It took you ${game.guesses} guesses`, "#679b9b");
			gameOver();
		} else {
			let holder = tempGuess > game.num ? {
				"color":'#637373',
				"message":'Too high'
			} : {
				"color":'#b83b5e',
				"message":'Too low'
			};
			message(holder.message, holder.color);
			
		}
		console.log(game.num);
	}
	
}

function gameOver() {
	game.btn.innerHTML = "Restart Game";
	game.guessInput.style.display = "none";
	game.btn.classList.add("replay");
	game.max+=5;
}

function init() {
	game.guesses = 0;
	game.num =randomNum(game.min,game.max);
	let tempMes = `Guess a number from ${game.min} to ${game.max}`
	message(tempMes, '#637373');
}


function randomNum (min, max) {
	return Math.floor(Math.random()*(max - min + 1)+min);
}


function message(mes, clr) {
	game.message.innerHTML = mes;
	game.message.style.color = clr || "black";
	game.guessInput.style.borderColor = clr || "black";
	game.btn.style.backgroundColor = clr || "black";
	game.btn.style.color = "white";

}