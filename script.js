const canvas = document.querySelector('canvas');
const canvasCtx = canvas.getContext('2d');

const groundImg = new Image();
groundImg.src = 'img/ground.png';

const foodImg = new Image();
foodImg.src = 'img/food.png';

const boxSize = 32;
let direction = '';

let score = 0;

function randomXY() {
  return {
    x: boxSize * Math.floor(Math.random() * 17 + 1),
    y: boxSize * Math.floor(Math.random() * 15 + 3),
  };
}

const snake = [];
snake[0] = randomXY();

let food = randomXY();

function collisionChecker() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      return true;
    }
  }

  return false;
}

const gameLogic = setInterval(() => {
  canvasCtx.drawImage(groundImg, 0, 0);

  canvasCtx.drawImage(foodImg, food.x, food.y);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === 'left') {
    snakeX -= boxSize;
  }
  if (direction === 'up') {
    snakeY -= boxSize;
  }
  if (direction === 'right') {
    snakeX += boxSize;
  }
  if (direction === 'down') {
    snakeY += boxSize;
  }

  if (snake[0].x === food.x && snake[0].y === food.y) {
    food = randomXY();
    score++;
  } else {
    snake.pop();
  }
  snake.unshift({ x: snakeX, y: snakeY });

  for (let i = 0; i < snake.length; i++) {
    canvasCtx.fillStyle = i === 0 ? '#000' : '#FFF';

    canvasCtx.fillRect(snake[i].x, snake[i].y, boxSize, boxSize);

    canvasCtx.strokeStyle = '#000';
    canvasCtx.strokeRect(snake[i].x, snake[i].y, boxSize, boxSize);

    canvasCtx.strokeRect;
  }

  if (
    snakeX < boxSize ||
    snakeY < boxSize * 3 ||
    snakeX > boxSize * 17 ||
    snakeY > boxSize * 17 ||
    collisionChecker()
  ) {
    clearInterval(gameLogic);
    alert(`GAME OVER! Score: ${score}`);

    if (confirm('Wanna play again?')) {
      window.location.reload();
    }
  }

  canvasCtx.fillStyle = '#FFF';
  canvasCtx.font = '45px Calibri';
  canvasCtx.fillText(score, boxSize * 2, boxSize * 1.6);
}, 150);

document.addEventListener('keydown', (e) => {
  if (e.keyCode < 37 || e.keyCode > 40) {
    return;
  }

  if (e.keyCode === 37 && direction !== 'right') {
    direction = 'left';
  }

  if (e.keyCode === 38 && direction !== 'down') {
    direction = 'up';
  }
  if (e.keyCode === 39 && direction !== 'left') {
    direction = 'right';
  }
  if (e.keyCode === 40 && direction !== 'up') {
    direction = 'down';
  }
});
