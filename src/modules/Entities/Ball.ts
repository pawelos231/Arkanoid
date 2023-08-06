import { Ball_Pos } from "../../interfaces/gameStateInterface";
import { LIGHT_BLUE } from "../../constants/colors";
import { GameState } from "../gameState";
export class Ball {
  private ballPosition: Ball_Pos;
  private ctx: CanvasRenderingContext2D;
  private radius: number;
  private angle: number;
  private speed: number;
  public constructor(ctx: CanvasRenderingContext2D, radius: number) {
    this.ballPosition = { ball_x: 0, ball_y: 0 };
    this.ctx = ctx;
    this.radius = radius;
    this.angle = Math.cos(1);
    this.speed = 12;
  }

  set setRadius(radius: number) {
    this.radius = radius;
  }

  get radiusOfBallGetter(): number {
    return this.radius;
  }

  get BallPositionGetter(): Ball_Pos {
    return this.ballPosition;
  }

  set SetAngle(angle: number) {
    this.angle = angle;
  }

  get GetAngle(): number {
    return this.angle;
  }

  reflectOffPaddle(
    paddleX: number,
    paddleWidth: number,
    paddleHeight: number,
    paddleSpeed: number,
    gameState: GameState
  ) {
    const ballCenterX = this.ballPosition.ball_x - this.radius;
    const paddleCenterX = paddleX + paddleWidth / 2;

    const distanceX = ballCenterX - paddleCenterX;
    const normalizedDistance = distanceX / (paddleWidth / 2);

    const reflectionAngle = normalizedDistance * (Math.PI / 4);
    gameState.ball_positions.ball_y =
      gameState.paddle_positions.paddle_y - paddleHeight;
    gameState.BallMoveRateSetX =
      gameState.BallMoveRateGetX * Math.abs(Math.tan(reflectionAngle));

    if (paddleSpeed !== 0) {
      const paddleDirection = paddleSpeed > 0 ? 1 : -1;
      console.log("DIRECTION:", paddleDirection);
      gameState.BallMoveRateSetX =
        paddleDirection * Math.abs(paddleSpeed * 0.65);
    }
  }

  private initBallPos(): Ball_Pos {
    //to fix
    const ball_y: number = window.innerHeight - 100;
    const ball_x: number = window.innerWidth / 2;
    return { ball_y, ball_x };
  }

  public drawBall(positions: Ball_Pos = { ...this.initBallPos() }): void {
    this.ballPosition = positions;
    this.ctx.beginPath();
    this.ctx.arc(
      this.ballPosition.ball_x,
      this.ballPosition.ball_y,
      this.radius,
      0,
      Math.PI * 2,
      false
    );
    this.ctx.fillStyle = LIGHT_BLUE;
    this.ctx.fill();
    //this.renderFireParticlesAroundBall();
  }

  public drawFireParticlesAroundBall(): void {
    const numParticles = 10;
    const particleRadius = 2;

    for (let i = 0; i < numParticles; i++) {
      const angle = (Math.PI * 2 * i) / numParticles;
      const particleX =
        this.ballPosition.ball_x + Math.cos(angle) * this.radius;
      const particleY =
        this.ballPosition.ball_y + Math.sin(angle) * this.radius;

      this.ctx.beginPath();
      this.ctx.arc(particleX, particleY, particleRadius, 0, Math.PI * 2, false);

      const fillColor = `hsl(${Math.random() * 60 + 10}, 100%, 50%)`;
      this.ctx.fillStyle = fillColor;

      this.ctx.fill();
    }
  }
}
