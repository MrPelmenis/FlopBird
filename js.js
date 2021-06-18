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
            this.ySpeed -= 1.5;
        } else {
            this.ySpeed += 1.5;
        }
        this.y += this.ySpeed;

        setTimeout(() => {
            this.move();
        }, 50);
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }


}

function drawBird() {

}

function draw() {
    drawBird();
    drawWalls();
    window.requestAnimationFrame(draw);
}

function drawWalls() {
    walls.walls.forEach(wall => {
        ctx.beginPath();
        ctx.moveTo(wall.x, 0);
        ctx.lineTo(wall.x, wall.y - 10);
        ctx.moveTo(wall.x, wall.y + 10);
        ctx.lineTo(wall.x, canvas.height);
    })
}

class Walls {

    constructor() {
        this.func = this.generateFunction();
        this.x = 0;
        this.speed = 10;
        this.walls = [];
        this.moveWalls();
    }

    generateWall() {
        let tempFunc;
        while (tempFunc.indexOf("x") != -1) {
            tempFunc.replace("x", `${this.x}`);
        }
        let currentY = eval(tempFunc);
        this.walls.push({ x: screen.width * 1.1, y: currentY });
    }

    moveWalls() {
        this.walls.forEach((wall) => {
            wall.x--;
        });

        setTimeout(() => {
            this.moveWalls();
        }, timeout);
    }

    generateFunction() {
        return "192*(sin(2.1x) - 2cos(0.21x) + 2sin(3x)- 3sin(3x)+ 3sin(1.7x)- 3sin(0.5x)+ 1.1sin(0.8x))";
    }

}