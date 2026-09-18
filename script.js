const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20;
let snake;
let food;
let score;

// Initial snake
snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

// Initial food
food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
};

// Initial score
score = 0;

// Direction of snake
let direction;

// Key events
document.addEventListener('keydown', directionControl);

function directionControl(event) {
    if (event.keyCode == 37 && direction != 'RIGHT') {
        direction = 'LEFT';
    } else if (event.keyCode == 38 && direction != 'DOWN') {
        direction = 'UP';
    } else if (event.keyCode == 39 && direction != 'LEFT') {
        direction = 'RIGHT';
    } else if (event.keyCode == 40 && direction != 'UP') {
        direction = 'DOWN';
    }
}

// Drawing function
function draw() {
    ctx.drawImage(background, 0, 0);

    for (let i = 0; i < snake.length; i++) {
        ctx.drawImage(snakeImage, snake[i].x, snake[i].y);
    }

    ctx.drawImage(foodImage, food.x, food.y);

    // Snake head
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Which direction
    if (direction == 'LEFT') snakeX -= box;
    if (direction == 'UP') snakeY -= box;
    if (direction == 'RIGHT') snakeX += box;
    if (direction == 'DOWN') snakeY += box;

    // If snake eats the food
    if (snakeX == food.x && snakeY == food.y) {
        eat.play();
        score++;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
    } else {
        // Remove the tail
        snake.pop();
    }

    // New Head
    let newHead = {
        x: snakeX,
        y: snakeY
    };

    // Game Over
    if (snakeX < 0 || snakeX > 390 || snakeY < 0 || snakeY > 390) {
        gameOver.play();
        clearInterval(game);
    }

    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x == newHead.x && snake[i].y == newHead.y) {
            gameOver.play();
            clearInterval(game);
        }
    }

    snake.unshift(newHead);

    // Score
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
}

// Call draw function every 100ms
let game = setInterval(draw, 100);

// Load images
let background = new Image();
background.src = 'background.jpg';

let snakeImage = new Image();
snakeImage.src = 'snake.png';

let foodImage = new Image();
foodImage.src = 'food.png';

// Load audio
let eat = new Audio();
eat.src = 'eat.mp3';

let gameOver = new Audio();
gameOver.src = 'gameover.mp3';
