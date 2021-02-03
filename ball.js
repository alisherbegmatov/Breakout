// CLASS BALL
class Ball {
  constructor() {
    this.ballRadius = 10;
    this.color = '#000000';
    this.x = 250;
    this.y = 160;
    this.dx = 2;
    this.dy = 2;
  }

  drawBall(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  move(canvas) {
    console.log(canvas);
    if (this.x + this.dx > canvas.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
      this.dx = -(this.dx);
    }
    if (this.y + this.dy > canvas.height - this.ballRadius || this.y + this.dy < this.ballRadius) {
      this.dy = -(this.dy);
    }
    this.x += this.dx;
    this.y += this.dy;
  }
}

export default Ball;
