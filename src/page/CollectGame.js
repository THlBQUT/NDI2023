import React from "react";
import '../CollectGame.css'

export default CollectGame;

let InGame = false;

let objects = [];
let trash;
let recycler_bean;
let score = 0;
let types = ["recyclable", "non_recyclable"];

function CollectGame() {
    return (
        <div>
            <h1>Score : <span id={"score"}>{score}</span></h1>
            <div onLoad={GameHandler()} className={"canvas"}>
                <div>
                    <button onClick={Start}>Start</button>
                </div>
            </div>
        </div>
    )
}

function GameHandler() {
    GameArea.init(window.innerWidth*0.5, window.innerHeight);
    recycler_bean = new Object(150, 40,(GameArea.canvas.width-150)/2, window.innerHeight-40, "recycler_bean");
}

let GameArea = {
    canvas: document.createElement("canvas"),
    init: function (canvas_width, canvas_height) {
        this.canvas.width = canvas_width;
        this.canvas.height = canvas_height;
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

function createTrash() {
    trash = new Object(50, 50, Math.floor(Math.random() * (GameArea.canvas.width - 150)), 20, types[Math.floor(Math.random() * 2)]);
    objects.push(trash);
    motion(objects);
}

function updateGameArea() {
    GameArea.clear();

    objects.forEach(function (object) {
        object.newPos();
        object.update();
    }, this);

    recycler_bean.newPos();
    recycler_bean.update();

    keybordListener();
    checkDeath();
}

function Start() {
    InGame = true;
    createTrash();
    setInterval(createTrash, 5000);
}

function motion(objects) {
    objects.forEach(function (object) {
        object.speedY = 5;
    }, this);
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
    if (recycler_bean.x > GameArea.canvas.width - recycler_bean.width) {
        recycler_bean.x = GameArea.canvas.width - recycler_bean.width;
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
    if (objects.length > 0) {
        objects.forEach(function (object) {
            checkTrash(object);
        }, this);
    }
    document.getElementById("score").innerHTML = score;
}

function checkTrash(trash) {
    if (trash.y > GameArea.canvas.height) {
        trash.y = 0;
        trash.speedY = 0;
        console.log(trash.type + "Reach position 0");
        score = Score(trash.type, false);
        console.log(score);
        objects.splice(objects.indexOf(trash), 1);
    }
    if (trash.y+50 > recycler_bean.y && trash.y+50 < recycler_bean.y + recycler_bean.height && trash.x > recycler_bean.x && trash.x < recycler_bean.x + recycler_bean.width) {
        trash.y = 0;
        trash.speedY = 0;
        console.log(trash.type + "Touched the recycler_bean");
        score = Score(trash.type, true);
        console.log(score);
        objects.splice(objects.indexOf(trash), 1);
    }
}