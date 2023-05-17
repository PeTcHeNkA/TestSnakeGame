const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Loading images
let groundImg = new Image();
groundImg.src = 'img/ground.png';

let foodImg = new Image();
foodImg.src = 'img/food.png';

// Loading sounds
const sound = {
    death: new Audio('sound/death.mp3'),
    eating: new Audio('sound/eating.mp3')
};

// Loading font
var font = new FontFace('PressStart2P', 'url(font/PressStart2P.ttf)');
font.load().then(function (loadedFont) {
    document.fonts.add(loadedFont);
});

// Constants and variables
const boxSize = 32; // Cell size
let score = 0; // Score
let food = []; // Array for food
let snake = []; // Array for snake
let direction; // Direction of movement

// Creating snake
snake[0] = {
    x: 9 * boxSize,
    y: 10 * boxSize
};

// Function for creating food with delay and checking for overlap with snake
function createFood(delay) {
    setTimeout(function () {
        let foodX = Math.floor((Math.random() * 17 + 1)) * boxSize;
        let foodY = Math.floor((Math.random() * 15 + 3)) * boxSize;
        let isOverlapping = false;
        for (let i = 0; i < snake.length; i++) {
            if (snake[i].x == foodX && snake[i].y == foodY) {
                isOverlapping = true;
                break;
            }
        }
        if (!isOverlapping) {
            food.push({
                x: foodX,
                y: foodY
            });
        } else {
            createFood(delay); // Repeat the attempt if there is an overlap
        }
    }, delay);
}

// Function for creating three units of food at the start of the game
function createFoodAtStart() {
    createFood(0);
    createFood(2500);
    createFood(5000);
}

createFoodAtStart(); // Calling the function

// Function for handling key presses
function handleKeyDown(event) {
    if ((event.keyCode == 68 || event.keyCode == 39) && direction != 'left')
        direction = 'right';
    else if ((event.keyCode == 83 || event.keyCode == 40) && direction != 'up')
        direction = 'down';
    else if ((event.keyCode == 65 || event.keyCode == 37) && direction != 'right')
        direction = 'left';
    else if ((event.keyCode == 87 || event.keyCode == 38) && direction != 'down')
        direction = 'up';
    else if (event.keyCode == '82') {
        location.reload();
    }
}

document.addEventListener('keydown', handleKeyDown);

// Function for checking collision of snake head with body
function checkCollision(head, body) {
    for (let i = 0; i < body.length; i++) {
        if (head.x == body[i].x && head.y == body[i].y) {
            return true;
        }
    }
    return false;
}

// Function for checking boundary of the field
function checkBoundary(x, y, size) {
    return x < size || x > size * 17 || y < size * 3 || y > size * 17;
}

// Function for ending the game
function gameOver() {
    clearInterval(gameLoop);
    ctx.fillStyle = 'white';
    ctx.font = '52px PressStart2P';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
    sound.death.play();
}

// Function for drawing the game
function drawGame() {

    // Getting the coordinates of the snake head
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Drawing the background and score
    ctx.drawImage(groundImg, 0, 0);
    ctx.fillStyle = 'white';
    ctx.font = '32px PressStart2P';
    ctx.fillText(score, boxSize * 2.4, boxSize * 1.7);

    // Drawing the snake and food
    if (!checkBoundary(snakeX, snakeY, boxSize)) {
        for (let i = 0; i < food.length; i++) {
            if (snakeX != food[i].x || snakeY != food[i].y) {
                ctx.drawImage(foodImg, food[i].x, food[i].y);
            }
        }
        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = i == 0 ? 'green' : '#00FF7F';
            if (i + 1 == snake.length && i != 0) ctx.fillStyle = 'red';
            ctx.fillRect(snake[i].x + 5, snake[i].y + 5, boxSize - 8, boxSize - 8);
        }
    }

    // Checking if eating food and increasing snake length
    let hasEaten = false;
    for (let i = 0; i < food.length; i++) {
        if (snakeX == food[i].x && snakeY == food[i].y) {
            food.splice(i, 1); // Removing the eaten food from the array
            createFood(2500); // Creating new food with delay
            sound.eating.play(); // Playing the sound
            score++; // Increasing the score
            hasEaten = true;
        }
    }
    if (!hasEaten) {
        snake.pop();
    }


    // Checking if going out of bounds and ending the game
    if (checkBoundary(snakeX, snakeY, boxSize)) {
        gameOver();
        return;
    }

    // Changing the coordinates of the snake head depending on the direction
    if (direction == 'left') snakeX -= boxSize;
    if (direction == 'right') snakeX += boxSize;
    if (direction == 'up') snakeY -= boxSize;
    if (direction == 'down') snakeY += boxSize;

    let newHead = {
        x: snakeX,
        y: snakeY
    }; // Creating a new head

    // Checking if colliding with the body and ending the game
    if (checkCollision(newHead, snake)) {
        gameOver();
        return;
    }

    snake.unshift(newHead); // Adding the new head to the beginning of the snake array
}

// Starting the game with an interval of 100 ms
let gameLoop = setInterval(drawGame, 100);