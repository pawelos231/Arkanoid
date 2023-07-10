import { Common } from "./Common";
import { Brick } from "./Entities/Brick";
import { Ball } from "./Entities/Ball";
import { Paddle } from "./Entities/Paddle";
import { GameState } from "./gameState";
import { SpecialBrick } from "./SpecialBrickView";
import { Buff } from "./Entities/Buff";
import { generateRandomNumber } from "../helpers/randomNumber";
import { gameOverStatus } from "../helpers/gameOverStatusCheck";
import { calculateBrickDimmenssions } from "../helpers/calculateBrickDimmensions";
import { clock, normalClock } from "../helpers/Clock";
import { EventListener } from "../helpers/Events/EventListener";
import {
  BUFF_EXPIRATION,
  DEFAULT_BALL_SPEED_MULTIPLIER,
} from "../constants/gameState";
import { media } from "./Media";

import {
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  INIT_BALL_POS,
  INIT_PADDLE_POS,
  DEFAULT_PADDLE_MOVEMENT_X,
  DEFAULT_BRICK_WIDTH,
  DEFAULT_BRICK_HEIGHT,
  DEFAULT_BALL_MOVEMENT_Y_SPEED,
  DEFAULT_BALL_MOVEMENT_X_SPEED,
  NO_SPECIAL_BRICK_INDEX,
} from "../constants/gameState";

import { IFinishedGame, Buff_Pos } from "../interfaces/gameStateInterface";
import { Directions, BuffTypes, AppliedBuff } from "../interfaces/HelperEnums";
import { Level, BrickData } from "../interfaces/level";
import { ICanvas } from "../interfaces/classesInterfaces";
import { calculatePaddleDimmensions } from "../helpers/calculatePaddleDimmensions";
import { calculateBallSize } from "../helpers/calculateBallDimmensions";
import { KRZYSIU_SPECIAL_IMAGE } from "../data/SpecialImages";
import { ESCAPE } from "../constants/gameState";

const GAME_CANVAS = "game_canvas";

export class Canvas extends Common<true> implements ICanvas {
  private BRICK_HEIGHT: number = DEFAULT_BRICK_HEIGHT;
  private BRICK_WIDTH: number = DEFAULT_BRICK_WIDTH;
  private ballMoveRateX: number = DEFAULT_BALL_MOVEMENT_X_SPEED;
  private ballMoveRateY: number = DEFAULT_BALL_MOVEMENT_Y_SPEED;
  private paddleMoveRateX: number = DEFAULT_PADDLE_MOVEMENT_X;

  private rowsCount: number;
  private columnsCount: number;
  private hitCounter: number;
  private playerPoints: number;
  private keyPressedLeft: boolean = false;
  private keyPressedRight: boolean = false;
  private pointsToWin: number;
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private gameState: GameState;
  private bricksArray: Array<Brick>;
  private image: HTMLImageElement | null;
  private drawBuffFlag: boolean = false;
  private levelData: Level;
  private endGame: boolean = false;
  private elapsedTime: number = 0;
  private endLevelData: IFinishedGame | null = null;
  private timer: NodeJS.Timeout;
  private appliedBuffs: AppliedBuff[] = [];
  private Buffs = new Map<string, Buff>();
  private eventListener: EventListener = new EventListener();

  constructor(image: HTMLImageElement | null, levelData: Level) {
    super(GAME_CANVAS);
    this.levelData = levelData;
    this.canvas = null as any;
    this.ctx = null as any;
    this.bricksArray = [];
    this.image = image;
    this.rowsCount = this.levelData.numberOfRows;
    this.columnsCount = this.levelData.numberOfColumns;
    this.playerPoints = 0;
    this.hitCounter = 0;
    this.pointsToWin = this.levelData.requiredScore;
    this.timer = setInterval(() => {
      this.levelData.timer -= 1;
      this.elapsedTime++;
    }, 1000);

    this.gameState = new GameState(
      this.levelData.level,
      this.levelData.lives,
      this.pointsToWin,
      this.hitCounter,
      this.playerPoints,
      INIT_PADDLE_POS,
      INIT_BALL_POS,
      this.ballMoveRateX,
      this.ballMoveRateY,
      this.paddleMoveRateX
    );
  }

  public get getGameState() {
    return this.gameState;
  }

  public configureCanvas(
    isSpecialLevel: boolean,
    randomBrickIndex: number = 0
  ): void {
    this.changeVisbilityOfGivenElement(this.elementId, true);

    this.canvas = this.elementId as HTMLCanvasElement;

    this.canvas.style.backgroundColor = "black";

    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    const { WIDTH, HEIGHT } = calculateBrickDimmenssions(
      this.rowsCount,
      this.columnsCount
    );

    this.BRICK_HEIGHT = HEIGHT;
    this.BRICK_WIDTH = WIDTH;
    isSpecialLevel
      ? this.initBricks(randomBrickIndex)
      : this.initBricks(NO_SPECIAL_BRICK_INDEX);
  }

  public addEventOnResize(): void {
    this.eventListener.add(window, "resize", () => {
      let values: number[] = [window.innerHeight, window.innerWidth];

      this.canvas.height = values[0];
      this.canvas.width = values[1];
      const { WIDTH, HEIGHT } = calculateBrickDimmenssions(
        this.rowsCount,
        this.columnsCount
      );
      this.BRICK_HEIGHT = HEIGHT;
      this.BRICK_WIDTH = WIDTH;

      for (let i = 0; i < this.bricksArray.length; i++) {
        this.bricksArray[i].widthSetter = this.BRICK_WIDTH;
        this.bricksArray[i].heightSetter = this.BRICK_HEIGHT;
      }
    });
  }

  public setListenerMovePaddle(): void {
    this.eventListener.add(window, "keydown", (event: KeyboardEvent) => {
      const keyCode: number = event.keyCode;
      if (
        keyCode == Directions.LeftArrows ||
        keyCode == Directions.LeftNormal
      ) {
        this.keyPressedLeft = true;
      }
      if (
        keyCode == Directions.RigthArrows ||
        keyCode == Directions.RigthNormal
      ) {
        this.keyPressedRight = true;
      }
    });
    this.eventListener.add(window, "keyup", (event: KeyboardEvent) => {
      const keyCode: number = event.keyCode;

      if (
        keyCode == Directions.LeftArrows ||
        keyCode == Directions.LeftNormal
      ) {
        this.keyPressedLeft = false;
      }
      if (
        keyCode == Directions.RigthArrows ||
        keyCode == Directions.RigthNormal
      ) {
        this.keyPressedRight = false;
      }
    });
  }

  public setListenerMoveBackToMenu() {
    this.eventListener.add(window, "keydown", (event: KeyboardEvent) => {
      const keyCode: number = event.keyCode;
      if (keyCode === ESCAPE) {
      }
    });
  }

  private upadateScore(index: number) {
    this.gameState.playerPointsSet =
      this.bricksArray[index].brickPointsGet.points +
      this.getGameState.playerPointsGet;
  }

  private isCollisonFromSide(
    i: number,
    ball_x: number,
    ball_y: number,
    RADIUS: number
  ): boolean {
    const brick_pos_x: number =
      this.bricksArray[i].brickStateGet.brick_x * this.BRICK_WIDTH;

    const brick_pos_y: number =
      this.bricksArray[i].brickStateGet.brick_y * this.BRICK_HEIGHT;

    return (
      (brick_pos_x + this.BRICK_WIDTH <= ball_x - RADIUS &&
        brick_pos_x + this.BRICK_WIDTH >= ball_x - RADIUS - 12) ||
      (brick_pos_x <= ball_x + RADIUS &&
        brick_pos_x >= ball_x + RADIUS + 10 &&
        ball_y - RADIUS > brick_pos_y + this.BRICK_HEIGHT &&
        brick_pos_y < brick_pos_y + RADIUS)
    );
  }

  private isCollision(
    i: number,
    ball_x: number,
    ball_y: number,
    RADIUS: number
  ): boolean {
    const BRICK: Brick = this.bricksArray[i];
    const brick_pos_x: number = BRICK.brickStateGet.brick_x * this.BRICK_WIDTH;
    const brick_pos_y: number = BRICK.brickStateGet.brick_y * this.BRICK_HEIGHT;
    return (
      brick_pos_y + this.BRICK_HEIGHT > ball_y - RADIUS &&
      brick_pos_y < ball_y + RADIUS &&
      brick_pos_x < ball_x + RADIUS + RADIUS / 2 &&
      brick_pos_x + this.BRICK_WIDTH > ball_x - RADIUS - RADIUS / 2
    );
  }

  private drawBuff(BuffId: string): void {
    const buff = this.Buffs.get(BuffId)!;

    buff.drawBuff();
  }

  private applyBuffEffects(BuffId: string) {
    const buff = this.Buffs.get(BuffId)!;

    buff.applyBuffEffects();
  }

  private selectRandomBuff() {
    const randomBuffsCount: number = Object.keys(BuffTypes).length / 2;

    const RANDOM_NUMBER: number = generateRandomNumber(randomBuffsCount);
    const RANDOM_BUFF: number = Number(
      BuffTypes[BuffTypes[RANDOM_NUMBER] as any]
    );

    return RANDOM_BUFF;
  }

  private DropBuff(BRICK: Brick) {
    //declare some buff dropping condtion here
    //1 IN 10 CHANCE

    if (Math.floor(Math.random() * 2) == 1) {
      const buffDropPosition: Buff_Pos = {
        buff_x: BRICK.brickStateGet.brick_x * this.BRICK_WIDTH + 110,
        buff_y: BRICK.brickStateGet.brick_y * this.BRICK_HEIGHT,
      };

      const randomBuff = this.selectRandomBuff();

      const BuffInstance: Buff = new Buff(
        randomBuff,
        JSON.parse(JSON.stringify(this.bricksArray)),
        this.appliedBuffs,
        BUFF_EXPIRATION,
        this.ctx,
        buffDropPosition,
        this.gameState
      );

      const key = `${randomBuff};${BuffInstance.createdAtVal}`;

      this.Buffs.set(key, BuffInstance);

      this.drawBuffFlag = true;
    }
  }

  private CheckCollisionWithBricks(
    ball_x: number,
    ball_y: number,
    RADIUS: number
  ): void {
    for (let i = 0; i < this.bricksArray.length; i++) {
      const BRICK: Brick = this.bricksArray[i];

      if (BRICK.brickStateGet.status === 0) continue;

      const IS_COLLISION: boolean = this.isCollision(
        i,
        ball_x,
        ball_y,
        calculateBallSize()
      );

      if (IS_COLLISION) {
        const MoveRateX: number = this.getGameState.BallMoveRateGetX;
        const MoveRateY: number = this.getGameState.BallMoveRateGetY;

        this.DropBuff(BRICK);

        this.upadateScore(i);

        this.isCollisonFromSide(i, ball_x, ball_y, calculateBallSize())
          ? (this.gameState.BallMoveRateSetX = -MoveRateX)
          : null;

        const IsSpecialBrick: boolean =
          this.bricksArray[i].brickStateGet.specialBrick;

        const status: number = this.bricksArray[i].getStatus;

        if (IsSpecialBrick && status == 1) {
          const specialBrick: SpecialBrick = new SpecialBrick(
            this.image as HTMLImageElement,
            KRZYSIU_SPECIAL_IMAGE.sound
          );

          specialBrick.displayViewOfSpecialBrick();
        }

        this.gameState.BallMoveRateSetY = -MoveRateY;

        let timesToHit: number = this.bricksArray[i].brickPointsGet.timesToHit;

        timesToHit--;

        this.bricksArray[i].timesToHitSet = timesToHit;

        if (timesToHit <= 0) {
          this.bricksArray[i].setStatus = 0;
        }
        this.CheckWin();

        media.spawnSoundWhenHitBrick();
        break;
      }
    }
  }

  private CheckCollisionWithPaddle(
    ball_y: number,
    ball_x: number,
    RADIUS: number,
    paddle_x: number,
    paddle_y: number
  ) {
    if (
      ball_y >= paddle_y - PADDLE_HEIGHT &&
      ball_x - RADIUS <= paddle_x + PADDLE_WIDTH &&
      ball_x + RADIUS >= paddle_x
    ) {
      media.spawnSoundWhenHitPaddle();
      this.gameState.BallMoveRateSetY = -this.gameState.BallMoveRateGetY;
    }
    const MoveRateX: number = this.getGameState.BallMoveRateGetX;
    if (
      (paddle_x + PADDLE_WIDTH <= ball_x - RADIUS &&
        paddle_x + PADDLE_WIDTH >= ball_x - RADIUS - 12) ||
      (paddle_x <= ball_x + RADIUS &&
        paddle_x >= ball_x + RADIUS + 10 &&
        ball_y - RADIUS > paddle_y + this.BRICK_HEIGHT &&
        paddle_y < paddle_y + RADIUS)
    ) {
      this.gameState.BallMoveRateSetX = MoveRateX;
    }
  }

  private drawBall(): void {
    const ball: Ball = new Ball(this.ctx, calculateBallSize());
    const RADIUS: number = ball.radiusOfBallGetter;
    const appliedSpeedBuff = this.appliedBuffs.find(
      (item) => item.appliedBuffId === BuffTypes.SpeedBuff
    );

    if (this.gameState.ball_positions.ball_x - RADIUS < 0) {
      this.gameState.BallMoveRateSetX = appliedSpeedBuff
        ? 12 * DEFAULT_BALL_SPEED_MULTIPLIER
        : 12;
    }

    if (this.gameState.ball_positions.ball_y - RADIUS < 0) {
      this.gameState.BallMoveRateSetY = appliedSpeedBuff
        ? 12 * DEFAULT_BALL_SPEED_MULTIPLIER
        : 12;
    }

    if (this.gameState.ball_positions.ball_x + RADIUS > window.innerWidth) {
      this.gameState.BallMoveRateSetX = appliedSpeedBuff
        ? -12 * DEFAULT_BALL_SPEED_MULTIPLIER
        : -12;
    }

    if (this.gameState.ball_positions.ball_y + RADIUS > window.innerHeight) {
      this.gameState.lives = this.gameState.lives - 1;
      this.CheckWin();

      this.ballMoveRateY = appliedSpeedBuff
        ? -12 * DEFAULT_BALL_SPEED_MULTIPLIER
        : -12;

      this.gameState.ball_positions = {
        ball_x: window.innerWidth / 2,
        ball_y: window.innerHeight - 150,
      };

      this.gameState.paddle_positions = {
        paddle_y: window.innerHeight - 40,
        paddle_x: window.innerWidth / 2 - 100,
      };
    }

    const ball_x: number = this.gameState.ball_positions.ball_x;
    const ball_y: number = this.gameState.ball_positions.ball_y;
    const paddle_x: number = this.gameState.paddle_positions.paddle_x;
    const paddle_y: number = this.gameState.paddle_positions.paddle_y;

    this.CheckCollisionWithPaddle(ball_y, ball_x, RADIUS, paddle_x, paddle_y);

    this.CheckCollisionWithBricks(ball_x, ball_y, RADIUS);

    ball.drawBall({
      ball_x: (this.gameState.ball_positions.ball_x +=
        this.gameState.BallMoveRateGetX),

      ball_y: (this.gameState.ball_positions.ball_y +=
        this.gameState.BallMoveRateGetY),
    });
  }

  private drawPaddle(): void {
    const { WIDTH, HEIGHT } = calculatePaddleDimmensions();
    const paddle: Paddle = new Paddle(WIDTH, HEIGHT, this.ctx);

    this.buffColidedWithPaddle();

    paddle.drawPaddle(this.gameState.paddle_positions);
  }

  private addBricksToArray(
    brick_x: number,
    brick_y: number,
    specialBrick: boolean,
    brickData: Omit<BrickData, "columnNumber" | "rowNumber">
  ): void {
    const brick: Brick = new Brick(
      this.BRICK_WIDTH,
      this.BRICK_HEIGHT,
      this.ctx,
      specialBrick,
      1,
      brick_x,
      brick_y,
      brickData
    );

    this.bricksArray.push(brick);
  }

  private initBricks(SpecialBrickIndex: number = -100): void {
    const sortedLevel: BrickData[] = this.levelData.brickArray.sort(
      (a: BrickData, b: BrickData) => a.rowNumber - b.rowNumber
    );

    let count: number = 0;
    for (let i = 0; i < sortedLevel.length; i++) {
      const levelData: Omit<BrickData, "columnNumber" | "rowNumber"> = {
        color: sortedLevel[i].color,
        timesToHit: sortedLevel[i].timesToHit,
        points: sortedLevel[i].points,
        buffDropRate: sortedLevel[i].buffDropRate,
      };

      count++;
      this.addBricksToArray(
        sortedLevel[i].columnNumber,
        sortedLevel[i].rowNumber,
        count === SpecialBrickIndex ? true : false,
        levelData
      );
    }
  }

  private drawBricks() {
    for (let i = 0; i < this.bricksArray.length; i++) {
      this.bricksArray[i].drawBrick(this.image);
    }
  }

  private drawGame(): IFinishedGame | void {
    this.drawPaddle();
    this.drawBricks();
    this.drawBall();
    this.drawBuffOuter();
    if (this.endGame) {
      return this.endLevelData!;
    }
  }

  private clearCanvas(): void {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  private handleKeyPress(): void {
    const paddle_x: number = this.gameState.paddle_positions.paddle_x;
    const { WIDTH } = calculatePaddleDimmensions();
    if (this.keyPressedLeft && paddle_x > 0) {
      this.gameState.paddle_positions.paddle_x -=
        this.gameState.get_paddle_move_rate_X;
    }

    if (this.keyPressedRight && paddle_x + WIDTH < window.innerWidth) {
      this.gameState.paddle_positions.paddle_x +=
        this.gameState.get_paddle_move_rate_X;
    }
  }

  private drawClock() {
    this.ctx.font = "24px Arial";
    this.ctx.fillStyle = "red";
    this.ctx.textAlign = "center";
    const x = this.canvas.width - 100;
    const y = this.canvas.height - 30;
    this.ctx.fillText(normalClock(this.levelData.timer), x, y);
  }

  private buffColidedWithPaddle() {
    const { paddle_x, paddle_y } = this.gameState.paddle_positions;

    for (const [key, value] of this.Buffs) {
      const buff = value;
      const buffYPosition = buff?.buff_y_Pos!;
      const buffXPostion = buff?.buff_x_Pos!;

      const isCollsion: boolean =
        buffXPostion > paddle_x &&
        buffXPostion < paddle_x + PADDLE_WIDTH &&
        buffYPosition > paddle_y &&
        buffYPosition < paddle_y + PADDLE_HEIGHT;

      if (isCollsion) {
        this.applyBuffEffects(key);
        this.Buffs.delete(key);
      }
    }
  }

  private drawBuffOuter() {
    if (this.Buffs.size === 0) return;

    if (this.drawBuffFlag) {
      for (const [key, buff] of this.Buffs) {
        this.drawBuff(key);

        if (buff.buff_y_Pos - 100 > window.innerHeight) {
          this.Buffs.delete(key);
          continue;
        }
      }
    }
  }

  private ShouldBeRemovedFromBuffsStack() {
    for (let i = 0; i < this.appliedBuffs.length; i++) {
      if (this.appliedBuffs[i].timeEnd < Date.now()) {
        Buff.clearBuffEffect(
          this.appliedBuffs[i].appliedBuffId,
          this.gameState
        );
        this.appliedBuffs.splice(i, 1);
      }
    }
  }

  private drawBuffStack() {
    this.ShouldBeRemovedFromBuffsStack();
    for (let i = 0; i < this.appliedBuffs.length; i++) {
      this.ctx.font = "24px Arial";
      this.ctx.fillStyle = "green";
      this.ctx.textAlign = "center";
      const x = this.canvas.width - 150;
      const y = this.canvas.height - (60 + i * 30);
      this.ctx.fillText(
        `${BuffTypes[this.appliedBuffs[i].appliedBuffId]}${clock(
          (this.appliedBuffs[i].timeEnd - Date.now()) / 1000
        )}`,
        x,
        y
      );
    }
  }

  private drawLives() {
    this.ctx.font = "24px Arial";
    this.ctx.fillStyle = "red";
    this.ctx.textAlign = "center";
    const x = 100;
    const y = this.canvas.height - 30;
    this.ctx.fillText(`lives: ${String(this.gameState.getLives)}`, x, y);
  }

  private setInitCanvasSize(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private CheckWin(): void {
    const WIN: boolean = !this.bricksArray.find(
      (item: Brick) => item.getStatus == 1
    );

    const OverStatus = gameOverStatus(
      this.gameState.getLevel,
      this.gameState.playerPointsGet,
      WIN,
      this.gameState.getLives,
      this.elapsedTime,
      this.levelData.timer
    );

    if (OverStatus.end) {
      clearInterval(this.timer);
      this.cleanUpListeners();
      this.endLevelData = OverStatus;
      this.endGame = true;
    }
  }

  private cleanUpListeners = () => {
    this.eventListener.removeListenersOnGivenNode(window, "resize");
    this.eventListener.removeListenersOnGivenNode(window, "keyup");
    this.eventListener.removeListenersOnGivenNode(window, "keydown");
  };

  public draw(): IFinishedGame | void {
    this.handleKeyPress();
    this.setInitCanvasSize();
    this.clearCanvas();
    this.drawClock();
    this.drawLives();
    this.drawBuffStack();

    return this.drawGame();
  }
}
