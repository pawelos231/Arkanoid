import { BuffTypes } from "../../interfaces/HelperEnums";
import { Brick } from "./Brick";
import { BuffsInterface } from "../../interfaces/classesInterfaces";
import { Media } from "../Media";
import {
  DESTROYER_BUFF_SOUND,
  INVINCIBILITY_BUFF_SOUND,
  SPEED_BUFF_SOUND,
  PADDLE_SPEED_BUFF_SOUND,
  ADD_LIVE_BUFF_SOUND,
} from "../../constants/gameState";
import { findProperBuff } from "../../data/BuffsData";
import { Buff_Pos, Particle } from "../../interfaces/gameStateInterface";
import { AppliedBuff } from "../../interfaces/HelperEnums";
import { GameState } from "../gameState";
import { calculateBallSize } from "../../helpers/calculateBallDimmensions";
import {
  DEFAULT_PADDLE_SPEED_MULTIPLIER,
  DEFAULT_BALL_SPEED_MULTIPLIER,
  DEFAULT_PADDLE_SIZE_MULTIPLIER,
} from "../../constants/gameState";
import { Paddle } from "./Paddle";

const DEFAULT_ACTIVE_BUFF_TIME = 10000;

export class Buff implements BuffsInterface {
  private BuffType: BuffTypes;
  private AppliedBuffs: AppliedBuff[];
  private time: number = 1000;
  private buff_x: number = window.innerWidth / 2;
  private buff_y: number = 100;
  private paddle: Paddle;
  private buffVelocity: number = 7;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private particleCount: number = 5;
  private createdAt = Date.now();
  private gameState;

  constructor(
    BuffType: BuffTypes,
    AppliedBuffs: AppliedBuff[] = [],
    time: number,
    ctx: CanvasRenderingContext2D,
    { buff_x, buff_y }: Buff_Pos,
    gameState: GameState,
    paddle: Paddle
  ) {
    this.BuffType = BuffType;
    this.AppliedBuffs = AppliedBuffs;
    this.buff_x = buff_x;
    this.buff_y = buff_y;
    this.time = time;
    this.ctx = ctx;
    this.gameState = gameState;
    this.paddle = paddle;
  }

  public ActivateBuffWrapper<F extends Function>(applyBuff: F): F | false {
    let BuffAlreadyActive: AppliedBuff | undefined;
    BuffAlreadyActive = this.AppliedBuffs.find(
      (item) => item.appliedBuffId == this.BuffType
    );

    if (this.BuffType == BuffTypes.AddLive) return applyBuff();
    if (!BuffAlreadyActive) {
      this.AppliedBuffs.push({
        timeStart: Date.now(),
        timeEnd: Date.now() + DEFAULT_ACTIVE_BUFF_TIME,
        appliedBuffId: this.BuffType,
      });
      return applyBuff();
    } else {
      BuffAlreadyActive.timeStart = Date.now();
      BuffAlreadyActive.timeEnd = Date.now() + DEFAULT_ACTIVE_BUFF_TIME;
    }

    return false;
  }

  private applyDestroyerBuff(): void {
    const { paddleWidth, paddleHeight } = this.paddle.getPaddleSize;
    this.paddle.setPaddleSize = {
      width: paddleWidth * DEFAULT_PADDLE_SIZE_MULTIPLIER,
      height: paddleHeight * DEFAULT_PADDLE_SIZE_MULTIPLIER,
    };
  }

  private applyAddLivesBuff(): void {
    this.gameState.setLives = Number(this.gameState.getLives) + 1;
  }

  private async applySpeedBuff() {
    this.gameState.BallMoveRateSetX =
      this.gameState.BallMoveRateGetX * DEFAULT_BALL_SPEED_MULTIPLIER;
    this.gameState.BallMoveRateSetY =
      this.gameState.BallMoveRateGetY * DEFAULT_BALL_SPEED_MULTIPLIER;
  }

  private applyInvincibiltyBuff(): void {
    console.log("apply INVINCIBILITY");
  }

  private applyPaddleSpeedBuff(): void {
    this.gameState.set_paddle_move_rate_X =
      this.gameState.get_paddle_move_rate_X * DEFAULT_PADDLE_SPEED_MULTIPLIER;
  }

  public async applyBuffEffects(): Promise<void> {
    switch (this.BuffType) {
      case BuffTypes.PaddleSpeed: {
        await Media.spanwCustomSound(PADDLE_SPEED_BUFF_SOUND);
        this.ActivateBuffWrapper(this.applyPaddleSpeedBuff.bind(this));
        break;
      }
      case BuffTypes.AddLive: {
        await Media.spanwCustomSound(ADD_LIVE_BUFF_SOUND);
        this.ActivateBuffWrapper(this.applyAddLivesBuff.bind(this));
        break;
      }
      case BuffTypes.DestroyerBuff: {
        await Media.spanwCustomSound(DESTROYER_BUFF_SOUND);
        this.ActivateBuffWrapper(this.applyDestroyerBuff.bind(this));
        break;
      }
      case BuffTypes.SpeedBuff: {
        await Media.spanwCustomSound(SPEED_BUFF_SOUND);
        this.ActivateBuffWrapper(this.applySpeedBuff.bind(this));
        break;
      }
      case BuffTypes.InvincibilityBuff: {
        await Media.spanwCustomSound(INVINCIBILITY_BUFF_SOUND);
        this.ActivateBuffWrapper(this.applyInvincibiltyBuff.bind(this));
        break;
      }
      default:
        console.log("nieopisany efekt");
    }
  }

  public static clearBuffEffect(
    buffType: BuffTypes,
    gameState: GameState,
    paddle: Paddle
  ): void {
    switch (buffType) {
      case BuffTypes.PaddleSpeed: {
        gameState.set_paddle_move_rate_X =
          gameState.get_paddle_move_rate_X / DEFAULT_PADDLE_SPEED_MULTIPLIER;
        break;
      }
      case BuffTypes.SpeedBuff: {
        gameState.BallMoveRateSetX =
          gameState.BallMoveRateGetX / DEFAULT_BALL_SPEED_MULTIPLIER;
        gameState.BallMoveRateSetY =
          gameState.BallMoveRateGetY / DEFAULT_BALL_SPEED_MULTIPLIER;
        break;
      }
      case BuffTypes.DestroyerBuff: {
        const { paddleWidth, paddleHeight } = paddle.getPaddleSize;
        paddle.setPaddleSize = {
          width: paddleWidth / DEFAULT_PADDLE_SIZE_MULTIPLIER,
          height: paddleHeight / DEFAULT_PADDLE_SIZE_MULTIPLIER,
        };
        break;
      }
    }
  }

  private drawParicles(): void {
    const particleCount = this.particleCount;
    for (let i = 0; i < particleCount; i++) {
      const particle: Particle = {
        x: this.buff_x,
        y: this.buff_y,
        velocityX: Math.random() * 2 - 1,
        velocityY: Math.random() * 2 - 1,
        size: Math.random() * 3 + 1,
        color: `hsl(${Math.random() * 60 + 10}, 100%, 50%)`,
        lifespan: Math.random() * 1000,
        createdAt: Date.now(),
      };
      this.particles.push(particle);
    }

    this.particles.forEach((particle, index) => {
      particle.x += particle.velocityX;
      particle.y += particle.velocityY;

      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = particle.color;
      this.ctx.globalCompositeOperation = "source-over";
      this.ctx.fill();
      this.ctx.closePath();

      this.ctx.globalCompositeOperation = "source-atop";
      const elapsedTime = Date.now() - particle.createdAt;
      if (elapsedTime > particle.lifespan) {
        this.particles.splice(index, 1);
      }
    });
  }

  private drawBuffFunc(): void {
    this.buff_y += this.buffVelocity;

    const Buff = findProperBuff(this.BuffType);
    if (!Buff) return;

    this.ctx.save(); // Save the current canvas state

    this.ctx.beginPath();
    this.ctx.arc(
      this.buff_x,
      this.buff_y,
      calculateBallSize(),
      0,
      Math.PI * 2,
      false
    );
    this.ctx.fillStyle = Buff.color;
    this.ctx.fill();
    this.ctx.closePath();

    this.drawParicles();

    this.ctx.restore(); // Restore the canvas state
  }

  public drawBuff(): void {
    this.drawBuffFunc();
  }

  get createdAtVal() {
    return this.createdAt;
  }

  get timeToLive() {
    return this.time;
  }

  get buff_y_Pos() {
    return this.buff_y;
  }

  get buff_x_Pos() {
    return this.buff_x;
  }
}
