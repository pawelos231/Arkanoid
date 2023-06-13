import { Common } from "./Common";
import { Brick } from './Entities/Brick';
import { Ball } from "./Entities/Ball";
import { Paddle } from "./Entities/Paddle";
import { PADDLE_WIDTH, PADDLE_HEIGHT, INIT_BALL_POS, INIT_PADDLE_POS } from "../constants/gameState";
import { Directions } from "../interfaces/HelperEnums";
import { GameState } from "./gameState";
import { media } from "./Media";
import { SpecialBrick } from "./SpecialBrickView";
import { Buff } from "./Entities/Buff";
import { BuffTypes } from "../interfaces/HelperEnums";
import { generateRandomNumber } from "../helpers/randomNumber";
import { gameOverStatus } from "../helpers/gameOverStatusCheck";
import { KRZYSIU_SPECIAL_IMAGE } from "../data/SpecialImages";
const GAME_CANVAS = "game_canvas";
export class Canvas extends Common {
    constructor(image, levelData) {
        super(GAME_CANVAS);
        this.BRICK_HEIGHT = 0;
        this.BRICK_WIDTH = 0;
        this.ballMoveRateX = -12;
        this.ballMoveRateY = -12;
        this.keyPressedLeft = false;
        this.keyPressedRight = false;
        this.drawBuffFlag = false;
        this.Buffs = new Map();
        this.levelData = levelData;
        this.canvas = null;
        this.ctx = null;
        this.bricksArray = [];
        this.image = image;
        this.rowsCount = this.levelData.numberOfRows;
        this.columnsCount = this.levelData.numberOfColumns;
        this.playerPoints = 0;
        this.hitCounter = 0;
        this.pointsToWin = this.levelData.requiredScore;
        this.appliedBuffs = [];
        this.gameState = new GameState(this.levelData.level, this.levelData.lives, this.pointsToWin, this.hitCounter, this.playerPoints, INIT_PADDLE_POS, INIT_BALL_POS, this.ballMoveRateX, this.ballMoveRateY);
    }
    get getGameState() {
        return this.gameState;
    }
    configureCanvas(isSpecialLevel, randomBrickIndex = 0) {
        this.changeVisbilityOfGivenElement(this.elementId, true);
        this.canvas = this.elementId;
        this.canvas.style.backgroundColor = "black";
        this.ctx = this.canvas.getContext("2d");
        this.BRICK_HEIGHT = window.innerHeight / 18;
        this.BRICK_WIDTH = window.innerWidth / this.columnsCount;
        isSpecialLevel ?
            this.initBricks(randomBrickIndex) :
            this.initBricks(-100);
    }
    addEventOnResize() {
        window.addEventListener("resize", () => {
            let values = [window.innerHeight, window.innerWidth];
            this.canvas.height = values[0];
            this.canvas.width = values[1];
            this.BRICK_HEIGHT = window.innerHeight / 18;
            this.BRICK_WIDTH = window.innerWidth / 8;
            for (let i = 0; i < this.bricksArray.length; i++) {
                this.bricksArray[i].widthSetter = this.BRICK_WIDTH;
                this.bricksArray[i].heightSetter = this.BRICK_HEIGHT;
            }
        });
    }
    setListenerMovePaddle() {
        window.addEventListener("keydown", (event) => {
            const keyCode = event.keyCode;
            if (keyCode == Directions.LeftArrows
                || keyCode == Directions.LeftNormal) {
                this.keyPressedLeft = true;
            }
            if (keyCode == Directions.RigthArrows
                || keyCode == Directions.RigthNormal) {
                this.keyPressedRight = true;
            }
        });
        window.addEventListener("keyup", (event) => {
            const keyCode = event.keyCode;
            if (keyCode == Directions.LeftArrows
                || keyCode == Directions.LeftNormal) {
                this.keyPressedLeft = false;
            }
            if (keyCode == Directions.RigthArrows
                || keyCode == Directions.RigthNormal) {
                this.keyPressedRight = false;
            }
        });
    }
    upadateScore(index) {
        this.gameState.playerPointsSet =
            this.bricksArray[index].brickPointsGet.points +
                this.getGameState.playerPointsGet;
    }
    isCollisonFromSide(i, ball_x, ball_y, RADIUS) {
        const brick_pos_x = this.bricksArray[i].brickStateGet.brick_x *
            this.BRICK_WIDTH;
        const brick_pos_y = this.bricksArray[i].brickStateGet.brick_y *
            this.BRICK_HEIGHT;
        return ((brick_pos_x + this.BRICK_WIDTH <= ball_x - RADIUS &&
            brick_pos_x + this.BRICK_WIDTH >= ball_x - RADIUS - 12) ||
            (brick_pos_x <= ball_x + RADIUS
                && brick_pos_x >= ball_x + RADIUS + 10)
                && ball_y - RADIUS > brick_pos_y + this.BRICK_HEIGHT
                && brick_pos_y < brick_pos_y + RADIUS);
    }
    isCollision(i, ball_x, ball_y, RADIUS) {
        const BRICK = this.bricksArray[i];
        const brick_pos_x = BRICK.brickStateGet.brick_x * this.BRICK_WIDTH;
        const brick_pos_y = BRICK.brickStateGet.brick_y * this.BRICK_HEIGHT;
        return (brick_pos_y + this.BRICK_HEIGHT > ball_y - RADIUS &&
            brick_pos_y < ball_y + RADIUS &&
            brick_pos_x < ball_x + RADIUS + 12.5 &&
            brick_pos_x + this.BRICK_WIDTH > ball_x - RADIUS - 12.5);
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
        const randomBuffsCount = (((Object.keys(BuffTypes).length) / 2));
        const RANDOM_NUMBER = generateRandomNumber(randomBuffsCount);
        const RANDOM_BUFF = Number(BuffTypes[BuffTypes[RANDOM_NUMBER]]);
        return RANDOM_BUFF;
    }
    DropBuff(BRICK) {
        //declare some buff dropping condtion here
        //1 IN 10 CHANCE
        if (Math.floor(Math.random() * 10) == 2) {
            const buffDropPosition = {
                buff_x: (BRICK.brickStateGet.brick_x * this.BRICK_WIDTH) + 110,
                buff_y: BRICK.brickStateGet.brick_y * this.BRICK_HEIGHT
            };
            const randomBuff = this.selectRandomBuff();
            const BuffInstance = new Buff(randomBuff, JSON.parse(JSON.stringify(this.bricksArray)), this.appliedBuffs, 5000, this.ctx, buffDropPosition);
            const key = `${randomBuff};${BuffInstance.createdAtVal}`;
            this.Buffs.set(key, BuffInstance);
            this.drawBuffFlag = true;
        }
    }
    CheckCollisionWithBricks(ball_x, ball_y, RADIUS) {
        for (let i = 0; i < this.bricksArray.length; i++) {
            const BRICK = this.bricksArray[i];
            if (BRICK.brickStateGet.status === 0)
                continue;
            const IS_COLLISION = this.isCollision(i, ball_x, ball_y, RADIUS);
            if (IS_COLLISION) {
                const MoveRateX = this.getGameState.BallMoveRateGetX;
                const MoveRateY = this.getGameState.BallMoveRateGetY;
                this.DropBuff(BRICK);
                this.upadateScore(i);
                this.isCollisonFromSide(i, ball_x, ball_y, RADIUS)
                    ? this.gameState.BallMoveRateSetX = -MoveRateX : null;
                const IsSpecialBrick = this.bricksArray[i].brickStateGet.specialBrick;
                const status = this.bricksArray[i].getStatus;
                if (IsSpecialBrick && status == 1) {
                    const specialBrick = new SpecialBrick(this.image, KRZYSIU_SPECIAL_IMAGE.sound);
                    specialBrick.displayViewOfSpecialBrick();
                }
                this.gameState.BallMoveRateSetY = -MoveRateY;
                let timesToHit = this.bricksArray[i].brickPointsGet.timesToHit;
                timesToHit--;
                console.log(timesToHit);
                this.bricksArray[i].timesToHitSet = timesToHit;
                if (timesToHit <= 0) {
                    this.bricksArray[i].setStatus = 0;
                }
                media.spawnSoundWhenHitBrick();
                break;
            }
        }
    }
    CheckCollisionWithPaddle(ball_y, ball_x, RADIUS, paddle_x, paddle_y) {
        if (ball_y >= paddle_y - PADDLE_HEIGHT &&
            ball_x - RADIUS <= paddle_x + PADDLE_WIDTH &&
            ball_x + RADIUS >= paddle_x) {
            media.spawnSoundWhenHitPaddle();
            this.gameState.BallMoveRateSetY = -this.gameState.BallMoveRateGetY;
        }
    }
    CheckWin() {
        const WIN = !(this.bricksArray.find((item) => item.getStatus == 1));
        return gameOverStatus(this.gameState.getLevel, this.gameState.playerPointsGet, WIN, this.gameState.lives);
    }
    drawBall() {
        //change to fix resizeable
        const ball = new Ball(this.ctx, 25);
        const RADIUS = ball.radiusOfBallGetter;
        if (this.gameState.ball_positions.ball_x - RADIUS < 0) {
            this.gameState.BallMoveRateSetX = 12;
        }
        if (this.gameState.ball_positions.ball_y - RADIUS < 0) {
            this.gameState.BallMoveRateSetY = 12;
        }
        if (this.gameState.ball_positions.ball_x + RADIUS > window.innerWidth) {
            this.gameState.BallMoveRateSetX = -12;
        }
        if (this.gameState.ball_positions.ball_y + RADIUS > window.innerHeight) {
            this.gameState.lives = this.gameState.lives - 1;
            this.ballMoveRateY = -12;
            this.gameState.ball_positions = {
                ball_x: window.innerWidth / 2,
                ball_y: window.innerHeight - 150
            };
            this.gameState.paddle_positions = {
                paddle_y: window.innerHeight - 40,
                paddle_x: window.innerWidth / 2 - 100
            };
        }
        const ball_x = this.gameState.ball_positions.ball_x;
        const ball_y = this.gameState.ball_positions.ball_y;
        const paddle_x = this.gameState.paddle_positions.paddle_x;
        const paddle_y = this.gameState.paddle_positions.paddle_y;
        this.CheckCollisionWithPaddle(ball_y, ball_x, RADIUS, paddle_x, paddle_y);
        this.CheckCollisionWithBricks(ball_x, ball_y, RADIUS);
        ball.drawBall({
            ball_x: this.gameState.ball_positions.ball_x +=
                this.gameState.BallMoveRateGetX,
            ball_y: this.gameState.ball_positions.ball_y +=
                this.gameState.BallMoveRateGetY
        });
    }
    drawPaddle() {
        const paddle = new Paddle(PADDLE_WIDTH, PADDLE_HEIGHT, this.ctx);
        this.isBuffColidedWithPaddle();
        paddle.drawPaddle(this.gameState.paddle_positions);
    }
    isBuffColidedWithPaddle() {
        const { paddle_x, paddle_y } = this.gameState.paddle_positions;
        for (const [key, value] of this.Buffs) {
            const buff = value;
            const buffYPosition = buff === null || buff === void 0 ? void 0 : buff.buff_y_Pos;
            const buffXPostion = buff === null || buff === void 0 ? void 0 : buff.buff_x_Pos;
            const isCollsion = (buffXPostion > paddle_x &&
                buffXPostion < paddle_x + PADDLE_WIDTH)
                &&
                    (buffYPosition > paddle_y &&
                        buffYPosition < paddle_y + PADDLE_HEIGHT);
            if (isCollsion) {
                this.applyBuffEffects(key);
                this.Buffs.delete(key);
            }
        }
    }
    addBricksToArray(brick_x, brick_y, specialBrick, brickData) {
        console.log(brick_x, brick_y);
        const brick = new Brick(this.BRICK_WIDTH, this.BRICK_HEIGHT, this.ctx, specialBrick, 1, brick_x, brick_y, brickData);
        this.bricksArray.push(brick);
    }
    initBricks(SpecialBrickIndex = -100) {
        const sortedLevel = this.levelData.brickArray.sort((a, b) => a.rowNumber - b.rowNumber);
        let count = 0;
        console.log(sortedLevel);
        for (let i = 0; i < sortedLevel.length; i++) {
            const levelData = {
                color: sortedLevel[i].color,
                timesToHit: sortedLevel[i].timesToHit,
                points: sortedLevel[i].points,
                buffDropRate: sortedLevel[i].buffDropRate
            };
            count++;
            this.addBricksToArray(sortedLevel[i].columnNumber, sortedLevel[i].rowNumber, count === SpecialBrickIndex ? true : false, levelData);
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
    drawBricks() {
        for (let i = 0; i < this.bricksArray.length; i++) {
            this.bricksArray[i].drawBrick(this.image);
        }
    }
    drawGame() {
        this.drawPaddle();
        this.drawBricks();
        this.drawBall();
        this.drawBuffOuter();
        return this.CheckWin();
    }
    clearCanvas() {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
    handleKeyPress() {
        const paddle_x = this.gameState.paddle_positions.paddle_x;
        if (this.keyPressedLeft && paddle_x > 0) {
            this.gameState.paddle_positions.paddle_x -= 15;
        }
        if (this.keyPressedRight
            && paddle_x + PADDLE_WIDTH < window.innerWidth) {
            this.gameState.paddle_positions.paddle_x += 15;
        }
    }
    setInitCanvasSize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    draw() {
        this.handleKeyPress();
        this.setInitCanvasSize();
        this.clearCanvas();
        return this.drawGame();
    }
}
