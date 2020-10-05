// VARIABLES
const colorA = document.querySelector('.colorA');
const colorB = document.querySelector('.colorB');
const body = document.getElementById('gradient');
const css = document.querySelector("h3");


//EVENT LISTENERS
colorA.addEventListener('input', function () {
	colorChange();
	textChange();
});

colorB.addEventListener('input', function () {
	colorChange();
	textChange();
});

//FUNCTIONS
function colorChange(){
	body.style.background = "linear-gradient(to right, "+ colorA.value +", " + colorB.value + ")"
};

function textChange(){
	css.innerText = body.style.background + ";"
}