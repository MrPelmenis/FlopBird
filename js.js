"use strict"
let bird;
let walls;
let canvas;
let ctx;
function start() {
    canvas = document.getElementById("boardCanvas");
    ctx = canvas.getContext("2d");
    bird = new Bird(300, screen.height / 2);
    walls = new Walls();
    window.requestAnimationFrame(draw);
}

class Bird {
    constructor(x, y) {
        this.x = x;
        this._y = y;
        this.div = document.getElementById("birdDiv");
        this.ySpeed = 0;
        this.move();
        this.fallOrFly = false; //true - lido.... false - kriit
        document.onmousedown = () => { this.fallOrFly = true };
        document.onmouseup = () => { this.fallOrFly = false };
    }

    move() {
        if (this.fallOrFly) {
            this.ySpeed -= 0.3;
        } else {
            this.ySpeed += 0.3;
        }
        this.y += this.ySpeed;

        setTimeout(() => {
            this.move();
        }, 20);
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }


}

function drawBird() {
    ctx.fillRect(bird.x, bird.y, 40, 40)
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBird();
    drawWalls();
    window.requestAnimationFrame(draw);
}

function drawWalls() {
    walls.walls.forEach(wall => {
        ctx.beginPath();
        ctx.moveTo(wall.x, 0);
        ctx.lineTo(wall.x, wall.y - 50);
        ctx.moveTo(wall.x, wall.y + 50);
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
        }, 2000);
    }

    calculateY() {
        return (50 * (Math.sin(3 * this.x) - 2 * Math.cos(this.x) + 2 * Math.sin(3 * this.x) - 3 * Math.sin(3 * this.x) + 3 * Math.sin(2 * this.x) - 3 * Math.sin(this.x / 2) + 1.6 * Math.sin(this.x))) + 500;
    }

    moveWalls() {
        this.walls.forEach((wall) => {
            wall.x--;
        });
        this.x--;
        setTimeout(() => {
            this.moveWalls();
        }, 1);
    }
}