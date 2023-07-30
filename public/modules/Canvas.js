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
import { BUFF_EXPIRATION, DEFAULT_BALL_SPEED, DEFAULT_BALL_SPEED_MULTIPLIER, DEFAULT_PADDLE_SIZE_MULTIPLIER, } from "../constants/gameState";
import { media } from "./Media";
import { INIT_BALL_POS, DEFAULT_PADDLE_MOVEMENT_X, DEFAULT_BRICK_WIDTH, DEFAULT_BRICK_HEIGHT, DEFAULT_BALL_MOVEMENT_Y_SPEED, DEFAULT_BALL_MOVEMENT_X_SPEED, NO_SPECIAL_BRICK_INDEX, } from "../constants/gameState";
import { EscapeView } from "./EscapeLevel";
import { BuffTypes } from "../interfaces/HelperEnums";
import { calculatePaddleDimmensions } from "../helpers/calculatePaddleDimmensions";
import { calculateBallSize } from "../helpers/calculateBallDimmensions";
import { KRZYSIU_SPECIAL_IMAGE } from "../data/SpecialImages";
import { ESCAPE, SPACE } from "../constants/gameState";
const GAME_CANVAS = "game_canvas";
export class Canvas extends Common {
    constructor(image, levelData) {
        super(GAME_CANVAS);
        this.BRICK_HEIGHT = DEFAULT_BRICK_HEIGHT;
        this.BRICK_WIDTH = DEFAULT_BRICK_WIDTH;
        this.ballMoveRateX = DEFAULT_BALL_MOVEMENT_X_SPEED;
        this.ballMoveRateY = DEFAULT_BALL_MOVEMENT_Y_SPEED;
        this.paddleMoveRateX = DEFAULT_PADDLE_MOVEMENT_X;
        this.pressedWhenBallFell = true;
        this.drawBuffFlag = false;
        this.endGame = false;
        this.elapsedTime = 0;
        this.endLevelData = null;
        this.appliedBuffs = [];
        this.Buffs = new Map();
        this.eventListener = new EventListener();
        this.backToMenu = false;
        this.cleanUpListeners = () => {
            this.eventListener.removeListenersOnGivenNode(window, "resize");
            this.eventListener.removeListenersOnGivenNode(window, "keyup");
            this.eventListener.removeListenersOnGivenNode(window, "keydown");
        };
        this.levelData = levelData;
        this.canvas = null;
        this.ctx = null;
        this.bricksArray = [];
        this.image = image;
        this.rowsCount = this.levelData.numberOfRows;
        this.columnsCount = this.levelData.numberOfColumns;
        this.playerPoints = 0;
        this.pointsToWin = this.levelData.requiredScore;
        this.timer = setInterval(() => {
            this.levelData.timer -= 1;
            this.elapsedTime++;
        }, 1000);
        this.canvas = this.elementId;
        this.canvas.style.backgroundColor = "black";
        this.ctx = this.canvas.getContext("2d");
        const { WIDTHP, HEIGHTP } = calculatePaddleDimmensions();
        this.paddle = new Paddle(WIDTHP, HEIGHTP, this.ctx, this.eventListener);
        this.ball = new Ball(this.ctx, calculateBallSize());
        const initPaddlePos = {
            paddle_y: window.innerHeight - this.paddle.getPaddleSize.paddleHeight,
            paddle_x: window.innerWidth / 2 - this.paddle.getPaddleSize.paddleWidth / 2,
        };
        this.gameState = new GameState(this.levelData.level, this.levelData.lives, this.pointsToWin, this.playerPoints, initPaddlePos, INIT_BALL_POS, this.ballMoveRateX, this.ballMoveRateY, DEFAULT_BALL_SPEED, this.paddleMoveRateX);
    }
    get getGameState() {
        return this.gameState;
    }
    configureCanvas(isSpecialLevel, randomBrickIndex = 0) {
        this.changeVisbilityOfGivenElement(this.elementId, true);
        const { WIDTH, HEIGHT } = calculateBrickDimmenssions(this.rowsCount, this.columnsCount);
        this.BRICK_HEIGHT = HEIGHT;
        this.BRICK_WIDTH = WIDTH;
        isSpecialLevel
            ? this.initBricks(randomBrickIndex)
            : this.initBricks(NO_SPECIAL_BRICK_INDEX);
    }
    addEventOnResize() {
        this.eventListener.add(window, "resize", () => {
            let values = [window.innerHeight, window.innerWidth];
            this.drawBall();
            this.drawPaddle();
            this.gameState.paddle_positions = this.gameState.paddle_positions = {
                paddle_y: window.innerHeight - this.paddle.getPaddleSize.paddleHeight,
                paddle_x: window.innerWidth / 2 - this.paddle.getPaddleSize.paddleWidth / 2,
            };
            this.gameState.ball_positions = {
                ball_x: this.gameState.paddle_positions.paddle_x +
                    calculatePaddleDimmensions().WIDTHP / 2,
                ball_y: this.gameState.paddle_positions.paddle_y - 40,
            };
            this.canvas.height = values[0];
            this.canvas.width = values[1];
            const { WIDTH, HEIGHT } = calculateBrickDimmenssions(this.rowsCount, this.columnsCount);
            this.BRICK_HEIGHT = HEIGHT;
            this.BRICK_WIDTH = WIDTH;
            for (let i = 0; i < this.bricksArray.length; i++) {
                this.bricksArray[i].widthSetter = this.BRICK_WIDTH;
                this.bricksArray[i].heightSetter = this.BRICK_HEIGHT;
            }
        });
    }
    setListenerMoveBackToMenu() {
        const keepGoingButton = this.bindElementByClass("keepGoing");
        const escapeView = new EscapeView();
        this.eventListener.add(keepGoingButton, "click", () => {
            escapeView.hideScreen();
            this.backToMenu = false;
        });
        this.eventListener.add(window, "keydown", (event) => {
            const keyCode = event.keyCode;
            if (keyCode === ESCAPE) {
                escapeView.ShowUserScreenOver();
                this.backToMenu = true;
            }
        });
    }
    setListenerResumeGame() {
        this.eventListener.add(window, "keydown", (e) => {
            if (e.keyCode === SPACE && !this.pressedWhenBallFell) {
                this.pressedWhenBallFell = true;
                const appliedSpeedBuff = this.appliedBuffs.find((item) => item.appliedBuffId === BuffTypes.SpeedBuff);
                this.gameState.BallMoveRateSetY = appliedSpeedBuff
                    ? 12 * DEFAULT_BALL_SPEED_MULTIPLIER
                    : 12;
            }
        });
    }
    upadateScore(index) {
        this.gameState.playerPointsSet =
            this.bricksArray[index].brickPointsGet.points +
                this.getGameState.playerPointsGet;
    }
    isCollisonFromSide(i, ball_x, ball_y, RADIUS) {
        const brick_pos_x = this.bricksArray[i].brickStateGet.brick_x * this.BRICK_WIDTH;
        const brick_pos_y = this.bricksArray[i].brickStateGet.brick_y * this.BRICK_HEIGHT;
        return ((brick_pos_x + this.BRICK_WIDTH <= ball_x - RADIUS &&
            brick_pos_x + this.BRICK_WIDTH >=
                ball_x - RADIUS - Math.floor(RADIUS / 2)) ||
            (brick_pos_x <= ball_x + RADIUS &&
                brick_pos_x >= ball_x + RADIUS + Math.floor(RADIUS / 3) &&
                ball_y - RADIUS > brick_pos_y + this.BRICK_HEIGHT &&
                brick_pos_y < brick_pos_y + RADIUS));
    }
    isCollision(i, ball_x, ball_y, RADIUS) {
        const BRICK = this.bricksArray[i];
        const brick_pos_x = BRICK.brickStateGet.brick_x * this.BRICK_WIDTH;
        const brick_pos_y = BRICK.brickStateGet.brick_y * this.BRICK_HEIGHT;
        return (brick_pos_y + this.BRICK_HEIGHT > ball_y - RADIUS &&
            brick_pos_y < ball_y + RADIUS &&
            brick_pos_x < ball_x + RADIUS + RADIUS / 2 &&
            brick_pos_x + this.BRICK_WIDTH > ball_x - RADIUS - RADIUS / 2);
    }
    drawBuff(BuffId) {
        const buff = this.Buffs.get(BuffId);
        buff.drawBuff();
    }
    applyBuffEffects(BuffId) {
        const buff = this.Buffs.get(BuffId);
        buff.applyBuffEffects();
    }
    selectRandomBuff() {
        const randomBuffsCount = Object.keys(BuffTypes).length / 2;
        const RANDOM_NUMBER = generateRandomNumber(randomBuffsCount);
        const RANDOM_BUFF = Number(BuffTypes[BuffTypes[RANDOM_NUMBER]]);
        return RANDOM_BUFF;
    }
    DropBuff(BRICK) {
        //declare some buff dropping condtion here
        //1 IN 4 CHANCE
        if (Math.floor(Math.random() * 2) == 1) {
            const buffDropPosition = {
                buff_x: BRICK.brickStateGet.brick_x * this.BRICK_WIDTH + 110,
                buff_y: BRICK.brickStateGet.brick_y * this.BRICK_HEIGHT,
            };
            const randomBuff = this.selectRandomBuff();
            const BuffInstance = new Buff(randomBuff, this.appliedBuffs, BUFF_EXPIRATION, this.ctx, buffDropPosition, this.gameState, this.paddle);
            const key = `${randomBuff};${BuffInstance.createdAtVal}`;
            this.Buffs.set(key, BuffInstance);
            this.drawBuffFlag = true;
        }
    }
    CheckCollisionWithBricks(ball_x, ball_y) {
        for (let i = 0; i < this.bricksArray.length; i++) {
            const BRICK = this.bricksArray[i];
            if (BRICK.brickStateGet.status === 0)
                continue;
            const IS_COLLISION = this.isCollision(i, ball_x, ball_y, calculateBallSize());
            if (IS_COLLISION) {
                const MoveRateX = this.getGameState.BallMoveRateGetX === 0
                    ? 12
                    : this.gameState.BallMoveRateGetX;
                const MoveRateY = this.getGameState.BallMoveRateGetY;
                this.DropBuff(BRICK);
                this.upadateScore(i);
                this.isCollisonFromSide(i, ball_x, ball_y, calculateBallSize())
                    ? (this.gameState.BallMoveRateSetX = -MoveRateX)
                    : null;
                const IsSpecialBrick = this.bricksArray[i].brickStateGet.specialBrick;
                const status = this.bricksArray[i].getStatus;
                if (IsSpecialBrick && status == 1) {
                    const specialBrick = new SpecialBrick(this.image, KRZYSIU_SPECIAL_IMAGE.sound);
                    const buffDropPosition = {
                        buff_x: BRICK.brickStateGet.brick_x * this.BRICK_WIDTH + 110,
                        buff_y: BRICK.brickStateGet.brick_y * this.BRICK_HEIGHT,
                    };
                    for (const value of Object.values(BuffTypes)) {
                        if (typeof value !== "number")
                            continue;
                        const BuffInstance = new Buff(value, this.appliedBuffs, BUFF_EXPIRATION, this.ctx, buffDropPosition, this.gameState, this.paddle);
                        const key = `${String(value)};${BuffInstance.createdAtVal}`;
                        this.Buffs.set(key, BuffInstance);
                        this.applyBuffEffects(key);
                        this.Buffs.delete(key);
                    }
                    specialBrick.displayViewOfSpecialBrick();
                }
                this.gameState.BallMoveRateSetY = -MoveRateY;
                let timesToHit = this.bricksArray[i].brickPointsGet.timesToHit;
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
    CheckCollisionWithPaddle(ball_y, ball_x, RADIUS, paddle_x, paddle_y) {
        const MoveRateX = this.getGameState.BallMoveRateGetX == 0
            ? 12
            : this.gameState.BallMoveRateGetX;
        if (ball_y >= paddle_y - this.paddle.getPaddleSize.paddleHeight &&
            ball_x - RADIUS <= paddle_x + this.paddle.getPaddleSize.paddleWidth &&
            ball_x + RADIUS >= paddle_x) {
            media.spawnSoundWhenHitPaddle();
            this.gameState.BallMoveRateSetY = -this.gameState.BallMoveRateGetY;
            this.gameState.BallMoveRateSetX = MoveRateX;
            const appliedSpeedBuff = this.appliedBuffs.find((item) => item.appliedBuffId === BuffTypes.PaddleSpeed);
            if (appliedSpeedBuff)
                this.paddle.makeCollisionEffect();
            this.ball.reflectOffPaddle(paddle_x, this.paddle.getPaddleSize.paddleWidth, this.gameState, this.paddle.GetPaddleMoveRateX);
        }
    }
    drawBall() {
        const RADIUS = calculateBallSize();
        this.ball.setRadius = RADIUS;
        const appliedSpeedBuff = this.appliedBuffs.find((item) => item.appliedBuffId === BuffTypes.SpeedBuff);
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
                : -12 * this.ball.GetAngle;
        }
        if (!this.pressedWhenBallFell) {
            this.gameState.BallMoveRateSetX = 0;
            this.gameState.BallMoveRateSetY = 0;
            this.gameState.ball_positions = {
                ball_x: this.gameState.paddle_positions.paddle_x +
                    calculatePaddleDimmensions().WIDTHP / 2,
                ball_y: this.gameState.paddle_positions.paddle_y - 40,
            };
        }
        if (this.gameState.ball_positions.ball_y + RADIUS > window.innerHeight) {
            this.gameState.lives = this.gameState.lives - 1;
            this.pressedWhenBallFell = false;
            this.CheckWin();
            this.Buffs = new Map();
            this.ballMoveRateY = appliedSpeedBuff
                ? -12 * DEFAULT_BALL_SPEED_MULTIPLIER
                : -12;
            this.gameState.ball_positions = {
                ball_x: window.innerWidth / 2,
                ball_y: window.innerHeight - 50,
            };
            this.gameState.paddle_positions = {
                paddle_y: window.innerHeight - this.paddle.getPaddleSize.paddleHeight,
                paddle_x: window.innerWidth / 2 - 100,
            };
        }
        const ball_x = this.gameState.ball_positions.ball_x;
        const ball_y = this.gameState.ball_positions.ball_y;
        const paddle_x = this.gameState.paddle_positions.paddle_x;
        const paddle_y = this.gameState.paddle_positions.paddle_y;
        this.CheckCollisionWithPaddle(ball_y, ball_x, RADIUS, paddle_x, paddle_y);
        this.CheckCollisionWithBricks(ball_x, ball_y);
        this.ball.drawBall({
            ball_x: (this.gameState.ball_positions.ball_x +=
                this.gameState.BallMoveRateGetX),
            ball_y: (this.gameState.ball_positions.ball_y +=
                this.gameState.BallMoveRateGetY),
        });
    }
    drawPaddle() {
        this.buffColidedWithPaddle();
        let { WIDTHP, HEIGHTP } = calculatePaddleDimmensions();
        const appliedDestroyer = this.appliedBuffs.find((item) => item.appliedBuffId === BuffTypes.DestroyerBuff);
        if (appliedDestroyer &&
            appliedDestroyer.appliedBuffId === BuffTypes.DestroyerBuff) {
            WIDTHP = WIDTHP * DEFAULT_PADDLE_SIZE_MULTIPLIER;
        }
        this.paddle.setPaddleSize = {
            width: WIDTHP,
            height: HEIGHTP,
        };
        this.paddle.drawPaddle(this.gameState.paddle_positions);
    }
    addBricksToArray(brick_x, brick_y, specialBrick, brickData) {
        const brick = new Brick(this.BRICK_WIDTH, this.BRICK_HEIGHT, this.ctx, specialBrick, 1, brick_x, brick_y, brickData);
        this.bricksArray.push(brick);
    }
    initBricks(SpecialBrickIndex = -100) {
        const sortedLevel = this.levelData.brickArray.sort((a, b) => a.rowNumber - b.rowNumber);
        let count = 0;
        for (let i = 0; i < sortedLevel.length; i++) {
            const levelData = {
                color: sortedLevel[i].color,
                timesToHit: sortedLevel[i].timesToHit,
                points: sortedLevel[i].points,
                buffDropRate: sortedLevel[i].buffDropRate,
            };
            count++;
            this.addBricksToArray(sortedLevel[i].columnNumber, sortedLevel[i].rowNumber, count === SpecialBrickIndex ? true : false, levelData);
        }
    }
    drawBricks() {
        for (let i = 0; i < this.bricksArray.length; i++) {
            this.bricksArray[i].drawBrick(this.image);
        }
    }
    drawGame() {
        this.drawPaddle();
        this.drawBricks();
        this.drawBall();
        this.paddle.drawParticles();
        this.drawBuffOuter();
        if (this.backToMenu) {
            return;
        }
        if (this.endGame) {
            return this.endLevelData;
        }
    }
    clearCanvas() {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
    drawClock() {
        this.ctx.font = "24px Arial";
        this.ctx.fillStyle = "red";
        this.ctx.textAlign = "center";
        const x = this.canvas.width - 100;
        const y = this.canvas.height - 30;
        this.ctx.fillText(normalClock(this.levelData.timer), x, y);
    }
    buffColidedWithPaddle() {
        const { paddle_x, paddle_y } = this.gameState.paddle_positions;
        for (const [key, value] of this.Buffs) {
            const buff = value;
            const buffYPosition = buff === null || buff === void 0 ? void 0 : buff.buff_y_Pos;
            const buffXPostion = buff === null || buff === void 0 ? void 0 : buff.buff_x_Pos;
            const radius = calculateBallSize();
            const isCollision = buffXPostion + radius > paddle_x &&
                buffXPostion - radius <
                    paddle_x + this.paddle.getPaddleSize.paddleWidth &&
                buffYPosition + radius > paddle_y &&
                buffYPosition - radius <
                    paddle_y + this.paddle.getPaddleSize.paddleHeight;
            if (isCollision) {
                this.applyBuffEffects(key);
                this.Buffs.delete(key);
            }
        }
    }
    drawBuffOuter() {
        if (this.Buffs.size === 0)
            return;
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
    ShouldBeRemovedFromBuffsStack() {
        for (let i = 0; i < this.appliedBuffs.length; i++) {
            if (this.appliedBuffs[i].timeEnd < Date.now()) {
                Buff.clearBuffEffect(this.appliedBuffs[i].appliedBuffId, this.gameState, this.paddle);
                this.appliedBuffs.splice(i, 1);
            }
        }
    }
    drawBuffStack() {
        this.ShouldBeRemovedFromBuffsStack();
        for (let i = 0; i < this.appliedBuffs.length; i++) {
            this.ctx.font = "24px Arial";
            this.ctx.fillStyle = "green";
            this.ctx.textAlign = "center";
            const x = this.canvas.width - 150;
            const y = this.canvas.height - (60 + i * 30);
            this.ctx.fillText(`${BuffTypes[this.appliedBuffs[i].appliedBuffId]}${clock((this.appliedBuffs[i].timeEnd - Date.now()) / 1000)}`, x, y);
        }
    }
    drawLives() {
        this.ctx.font = "24px Arial";
        this.ctx.fillStyle = "red";
        this.ctx.textAlign = "center";
        const x = 100;
        const y = this.canvas.height - 30;
        this.ctx.fillText(`lives: ${String(this.gameState.getLives)}`, x, y);
    }
    setInitCanvasSize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    CheckWin() {
        const WIN = !this.bricksArray.find((item) => item.getStatus == 1);
        const OverStatus = gameOverStatus(this.gameState.getLevel, this.gameState.playerPointsGet, WIN, this.gameState.getLives, this.elapsedTime, this.levelData.timer);
        if (OverStatus.end) {
            clearInterval(this.timer);
            this.cleanUpListeners();
            this.endLevelData = OverStatus;
            this.endGame = true;
        }
    }
    draw() {
        this.paddle.handleKeyPress(this.gameState);
        this.setInitCanvasSize();
        this.clearCanvas();
        this.drawClock();
        this.drawLives();
        this.drawBuffStack();
        return this.drawGame();
    }
}
