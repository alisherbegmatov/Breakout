// CLASS PADDLE
class Paddle {
  constructor(canvas) {
    this.paddleHeight = 10;
    this.paddleWidth = 75;
    this.paddleX = (canvas.width - this.paddleWidth) / 2;
    this.paddleY = (canvas.height - this.paddleHeight)
    this.color = "#000000";

    function drawPaddle(ctx, canvas) {
      ctx.beginPath();
      ctx.rect(
        this.paddleX,
        this.paddleY,
        canvas.height - this.paddleHeight,
        this.paddleWidth,
        this.paddleHeight
      );
      ctx.fillStyle = "#000000";
      ctx.fill();
      ctx.closePath();
    }
  }
}
export default Paddle;
