import { Paddle_Pos } from "../../interfaces/gameStateInterface";

export class Paddle {
  private height: number;
  private width: number;
  private ctx: CanvasRenderingContext2D;
  private positions: Paddle_Pos;
  constructor(width: number, height: number, ctx: CanvasRenderingContext2D) {
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.positions = { paddle_y: 0, paddle_x: 0 };
  }

  initPaddlePos(): Paddle_Pos {
    return {
      paddle_x: window.innerWidth / 2 - 100,
      paddle_y: window.innerHeight - 70,
    };
  }

  set setPaddleSize({ width, height }: { width: number; height: number }) {
    this.width = width;
    this.height = height;
  }
  get getPaddleSize() {
    return {
      paddleWidth: this.width,
      paddleHeight: this.height,
    };
  }

  clearPaddle(heightOffset: number): void {
    this.ctx.clearRect(
      this.positions.paddle_x,
      heightOffset,
      this.width + 1,
      this.height + 1
    );
  }

  drawPaddle(positions: Paddle_Pos = { ...this.initPaddlePos() }): void {
    this.positions = positions;
    this.ctx.fillStyle = "white";

    this.ctx.fillRect(
      positions.paddle_x,
      positions.paddle_y,
      this.width - 1,
      this.height - 1
    );
  }

  get paddlePositions() {
    return this.positions;
  }
}
