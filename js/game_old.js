const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const gameOver = document.getElementById("gameOver").getContext("2d");

const groundImg = new Image();
groundImg.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

let box = 32;

let score = 0;

let food = [];
food[0] = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
};
food[1] = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
};
food[2] = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
};

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

document.addEventListener("keydown", direction);

let dir;

function direction(event) {
    if ((event.keyCode == 68 || event.keyCode == 39) && dir != "left")
        dir = "right";
    else if ((event.keyCode == 83 || event.keyCode == 40) && dir != "up")
        dir = "down";
    else if ((event.keyCode == 65 || event.keyCode == 37) && dir != "right")
        dir = "left";
    else if ((event.keyCode == 87 || event.keyCode == 38) && dir != "down")
        dir = "up";
}

function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y) {
            clearInterval(game);
            ctx.fillStyle = "white";
            ctx.font = "55px PressStart2P"
            ctx.textAlign = "center";
            ctx.fillText("Game Over!", 315, 365);
            var audio = new Audio('sound/death.mp3');
            audio.play();
        }
    }
}

function drawGame() {

    ctx.drawImage(groundImg, 0, 0);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (!(snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17)) {
        for (let i = 0; i < snake.length; i++) {
            ctx.drawImage(foodImg, food[0].x, food[0].y);
            ctx.drawImage(foodImg, food[1].x, food[1].y);
            ctx.drawImage(foodImg, food[2].x, food[2].y);
            ctx.fillStyle = i == 0 ? "green" : "red";
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
        }
    }
    var f = new FontFace('PressStart2P', 'url(font/PressStart2P.ttf)');

    f.load().then(function (font) {
        document.fonts.add(font);
    });
    ctx.fillStyle = "white";
    ctx.font = "35px PressStart2P"
    ctx.fillText(score, box * 2.5, box * 1.7);

    function eating() {
        if ((snakeX == food[0].x && snakeY == food[0].y) || (snakeX == food[1].x && snakeY == food[1].y) || (snakeX == food[2].x && snakeY == food[2].y)) {
            var audio = new Audio('sound/eating.mp3');
            score++;
            audio.play();
            if ((snakeX == food[0].x && snakeY == food[0].y)) {
                food[0] = {
                    x: Math.floor((Math.random() * 17 + 1)) * box,
                    y: Math.floor((Math.random() * 15 + 3)) * box,
                };
            }
            if ((snakeX == food[1].x && snakeY == food[1].y)) {
                food[1] = {
                    x: Math.floor((Math.random() * 17 + 1)) * box,
                    y: Math.floor((Math.random() * 15 + 3)) * box,
                };
            }
            if ((snakeX == food[2].x && snakeY == food[2].y)) {
                food[2] = {
                    x: Math.floor((Math.random() * 17 + 1)) * box,
                    y: Math.floor((Math.random() * 15 + 3)) * box,
                };
            }
        } else snake.pop();
    }
    eating();

    if (snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17) {
        var audio = new Audio('sound/death.mp3');
        audio.play();
        ctx.fillStyle = "white";
        ctx.font = "55px PressStart2P"
        ctx.textAlign = "center";
        ctx.fillText("Game Over!", 315, 365);
        clearInterval(game)
    }

    if (dir == "left") snakeX -= box;
    if (dir == "right") snakeX += box;
    if (dir == "up") snakeY -= box;
    if (dir == "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake);

    snake.unshift(newHead);
}

let game = setInterval(drawGame, 100);