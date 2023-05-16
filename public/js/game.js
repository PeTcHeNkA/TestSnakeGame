const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
//load image
let a = new Image(); a.src = 'img/ground.png';
let b = new Image(); b.src = 'img/food.png';
const imgur = {
    ground: a,
    food: b
};
//load music
const music = {
    death: new Audio('sound/death.mp3'),
    eating: new Audio('sound/eating.mp3')
};
//load font
var f = new FontFace('PressStart2P', 'url(font/PressStart2P.ttf)');
f.load().then(function (font) {
    document.fonts.add(font);
});
//config and etc :D
let box = 32;
let score = 0;
let food = [];
let snake = [];
let dir;
//snake spawn
snake[0] = {
    x: 9 * box,
    y: 10 * box
};
//mini-spawner
toStarter(3)
function toStarter(i) {
    //carrot spawn with cooldown
    toSpawn(0).then(() => {
        toSpawn(1).then(() => {
            toSpawn(2).then(() => {})
        })
    })
}
async function toSpawn(i) {
    await new Promise((resolve, reject) => setTimeout(resolve, 2500));
    for (let ms = 0; ms < snake.length; ms++) {
        for (let ms1 = 0; ms1 != i;) {
            let x1 = Math.floor((Math.random() * 17 + 1)) * box;
            let y1 = Math.floor((Math.random() * 15 + 3)) * box;
            if ((snake[ms].x != x1) && (snake[ms].y != y1)) {
                food[i] = {
                    x: x1,
                    y: y1
                }
                ms1++
            }
        }
    }
}
//eventor register
/*
var event = null;

document.addEventListener('mousedown', function (e) {
    event = e;
});
document.addEventListener('mousemove', function (e) {
    if (event) {
        if(e.screenX < event.screenX) {
            dir = 'left';
        }
        else if(e.screenX > event.screenX) {
            console.log('Право')
            dir = 'right'
        }
        else if(e.screenY < event.screenY) {
            dir = 'up';
        }
        else if(e.screenY > event.screenY) {
            dir = 'down';
        }
    }
});
document.addEventListener('mouseup', function (e) {
    event = null;
}); */

document.addEventListener('keydown', direction);
function direction(event) {
    if ((event.keyCode == 68 || event.keyCode == 39) && dir != 'left')
        dir = 'right';
    else if ((event.keyCode == 83 || event.keyCode == 40) && dir != 'up')
        dir = 'down';
    else if ((event.keyCode == 65 || event.keyCode == 37) && dir != 'right')
        dir = 'left';
    else if ((event.keyCode == 87 || event.keyCode == 38) && dir != 'down')
        dir = 'up';
    else if(event.keyCode == '82') {
        location.reload()
    }
}
//game helper
function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y) {
            clearInterval(game);
            gameOverStart();
        }
    }
}
function gameOverStart() {
    clearInterval(game);
    ctx.fillStyle = 'white';
    ctx.font = '55px PressStart2P';
    ctx.textAlighn = 'center';
    ctx.fillText('Game Over!', 40, 365);
    music.death.play();
}
function checkFood(snakeX,snakeY,food) {
    return (snakeX == food.x && snakeY == food.y) 
}
function checkerWall(snakeX, snakeY,box) {
    return (snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17)
}
//start game
let game = setInterval(drawGame, 100);

function drawGame() {
    //mannager snake x,y
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    //draw score and ground
    ctx.drawImage(imgur.ground, 0, 0);
    ctx.fillStyle = 'white';
    ctx.font = '32px PressStart2P'
    ctx.fillText(score, box * 2.4, box * 1.7);
    //draw snake and carrot
    if(!checkerWall(snakeX,snakeY,box)) {
        if(food[0] && !checkFood(snakeX,snakeY,food[0])) ctx.drawImage(imgur.food, food[0].x, food[0].y);
        if(food[1] && !checkFood(snakeX,snakeY,food[1])) ctx.drawImage(imgur.food, food[1].x, food[1].y);
        if(food[2] && !checkFood(snakeX,snakeY,food[2])) ctx.drawImage(imgur.food, food[2].x, food[2].y);
        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = i == 0 ? 'green' : '#00FF7F';
            if(i+1 == snake.length && i != 0) ctx.fillStyle = 'red'
            ctx.fillRect(snake[i].x+5, snake[i].y+5, box-8, box-8);
            //ctx.beginPath();
            //ctx.fillStyle = i == 0 ? '#3CB371' : ' #00FF7F';
            //ctx.arc(snake[i].x+15, snake[i].y+15, box/2, 0, 2*Math.PI, false);
            //ctx.fill();
        }
    }
    //checker eating --event
    if(food[0] && checkFood(snakeX,snakeY,food[0])) eating(0);
    else if(food[1] && checkFood(snakeX,snakeY,food[1])) eating(1);
    else if(food[2] && checkFood(snakeX,snakeY,food[2])) eating(2);
        else snake.pop()

    function eating(i) {
        food[i] = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box
        }
        music.eating.play();
        score++;
    }
    //check wall to game over
    if(checkerWall(snakeX,snakeY,box)) {
        gameOverStart()
    }

    if (dir == 'left') snakeX -= box;
    if (dir == 'right') snakeX += box;
    if (dir == 'up') snakeY -= box;
    if (dir == 'down') snakeY += box;
    let newHead = {
        x: snakeX,
        y: snakeY
    };
    eatTail(newHead, snake);
    snake.unshift(newHead);
}