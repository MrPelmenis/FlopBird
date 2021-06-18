"use strict"
let bird;
let walls;
let canvas;
let ctx;
let speed = 1;
let epikMode = true;

function start() {
    canvas = document.getElementById("boardCanvas");
    ctx = canvas.getContext("2d");
    bird = new Bird(300, screen.height / 2);
    walls = new Walls();
    window.requestAnimationFrame(update);
}

class Bird {
    constructor(x, y) {
        this.x = x;
        this._y = y;
        this.div = document.getElementById("birdDiv");
        this.ySpeed = 0;
        this.height = 40;
        this.width = 40;
        this.move();
        this.fallOrFly = false; //true - lido.... false - kriit
        document.onmousedown = () => { this.fallOrFly = true };
        document.onmouseup = () => { this.fallOrFly = false };
    }

    move() {
        if (epikMode) {
            if (this.fallOrFly) {
                this.ySpeed = -3;
            } else {
                this.ySpeed = +3;
            }
        } else {
            if (this.fallOrFly) {
                this.ySpeed -= 0.3;
            } else {
                this.ySpeed += 0.3;
            }
        }

        if (this.y + this.height >= canvas.height) {
            this.y -= this.ySpeed;
            this.ySpeed /= 1.5;
            this.ySpeed *= -1;
        }

        if (this.y <= 0) {
            this.y -= this.ySpeed * 2;
            this.ySpeed /= 1.5;
            this.ySpeed *= -1;
        }


        this.y += this.ySpeed;

        setTimeout(() => {
            this.move();
        }, 10 / speed);
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }


}

function drawBird() {
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height)
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBird();
    drawWalls();
    checkCollisions();
    speed += 0.00001;
    window.requestAnimationFrame(update);
}

function checkCollisions() {
    walls.walls.forEach(wall => {
        if (bird.x + bird.width > wall.x && bird.x - bird.width < wall.x) {
            if (!(bird.y > wall.y - bird.height * speed / 2 - bird.height / 2 &&
                bird.y + bird.height < wall.y + bird.height * speed / 2 + bird.height / 2)) {
                console.log("gejs");
            }
        }
    })
}


function drawWalls() {
    walls.walls.forEach(wall => {
        ctx.beginPath();
        ctx.moveTo(wall.x, 0);
        ctx.lineTo(wall.x, wall.y - bird.height * speed / 2 - bird.height / 2);
        ctx.moveTo(wall.x, wall.y + bird.height * speed / 2 + bird.height / 2);
        ctx.lineTo(wall.x, canvas.height);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 10;
        ctx.stroke();
    })
}

class Walls {
    constructor() {
        this.x = Math.floor(Math.random() * 1111);
        this.speed = 10;
        this.walls = [];
        this.moveWalls();
        this.generateWall();
    }

    generateWall() {
        let currentY = this.calculateY();
        this.walls.push({ x: screen.width * 1.1, y: currentY });
        setTimeout(() => {
            this.generateWall();
        }, 2000 / speed * 2);
    }

    calculateY() {
        return (50 * (Math.sin(3 * this.x) - 2 * Math.cos(this.x) + 2 * Math.sin(3 * this.x) - 3 * Math.sin(3 * this.x) + 3 * Math.sin(2 * this.x) - 3 * Math.sin(this.x / 2) + 1.6 * Math.sin(this.x))) + 500;
    }

    moveWalls() {
        this.walls.forEach((wall) => {
            wall.x -= speed;
        });
        this.x--;

        this.walls = this.walls.filter(wall => {
            return wall.x > -20;
        });

        setTimeout(() => {
            this.moveWalls();
        }, 1 / speed);
    }
}