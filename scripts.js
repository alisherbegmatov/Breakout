const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
const brickRowCount = 5;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
let score = 0;
let lives = 5;

const bricks = [];
// eslint-disable-next-line no-plusplus
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  // eslint-disable-next-line no-plusplus
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

// eslint-disable-next-line no-use-before-define
document.addEventListener('keydown', keyDownHandler, false);
// eslint-disable-next-line no-use-before-define
document.addEventListener('keyup', keyUpHandler, false);
// eslint-disable-next-line no-use-before-define
document.addEventListener('mousemove', mouseMoveHandler, false);

function keyDownHandler(e) {
  // eslint-disable-next-line eqeqeq
  if (e.key == 'Right' || e.key == 'ArrowRight') {
    rightPressed = true;
  // eslint-disable-next-line eqeqeq
  } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  // eslint-disable-next-line eqeqeq
  if (e.key == 'Right' || e.key == 'ArrowRight') {
    rightPressed = false;
  // eslint-disable-next-line eqeqeq
  } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
    leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}
function collisionDetection() {
  // eslint-disable-next-line no-plusplus
  for (let c = 0; c < brickColumnCount; c++) {
    // eslint-disable-next-line no-plusplus
    for (let r = 0; r < brickRowCount; r++) {
      const b = bricks[c][r];
      // eslint-disable-next-line eqeqeq
      if (b.status == 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy;
          b.status = 0;
          // eslint-disable-next-line no-plusplus
          score++;
          // eslint-disable-next-line eqeqeq
          if (score == brickRowCount * brickColumnCount) {
            // eslint-disable-next-line no-alert
            alert('YOU WIN CONGRATULATIONS!');
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#000000';
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = '#FF0000';
  ctx.fill();
  ctx.closePath();
}
function drawBricks() {
  // eslint-disable-next-line no-plusplus
  for (let c = 0; c < brickColumnCount; c++) {
    // eslint-disable-next-line no-plusplus
    for (let r = 0; r < brickRowCount; r++) {
      // eslint-disable-next-line eqeqeq
      if (bricks[c][r].status == 1) {
        const brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
        const brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = '#833AB4';
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
function drawScore() {
  ctx.font = '14px Futura';
  ctx.fillStyle = '#000000';
  ctx.fillText(`SCORE ${score}`, 8, 20);
}
function drawLives() {
  ctx.font = '14px Futura';
  ctx.fillStyle = '#000000';
  ctx.fillText(`LIVES ${lives}`, canvas.width - 65, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      // eslint-disable-next-line no-plusplus
      lives--;
      if (!lives) {
        // eslint-disable-next-line no-alert
        alert('GAME OVER');
        document.location.reload();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 3;
        dy = -3;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

draw();
