import React from "react";
import '../CollectGame.css'

export default CollectGame;

let InGame = false;

let trash;
let recycler_bean;
let score = 0;
let types = ["recyclable", "non_recyclable"];

function CollectGame() {
    return (
        <>
            <div onLoad={GameHandler()} className={"canvas"}>
                <div>
                    <button onClick={motion}>Start</button>
                </div>
            </div>
        </>
    )
}

function GameHandler() {
    GameArea.init();
    trash = new Object(50, 50, Math.floor(Math.random() *(0.8*window.innerWidth-150)), 20, types[Math.floor(Math.random() * 2)]);
    recycler_bean = new Object(150, 40,(0.8*window.innerWidth-150)/2, window.innerHeight-40, "recycler_bean");
}

let GameArea = {
    canvas: document.createElement("canvas"),
    init: function () {
        this.canvas.width = window.innerWidth*0.8;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            GameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            GameArea.key = false;
        })
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

function Object(width, height, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        let ctx;
        ctx = GameArea.context;
        if (this.type === "non_recyclable") {
            ctx.fillStyle = "red";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        } else if (this.type === "recycler_bean") {
            ctx.fillStyle = "green";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        } else if (this.type === "recyclable") {
            ctx.fillStyle = "blue";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function () {
        this.y += this.speedY
        this.x += this.speedX
    }
}

function updateGameArea() {
    GameArea.clear();
    trash.newPos();
    recycler_bean.newPos();
    trash.update();
    recycler_bean.update();
    keybordListener();
    checkDeath();
}

function motion() {
    trash.speedY += 5;
    InGame = true;
}

function keybordListener() {
    if (GameArea.key && GameArea.key === 37) {
        leftMove();
    }
    if (GameArea.key && GameArea.key === 39) {
        rightMove();
    }
}

function leftMove() {
    recycler_bean.x -= 10;
    if (recycler_bean.x < 0) {
        recycler_bean.x = 0;
    }
}

function rightMove() {
    recycler_bean.x += 10;
    if (recycler_bean.x > window.innerWidth*0.8 - recycler_bean.width) {
        recycler_bean.x = window.innerWidth*0.8 - recycler_bean.width;
    }
}

function Score(type, got) {
    switch (type) {
        case "recyclable":
            if (got) {
                return score +1;
            } else {
                return score -1;
            }
        case "non_recyclable":
            if (got) {
                return score -1;
            } else {
                return score +1;
            }
        default:
            return score;
    }
}

function checkDeath() {
    if (trash.y > window.innerHeight) {
        trash.y = 0;
        trash.speedY = 0;
        console.log(trash.type + "Reach position 0");
        score = Score(trash.type, false);
        console.log(score);
    }
    if (trash.y+50 > recycler_bean.y && trash.y+50 < recycler_bean.y + recycler_bean.height && trash.x > recycler_bean.x && trash.x < recycler_bean.x + recycler_bean.width) {
        trash.y = 0;
        trash.speedY = 0;
        console.log(trash.type + "Touched the recycler_bean");
        score = Score(trash.type, true);
        console.log(score);
    }
}