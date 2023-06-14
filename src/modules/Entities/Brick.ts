import { BrickState, BrickPoints } from "../../interfaces/gameStateInterface";

const DEFAULT_BRICK_COLOR = "#FFF";

export class Brick {
  private width: number;
  private height: number;
  private ctx: CanvasRenderingContext2D;
  private brickState: BrickState;
  private brickPoints: BrickPoints;
  public constructor(
    width: number,
    height: number,
    ctx: CanvasRenderingContext2D,
    specialBrick: boolean,
    status: number,
    brick_x: number,
    brick_y: number,
    brickPoints: BrickPoints
  ) {
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.brickState = { brick_x, brick_y, status, specialBrick };
    this.brickPoints = { ...brickPoints };
  }

  public set heightSetter(height: number) {
    this.height = height;
  }

  public set widthSetter(width: number) {
    this.width = width;
  }

  public get brickStateGet(): BrickState {
    return this.brickState;
  }

  public get brickPointsGet(): BrickPoints {
    return this.brickPoints;
  }

  public get getStatus() {
    return this.brickState.status;
  }

  public set setStatus(value: number) {
    this.brickState.status = value;
  }

  public set timesToHitSet(times: number) {
    this.brickPoints.timesToHit = times;
  }

  private setColor<T>(
    specialBrick: boolean,
    x: number,
    y: number,
    image: T
  ): void {
    if (specialBrick) {
      this.brickPoints.points = 100;
      this.brickPoints.timesToHit = 1;
      this.ctx.drawImage(
        image as HTMLImageElement,
        x,
        y,
        this.width - 2,
        this.height - 2
      );
    } else {
      this.ctx.fillStyle = this.brickPoints.color;
      this.ctx.fillRect(
        this.brickState.brick_x * this.width,
        this.brickState.brick_y * this.height,
        this.width - 1,
        this.height - 1
      );
    }
  }

  public drawBrick<T>(image: T | null = null): void {
    if (this.brickPoints.color === DEFAULT_BRICK_COLOR) return;
    if (this.brickState.status == 0) return;

    this.setColor<T | null>(
      this.brickState.specialBrick,
      this.brickState.brick_x * this.width,
      this.brickState.brick_y * this.height,
      image
    );

    this.ctx.strokeStyle = "white";

    this.ctx.strokeRect(
      this.brickState.brick_x * this.width,
      this.brickState.brick_y * this.height,
      this.width,
      this.height
    );
  }
}
