// VARIABLES
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// VARIABLE | X AND Y POSITIONS
let x = canvas.width / 2;
let y = canvas.height - 30;

// VARIABLE | BALL VELOCITY
let dx = 2;
let dy = -2;
const ballRadius = 10;

// VARIABLE | X AND Y PADDLE
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

// VARIABLE | KEYS PRESSED
let rightPressed = false;
let leftPressed = false;

// VARIABLE | SCORE
let score = 0;

// VARIABLE | LIVES
let lives = 5;

// VARIABLE | BRICK INFORMATION
const brickRowCount = 5;
const brickColumnCount = 8;
const brickWidth = 45;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

// EVENT LISTENERS
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

// FUNCTION | BACKGROUND COLOR
function drawBackground() {
  document.body.style.backgroundColor = 'White';
}

// FUNCTION | KEYS DOWN HANDLER
function keyDownHandler(e) {
  if (e.key == 'Right' || e.key == 'ArrowRight') {
    rightPressed = true;
  } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
    leftPressed = true;
  }
}
// FUNCTION | KEYS UP HANDLER
function keyUpHandler(e) {
  if (e.key == 'Right' || e.key == 'ArrowRight') {
    rightPressed = false;
  } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
    leftPressed = false;
  }
}
// FUNCTION | MOUSE MOVE HANDLER
function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > (paddleWidth / 2) && relativeX < canvas.width - (paddleWidth / 2)) {
    paddleX = relativeX - paddleWidth / 2;
  }
}
// FUNCTION | COLISION DETECTION
function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const b = bricks[c][r];
      if (b.status == 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy;
          b.status = 0;
          score++;
          if (score == brickRowCount * brickColumnCount) {
            alert('YOU WIN, CONGRATULATIONS!');
            document.location.reload();
          }
        }
      }
    }
  }
}

// FUNCTION | DRAW SCORE
function drawScore() {
  ctx.font = '14px Futura';
  ctx.fillStyle = '#000000';
  ctx.fillText(`SCORE ${score}`, 8, 20);
}
// FUNCTION | DRAW LIVES
function drawLives() {
  ctx.font = '14px Futura';
  ctx.fillStyle = '#000000';
  ctx.fillText(`LIVES ${lives}`, canvas.width - 65, 20);
}
// FUNCTION | DRAW BALL
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#';
  ctx.fill();
  ctx.closePath();
}
// FUNCTION | DRAW PADDLE
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(
    paddleX,
    canvas.height - paddleHeight,
    paddleWidth,
    paddleHeight,
  );
  ctx.fillStyle = '#';
  ctx.fill();
  ctx.closePath();
}

// FUNCTION | DRAW BRICKS
function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = `rgb(${Math.floor(255 - 42.5 * c)}, ${
          Math.floor(255 - 42.5 * r)}, 0)`;
        ctx.fill();
      }
    }
    ctx.fill();
  } ctx.closePath();
}

// FUNCTION | DRAW
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawBricks();
  collisionDetection();
  drawScore();
  drawLives();
  drawBackground();

  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  if (y + dy < ballRadius) {
    dy = -dy;
  }
  else if(y + dy > canvas.height-ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives--;
      if (!lives) {
        alert('GAME OVER!');
        document.location.reload();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if (rightPressed) {
    paddleX += 7;
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth;
    }
  } else if (leftPressed) {
    paddleX -= 7;
    if (paddleX < 0) {
      paddleX = 0;
    }
  }
  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

draw();
