import { Paddle_Pos, Ball_Pos } from "../interfaces/gameStateInterface";

const DEFAULT_MAX_SPEED_PADDLE = 15;

export class GameState {
  level: number;
  pointsToWin: number;
  paddle_positions: Paddle_Pos;
  lives: number;
  ball_positions: Ball_Pos;
  private ballMoveRateX: number;
  private ballMoveRateY: number;
  private playerPoints: number;
  private paddleMoveRateX: number;
  private ballSpeed: number;
  private maxPaddleSpeed: number;

  constructor(
    level: number,
    lives: number,
    pointsToWin: number,
    playerPoints: number,
    paddle_positions: Paddle_Pos,
    ball_positions: Ball_Pos,
    ballMoveRateX: number,
    ballMoveRateY: number,
    ballSpeed: number,
    paddleMoveRateX: number,
    maxPaddleSpeed: number = DEFAULT_MAX_SPEED_PADDLE
  ) {
    this.level = level;
    this.pointsToWin = pointsToWin;
    this.paddle_positions = paddle_positions;
    this.lives = lives;
    this.ball_positions = ball_positions;
    this.playerPoints = playerPoints;
    this.ballMoveRateX = ballMoveRateX;
    this.ballMoveRateY = ballMoveRateY;
    this.ballSpeed = ballSpeed;
    this.maxPaddleSpeed = maxPaddleSpeed;
    this.paddleMoveRateX = paddleMoveRateX;
  }

  set BallMoveRateSet(rate: number) {
    this.ballMoveRateX = rate;
    this.ballMoveRateY = rate;
  }

  get BallMoveRateGet() {
    return {
      rate_x: this.ballMoveRateX,
      rate_y: this.ballMoveRateY,
    };
  }

  set BallMoveRateSetY(rate: number) {
    this.ballMoveRateY = rate;
  }

  set BallMoveRateSetX(rate: number) {
    this.ballMoveRateX = rate;
  }

  set SetMaxPaddleSpeed(maxSpeed: number) {
    this.maxPaddleSpeed = maxSpeed;
  }

  get GetMaxPaddleSpeed() {
    return this.maxPaddleSpeed;
  }

  set SetBallSpeed(speed: number) {
    this.ballSpeed = speed;
  }

  get GetBallSpeed() {
    return this.ballSpeed;
  }

  get BallMoveRateGetX(): number {
    return this.ballMoveRateX;
  }

  get BallMoveRateGetY(): number {
    return this.ballMoveRateY;
  }

  set playerPointsSet(points: number) {
    this.playerPoints = points;
  }

  get playerPointsGet(): number {
    return this.playerPoints;
  }

  get getLevel(): number {
    return this.level;
  }

  get gamePointsToWin(): number {
    return this.pointsToWin;
  }

  get getLives(): number {
    return this.lives;
  }

  set setLives(lives: number) {
    this.lives = lives;
  }

  get ball_positions_getter(): Ball_Pos {
    return this.ball_positions;
  }

  get paddle_positions_getter(): Paddle_Pos {
    return this.paddle_positions;
  }

  get get_paddle_move_rate_X(): number {
    return this.paddleMoveRateX;
  }

  set set_paddle_move_rate_X(paddleMoveRate: number) {
    this.paddleMoveRateX = paddleMoveRate;
  }
}
