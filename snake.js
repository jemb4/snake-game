// Initialize game variables
let canvas;
let context;
let box;
let snake;
let direction;
let food;
let game;
let maxwidth;
let maxheight;
let obstacles;
let score = 0;

// This function runs when the page is loaded
window.onload = function() {
    // Get the canvas element
    canvas = document.getElementById('game');
    // Get the 2D rendering context for the canvas
    context = canvas.getContext('2d');
    // Set the size of each square (both the snake and the food)
    box = 20;
    // Set the maximum width and height of the canvas
    maxwidth = canvas.offsetWidth;
    maxheight = canvas.offsetHeight;

    // Initialize the snake to start in the middle of the canvas
    snake = [];
    snake[0] = { x: 8 * box, y: 8 * box };
    // Set the initial direction of the snake
    direction = "right";



    // Place the food at a random position
    food = {
        x: Math.floor(Math.random() * (maxwidth/box - 1) + 1) * box,
        y: Math.floor(Math.random() * (maxheight/box - 1) + 1) * box
    }

    //Define the obstacles
    obstacles = [
        {
            x: Math.floor(Math.random() * (maxwidth/box - 1) + 1) * box, 
            y: Math.floor(Math.random() * (maxheight/box - 1) + 1) * box
        },
        {
            x: Math.floor(Math.random() * (maxwidth/box - 1) + 1) * box, 
            y: Math.floor(Math.random() * (maxheight/box - 1) + 1) * box
        },
    ];

    // Start the game loop
    game = setInterval(startGame, 100);
}

// This function draws the background
function createBG() {
    context.fillStyle = "rgb(255, 255, 255, 0.7";
    context.fillRect(0, 0, maxwidth + box, maxheight+ box);
}

// This function draws the snake
function createSnake() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "lightgreen";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// This function draws the food
function drawFood() {
    context.fillStyle = "#DEDAF4";
    context.fillRect(food.x, food.y, box, box);
}

// Draw the obstacles
function drawObstacles() {
    context.fillStyle = "#FFADAD";
    for(let i = 0; i < obstacles.length; i++) {
        context.fillRect(obstacles[i].x, obstacles[i].y, box, box);
    }
}

// This function updates the direction based on the key pressed
document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != 'right') direction = 'left';
    if (event.keyCode == 38 && direction != 'down') direction = 'up';
    if (event.keyCode == 39 && direction != 'left') direction = 'right';
    if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

// This is the game loop
function startGame() {
    // If the snake hits the border, it appears on the opposite side
    if (snake[0].x > maxwidth - box && direction == "right") snake[0].x = 0 ;
    if (snake[0].x < 0 && direction == 'left') snake[0].x = maxwidth - box;
    if (snake[0].y > maxheight - box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == 'up') snake[0].y = maxheight - box;

    // Check if the snake has hit itself
    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            alert(`Game Over :(\n\nyour score was: ${score}`);
        }
    }

    // Draw the game objects
    createBG();
    createSnake();
    drawFood();
    drawObstacles();

    // Move the snake in the current direction
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    // Check if the snake has eaten the food
    if (snakeX != food.x || snakeY != food.y) {
        // If not, remove the tail
        snake.pop();
    } else {
        // If yes, generate new food and don't remove the tail
        score++;
        document.getElementById('score').innerText = "Score: " + score;
        food.x = Math.floor(Math.random() * (maxwidth/box - 1) + 1) * box;
        food.y = Math.floor(Math.random() * (maxheight/box - 1) + 1) * box;
    }

    // Check for collisions with obstacles
    for(let i = 0; i < obstacles.length; i++) {
        if(snakeX == obstacles[i].x && snakeY == obstacles[i].y) {
            clearInterval(game);
            alert(`Game Over :(\n\nyour score was: ${score}`);
            return;
        }
    }

    // Create the new head of the snake
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // Add the new head to the front of the snake
    snake.unshift(newHead);
}