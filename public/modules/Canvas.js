import { Common } from "./Common";
import { Brick } from './Entities/Brick';
import { Ball } from "./Entities/Ball";
import { Paddle } from "./Entities/Paddle";
import { LEFT_ARROW, LEFT_NORMAL, RIGHT_ARROW, RIGHT_NORMAL, PADDLE_WIDTH, PADDLE_HEIGHT, INIT_BALL_POS, INIT_PADDLE_POS } from "../constants/gameState";
import { GameState } from "./gameState";
import { media } from "./Media";
import { SpecialBrick } from "./SpecialBrickView";
var Directions;
(function (Directions) {
    Directions[Directions["LeftArrows"] = LEFT_ARROW] = "LeftArrows";
    Directions[Directions["LeftNormal"] = LEFT_NORMAL] = "LeftNormal";
    Directions[Directions["RigthArrows"] = RIGHT_ARROW] = "RigthArrows";
    Directions[Directions["RigthNormal"] = RIGHT_NORMAL] = "RigthNormal";
})(Directions || (Directions = {}));
const GAME_CANVAS = "game_canvas";
export class Canvas extends Common {
    constructor(level, pointsToWin, lives, image, rowsCount, columnsCount) {
        super(GAME_CANVAS);
        this.BRICK_HEIGHT = 0;
        this.BRICK_WIDTH = 0;
        this.ballMoveRateX = -12;
        this.ballMoveRateY = -12;
        this.keyPressedLeft = false;
        this.keyPressedRight = false;
        this.canvas = null;
        this.ctx = null;
        this.bricksArray = [];
        this.image = image;
        this.rowsCount = rowsCount;
        this.columnsCount = columnsCount;
        this.gameState = new GameState(level, pointsToWin, INIT_PADDLE_POS, lives, INIT_BALL_POS, 0, 0);
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
    get getGameState() {
        return this.gameState;
    }
    configureCanvas(brickPoints, isSpecialLevel, special) {
        this.changeVisbilityOfGivenElement(this.elementId, true);
        this.canvas = this.elementId;
        this.canvas.style.backgroundColor = "black";
        this.ctx = this.canvas.getContext("2d");
        this.BRICK_HEIGHT = window.innerHeight / 18;
        this.BRICK_WIDTH = window.innerWidth / this.columnsCount;
        isSpecialLevel ? this.initBricks(special, brickPoints) : this.initBricks(null, brickPoints);
    }
    drawBuffs() {
    }
    isCollisonFromSide(i, ball_x, ball_y, RADIUS) {
        const brick_pos_x = this.bricksArray[i].brickStateGet.brick_x * this.BRICK_WIDTH;
        const brick_pos_y = this.bricksArray[i].brickStateGet.brick_y * this.BRICK_HEIGHT;
        return ((brick_pos_x + this.BRICK_WIDTH <= ball_x - RADIUS && brick_pos_x + this.BRICK_WIDTH >= ball_x - RADIUS - 12) || (brick_pos_x <= ball_x + RADIUS && brick_pos_x >= ball_x + RADIUS + 10) && ball_y - RADIUS > brick_pos_y + this.BRICK_HEIGHT && brick_pos_y < brick_pos_y + RADIUS);
    }
    isCollision(i, ball_x, ball_y, RADIUS) {
        const brick_pos_x = this.bricksArray[i].brickStateGet.brick_x * this.BRICK_WIDTH;
        const brick_pos_y = this.bricksArray[i].brickStateGet.brick_y * this.BRICK_HEIGHT;
        return (brick_pos_y + this.BRICK_HEIGHT > ball_y - RADIUS && brick_pos_y < ball_y + RADIUS && brick_pos_x < ball_x + RADIUS + 12.5 && brick_pos_x + this.BRICK_WIDTH > ball_x - RADIUS - 12.5);
    }
    CheckCollisionWithBricks(ball_x, ball_y, RADIUS) {
        for (let i = 0; i < this.bricksArray.length; i++) {
            if (this.bricksArray[i].brickStateGet.status == 0)
                continue;
            if (this.isCollision(i, ball_x, ball_y, RADIUS)) {
                this.isCollisonFromSide(i, ball_x, ball_y, RADIUS) ? this.ballMoveRateX = -this.ballMoveRateX : null;
                this.gameState.counter = this.gameState.counter += 1;
                const temp = this.bricksArray[i].brickStateGet.special;
                if (temp && temp.Position) {
                    if (temp.Position.brick_x * this.BRICK_WIDTH < ball_x - RADIUS && ball_x + RADIUS < temp.Position.brick_x * this.BRICK_WIDTH + this.BRICK_WIDTH && temp.Position.brick_y * this.BRICK_HEIGHT + this.BRICK_HEIGHT > ball_y - RADIUS) {
                        const specialBrick = new SpecialBrick(this.image, "http://localhost:1234/cotomabyc.mp3");
                        specialBrick.displayViewOfSpecialBrick();
                    }
                }
                this.ballMoveRateY = -this.ballMoveRateY;
                this.bricksArray[i].setStatus = 0;
                media.spawnSoundWhenHitBrick();
                break;
            }
        }
    }
    CheckCollisionWithPaddle(ball_y, ball_x, RADIUS, paddle_x, paddle_y) {
        if (ball_y >= paddle_y - PADDLE_HEIGHT && ball_x - RADIUS <= paddle_x + PADDLE_WIDTH && ball_x + RADIUS >= paddle_x) {
            media.spawnSoundWhenHitPaddle();
            this.ballMoveRateY = -this.ballMoveRateY;
        }
    }
    drawBall() {
        //change to fix resizeable
        const ball = new Ball(this.ctx, 25);
        const RADIUS = ball.radiusOfBallGetter;
        if (this.gameState.ball_positions.ball_x - RADIUS < 0) {
            this.ballMoveRateX = 12;
        }
        if (this.gameState.ball_positions.ball_y - RADIUS < 0) {
            this.ballMoveRateY = 12;
        }
        if (this.gameState.ball_positions.ball_x + RADIUS > window.innerWidth) {
            this.ballMoveRateX = -12;
        }
        if (this.gameState.ball_positions.ball_y + RADIUS > window.innerHeight) {
            this.gameState.lives = this.gameState.lives - 1;
            if (this.gameState.lives == 0) {
                return { end: false, status: 0 };
            }
            this.ballMoveRateY = -12;
            this.gameState.ball_positions = {
                ball_x: window.innerWidth / 2, ball_y: window.innerHeight - 150
            };
            this.gameState.paddle_positions = { paddle_y: window.innerHeight - 40, paddle_x: window.innerWidth / 2 - 100 };
        }
        const ball_x = this.gameState.ball_positions.ball_x;
        const ball_y = this.gameState.ball_positions.ball_y;
        const paddle_x = this.gameState.paddle_positions.paddle_x;
        const paddle_y = this.gameState.paddle_positions.paddle_y;
        //winning condtion
        if (this.gameState.counter == this.bricksArray.length) {
            return { end: false, status: 1 };
        }
        this.CheckCollisionWithPaddle(ball_y, ball_x, RADIUS, paddle_x, paddle_y);
        this.CheckCollisionWithBricks(ball_x, ball_y, RADIUS);
        ball.drawBall({ ball_x: this.gameState.ball_positions.ball_x += this.ballMoveRateX, ball_y: this.gameState.ball_positions.ball_y += this.ballMoveRateY });
        return { end: true, status: 0 };
    }
    setListenerMovePaddle() {
        window.addEventListener("keydown", (event) => {
            const keyCode = event.keyCode;
            if (keyCode == Directions.LeftArrows || keyCode == Directions.LeftNormal) {
                this.keyPressedLeft = true;
            }
            if (keyCode == Directions.RigthArrows || keyCode == Directions.RigthNormal) {
                this.keyPressedRight = true;
            }
        });
        window.addEventListener("keyup", (event) => {
            const keyCode = event.keyCode;
            if (keyCode == Directions.LeftArrows || keyCode == Directions.LeftNormal) {
                this.keyPressedLeft = false;
            }
            if (keyCode == Directions.RigthArrows || keyCode == Directions.RigthNormal) {
                this.keyPressedRight = false;
            }
        });
    }
    drawPaddle() {
        const paddle = new Paddle(PADDLE_WIDTH, PADDLE_HEIGHT, this.ctx);
        paddle.drawPaddle(this.gameState.paddle_positions);
    }
    addBricksToArray(brick_x, brick_y, special, color) {
        const brick = new Brick(this.BRICK_WIDTH, this.BRICK_HEIGHT, this.ctx, special, 1, brick_x, brick_y, color);
        this.bricksArray.push(brick);
    }
    initBricks(special, tabOfColor) {
        for (let i = 0; i < this.rowsCount; i++) {
            for (let j = 0; j < this.columnsCount; j++) {
                this.addBricksToArray(j, i, special, tabOfColor[i]);
            }
        }
    }
    drawBricks() {
        for (let i = 0; i < this.bricksArray.length; i++) {
            this.bricksArray[i].drawBrick(this.image, i);
        }
    }
    drawGame() {
        this.drawPaddle();
        this.drawBricks();
        return this.drawBall();
    }
    clearCanvas() {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
    handleKeyPress() {
        const paddle_x = this.gameState.paddle_positions.paddle_x;
        if (this.keyPressedLeft && paddle_x > 0) {
            this.gameState.paddle_positions.paddle_x -= 15;
        }
        if (this.keyPressedRight && paddle_x + PADDLE_WIDTH < window.innerWidth) {
            this.gameState.paddle_positions.paddle_x += 15;
        }
    }
    draw() {
        this.handleKeyPress();
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.clearCanvas();
        return this.drawGame();
    }
}
