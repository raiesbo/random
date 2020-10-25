//VARIABLE DEFINITION
const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext('2d');
const player = {x:50,y:50};

function draw() {
	ctx.fillStyle = '#ffffff';
	ctx.fillrect(player.x,player.y,100,100);
	ctx.font = '24px serif';
	ctx.textAlign = 'center';
	ctx.fillstyle = 'red';
	ctx.fillText(output, 300,30)
}

draw()