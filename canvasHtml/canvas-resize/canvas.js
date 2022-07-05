const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// context
const c = canvas.getContext('2d');

// Rectangle arguments: x, y, width, height
// c.fillStyle = 'rgba(0,0,0,0.5)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0,0,0,0.2)';
// c.fillRect(300, 500, 100, 100);
// c.fillStyle = 'rgba(0,0,0,0.8)';
// c.fillRect(700, 200, 100, 100);

// console.log(c)


// Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "blue"
// c.stroke();

// Arc / circle
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.stroke();

// for (let i = 0; i < 100; i++) {
//     let x = Math.random() * window.innerWidth;
//     let y = Math.random() * window.innerHeight;

//     let red = Math.random() * 255;
//     let green = Math.random() * 255;
//     let blue = Math.random() * 255;
//     let a = Math.random();

//     c.beginPath();
//     c.arc(x, y, 50, 0, Math.PI * 2, false);
//     c.strokeStyle = `rgba(${red},${green},${blue},${a})`;
//     c.stroke();
// }

function Circle(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // c.strokeStyle = 'blue';
        c.fillStyle = color;
        c.fill();
        // c.stroke();
    }

    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
    
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
    
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

const circleArray = [];

for (let i = 0; i < 100; i++) {
    let radius = 30;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;;
    let dx = (Math.random() - 0.5) * 5;
    let dy = (Math.random() - 0.5) * 5;
    

    let red = Math.random() * 255;
    let green = Math.random() * 255;
    let blue = Math.random() * 255;
    let a = Math.random();
    let color = `rgba(${red},${green},${blue},${a})`

    const circle = new Circle(x, y, dx, dy, radius, color);
    circleArray.push(circle);
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    circleArray.forEach(circ => {
        circ.update();
    });
}

animate();