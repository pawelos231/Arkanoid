import { Paddle_Pos } from "../../interfaces/gameStateInterface";
import { InputController } from "../../helpers/Events/InputController";
import { EventListener } from "../../helpers/Events/EventListener";
import { GameState } from "../gameState";

const DEFAULT_ACCELERATION = 3;

type Particle = {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  color: string;
  particleSize: number;
};

export class Paddle {
  private height: number;
  private width: number;
  private ctx: CanvasRenderingContext2D;
  private positions: Paddle_Pos;
  private acceleration: number;
  private paddleSpeed: number;
  private inputController: InputController;
  private hue: number;
  private paddleMoveRateX: number;
  public particles: Particle[] = [];
  public specialColor: boolean;

  constructor(
    width: number,
    height: number,
    ctx: CanvasRenderingContext2D,
    eventListener: EventListener
  ) {
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.paddleSpeed = 0;
    this.positions = { paddle_y: 0, paddle_x: 0 };
    this.specialColor = false;
    this.hue = 0;
    this.acceleration = DEFAULT_ACCELERATION;
    this.paddleMoveRateX = 0;
    this.inputController = new InputController(eventListener);
    this.inputController.addKeyPressEvents();
  }

  initPaddlePos(): Paddle_Pos {
    return {
      paddle_x: window.innerWidth / 2 - 100,
      paddle_y: window.innerHeight - this.positions.paddle_y,
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

  get GetPaddleSpeed() {
    return this.paddleSpeed;
  }
  get GetPaddleMoveRateX() {
    return this.paddleMoveRateX;
  }

  clearPaddle(heightOffset: number): void {
    this.ctx.clearRect(
      this.positions.paddle_x,
      heightOffset,
      this.width + 1,
      this.height + 1
    );
  }

  public deactivateSpecialColor() {
    this.specialColor = false;
  }

  makeCollisionEffect() {
    // Particle explosion effecte;
    this.specialColor = true;
    this.particles = [];
    const numParticles = 30;
    const particleSize = 3;
    const particleSpeed = 5;

    for (let i = 0; i < numParticles; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * particleSpeed;
      const particleX = this.positions.paddle_x + this.width / 2;
      const particleY = this.positions.paddle_y + this.height / 2;

      const particleSpeedX = Math.cos(angle) * speed;
      const particleSpeedY = Math.sin(angle) * speed;

      const particleColor = `hsl(${Math.random() * 360}, 100%, 50%)`;

      this.particles.push({
        x: particleX,
        y: particleY,
        speedX: particleSpeedX,
        speedY: particleSpeedY,
        color: particleColor,
        particleSize,
      });
    }
  }

  public drawParticles() {
    if (this.particles.length === 0) return;
    this.particles.forEach((particle, index) => {
      this.ctx.beginPath();
      this.ctx.arc(
        particle.x,
        particle.y,
        particle.particleSize,
        0,
        Math.PI * 2
      );
      this.ctx.fillStyle = particle.color;
      this.ctx.fill();
      this.ctx.closePath();

      particle.x += particle.speedX;
      particle.y += particle.speedY;

      particle.speedX *= 0.97;

      particle.speedY += Math.random() / 10 + 0.05;

      if (particle.y > window.innerHeight || particle.y < 0) {
        this.particles.splice(index, 1);
      }
    });
  }

  public drawPaddle(positions: Paddle_Pos = { ...this.initPaddlePos() }): void {
    this.positions = positions;
    this.ctx.beginPath();
    this.ctx.lineWidth = 3.8;
    this.ctx.fillStyle = this.specialColor
      ? `hsl(${this.hue}, 100%, 50%)`
      : "white";

    if (this.specialColor) {
      this.hue += 5;
      this.ctx.strokeStyle = "white";
      this.ctx.strokeRect(
        positions.paddle_x,
        positions.paddle_y,
        this.width - 1,
        this.height - 1
      );
    }

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

  public handleKeyPress(gameState: GameState): void {
    const paddle_x: number = gameState.paddle_positions.paddle_x;

    if (this.inputController.keyPressedLeft && paddle_x > 0) {
      if (this.paddleSpeed <= gameState.GetMaxPaddleSpeed) {
        this.paddleSpeed += this.acceleration;
        this.paddleMoveRateX = -this.paddleSpeed;
      }
      gameState.paddle_positions.paddle_x -= this.paddleSpeed;
    }

    if (
      !this.inputController.keyPressedLeft &&
      !this.inputController.keyPressedRight &&
      this.paddleSpeed > 0
    ) {
      this.paddleSpeed -= this.acceleration;
      if (this.paddleSpeed < 0) this.paddleSpeed = 0;
      this.paddleMoveRateX =
        this.paddleMoveRateX >= 0 ? this.paddleSpeed : -this.paddleSpeed;
    }

    if (
      this.inputController.keyPressedRight &&
      paddle_x + this.width < window.innerWidth
    ) {
      if (this.paddleSpeed <= gameState.GetMaxPaddleSpeed) {
        this.paddleSpeed += this.acceleration;
        this.paddleMoveRateX = this.paddleSpeed;
      }
      gameState.paddle_positions.paddle_x += this.paddleSpeed;
    }
  }
}
