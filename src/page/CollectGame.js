import React from "react";
import '../CollectGame.css'

export default CollectGame;

let InGame = false;

let objects = [];
let trash;
let recycler_bin;
let score = 0;
let types = ["recyclable", "non_recyclable"];

function CollectGame() {
    return (
        <div>
            <img id={"RecyclerBean"} src={"https://www.w3schools.com/jsref/img_the_scream.jpg"} alt={"RecyclerBean"}/>
            <div id={"score-bar"}>
                <h1 id={"score"}>Score : {score}</h1>
            </div>
            <div id={"start-box"}>
                <h2 id={"title"}>Recycle Game</h2>
                <p>The Rules :</p>
                <ul>
                    <li>Recyclable trash must be collected</li>
                    <li>Non-recyclable trash must be avoided</li>
                    <li>Each trash collected gives you 1 point</li>
                    <li>Each trash avoided makes you lose 1 point</li>
                    <li>Have fun !</li>
                </ul>
                <button id={"start-btn"} onClick={Start}>Start</button>
            </div>

            <div onLoad={GameHandler()} className={"canvas"}></div>
        </div>
    )
}

function GameHandler() {
    if (window.innerWidth < 500) {
        GameArea.init(window.innerWidth, window.innerHeight);
    } else {
        GameArea.init(window.innerWidth*0.5, window.innerHeight);
    }
    recycler_bin = new Object(150, 40,(GameArea.canvas.width-150)/2, window.innerHeight-120, "recycler_bin");
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
        });

        window.addEventListener('keyup', function (e) {
            GameArea.key = false;
        });
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
        let img1 = new Image();
        img1.src = "https://media.discordapp.net/attachments/1030397596092612651/1182567350449479741/banana-peel.png?ex=65852aab&is=6572b5ab&hm=05ceac8912ad677496fa4c95697d728578b5358092491844b2499720c9df2ca5&=&format=webp&quality=lossless"
        ctx.drawImage(img1, this.x, this.y, this.width, this.height);

    } else if (this.type === "recyclable") {
        let img2 = new Image();
        img2.src = "https://media.discordapp.net/attachments/1030397596092612651/1182567265632276511/30734915-vector-ouvert-carton-plat-icC3B4ne.png?ex=65852a97&is=6572b597&hm=cc540edd77f9c1b51a5a63b761caa3ac7309f7dbf3e0d1d693c95a1ac69dfe64&=&format=webp&quality=lossless"
        ctx.drawImage(img2, this.x, this.y, this.width, this.height);

    } else if (this.type === "recycler_bin") {
        let img3 = new Image();
        img3.src = "https://media.discordapp.net/attachments/1182367068671184968/1182573801700069437/image.png?ex=658530ad&is=6572bbad&hm=5e734d0ba19377a96ddd79b756da65821e02af8754b7bff237061b24faffda6e&=&format=webp&quality=lossless";
        ctx.drawImage(img3, this.x, this.y, this.width, this.height);
    }
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

    recycler_bin.newPos();
    recycler_bin.update();

    keybordListener();
    checkDeath();
}

function Start() {
    InGame = true;
    document.getElementById("start-box").style.display = "none";
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
    recycler_bin.x -= 10;
    if (recycler_bin.x < 0) {
        recycler_bin.x = 0;
    }
}

function rightMove() {
    recycler_bin.x += 10;
    if (recycler_bin.x > GameArea.canvas.width - recycler_bin.width) {
        recycler_bin.x = GameArea.canvas.width - recycler_bin.width;
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
    document.getElementById("score").innerHTML = "Score : " + score;
}

function checkTrash(trash) {
    if (trash.y > GameArea.canvas.height) {
        trash.y = 0;
        trash.speedY = 0;
        score = Score(trash.type, false);
        objects.splice(objects.indexOf(trash), 1);
    }
    if (trash.y+50 > recycler_bin.y && trash.y+50 < recycler_bin.y + recycler_bin.height && trash.x > recycler_bin.x && trash.x < recycler_bin.x + recycler_bin.width) {
        trash.y = 0;
        trash.speedY = 0;
        score = Score(trash.type, true);
        objects.splice(objects.indexOf(trash), 1);
    }
}