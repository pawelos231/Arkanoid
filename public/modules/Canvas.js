import { Common } from "./Common";
import { Brick } from './Entities/Brick';
import { Ball } from "./Entities/Ball";
import { Paddle } from "./Entities/Paddle";
import { LEFT_ARROW, LEFT_NORMAL, RIGHT_ARROW, RIGHT_NORMAL, PADDLE_WIDTH, PADDLE_HEIGHT, INIT_BALL_POS, INIT_PADDLE_POS } from "../constants/gameState";
import { GameState } from "./gameState";
var Directions;
(function (Directions) {
    Directions[Directions["LeftArrows"] = LEFT_ARROW] = "LeftArrows";
    Directions[Directions["LeftNormal"] = LEFT_NORMAL] = "LeftNormal";
    Directions[Directions["RigthArrows"] = RIGHT_ARROW] = "RigthArrows";
    Directions[Directions["RigthNormal"] = RIGHT_NORMAL] = "RigthNormal";
})(Directions || (Directions = {}));
const GAME_CANVAS = "game_canvas";
export class Canvas extends Common {
    constructor(level, pointsToWin, lives, image) {
        super(GAME_CANVAS);
        this.dx = -12;
        this.dy = -12;
        this.canvas = null;
        this.ctx = null;
        this.bricksArray = [];
        this.image = image;
        this.gameState = new GameState(level, pointsToWin, INIT_PADDLE_POS, lives, INIT_BALL_POS);
    }
    configureCanvas() {
        this.changeVisbilityOfGivenElement(this.elementId, true);
        this.canvas = this.elementId;
        this.canvas.style.backgroundColor = "black";
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    drawBuffs() {
    }
    drawBall() {
        const ball = new Ball(this.ctx, 25);
        const RADIUS = ball.radiusOfBallGetter;
        if (this.gameState.ball_positions.ball_x - RADIUS < 0) {
            this.dx = 12;
        }
        if (this.gameState.ball_positions.ball_y - RADIUS < 0) {
            this.dy = 12;
        }
        if (this.gameState.ball_positions.ball_x + RADIUS > window.innerWidth) {
            this.dx = -12;
        }
        if (this.gameState.ball_positions.ball_y + RADIUS > window.innerHeight) {
            this.dy = -12;
            this.gameState.ball_positions = {
                ball_x: window.innerWidth / 2, ball_y: window.innerHeight - 150
            };
            this.gameState.paddle_positions = { paddle_y: window.innerHeight - 70, paddle_x: window.innerWidth / 2 - 100 };
        }
        const paddle_y = this.gameState.paddle_positions.paddle_y;
        const ball_y = this.gameState.ball_positions.ball_y;
        const ball_x = this.gameState.ball_positions.ball_x;
        const paddle_x = this.gameState.paddle_positions.paddle_x;
        if (ball_y >= paddle_y - PADDLE_HEIGHT && ball_x - RADIUS <= paddle_x + PADDLE_WIDTH && ball_x + RADIUS >= paddle_x) {
            this.dy = -this.dy;
        }
        ball.drawBall({ ball_x: this.gameState.ball_positions.ball_x += this.dx, ball_y: this.gameState.ball_positions.ball_y += this.dy });
    }
    setListenerMovePaddle() {
        window.addEventListener("keydown", (event) => {
            let keyCode = event.keyCode;
            const temp = this.gameState.paddle_positions.paddle_x;
            if (keyCode == Directions.LeftArrows || keyCode == Directions.LeftNormal) {
                temp >= 0 ? this.gameState.paddle_positions.paddle_x -= 20 : null;
            }
            if (keyCode == Directions.RigthArrows || keyCode == Directions.RigthNormal) {
                (temp + PADDLE_WIDTH) <= window.innerWidth ? this.gameState.paddle_positions.paddle_x += 20 : null;
            }
        });
    }
    drawPaddle() {
        const paddle = new Paddle(PADDLE_WIDTH, PADDLE_HEIGHT, this.ctx);
        paddle.drawPaddle(this.gameState.paddle_positions);
    }
    drawBrick(brick_x, brick_y, color, special, counter) {
        const heightOfBrick = window.innerHeight / 16;
        const widthOfABrick = window.innerWidth / 8;
        const brick = new Brick(widthOfABrick, heightOfBrick, this.ctx, special, 1, brick_x, brick_y);
        brick.drawBrick(brick_x, brick_y, color, this.image, counter);
    }
    async drawGame(tabOfColors, special) {
        this.drawPaddle();
        this.drawBall();
        let counter = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 8; j++) {
                this.drawBrick(i, j, tabOfColors[i], special, counter++);
            }
        }
    }
    clearCanvas() {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
    draw(tabOfColors, special) {
        this.configureCanvas();
        this.clearCanvas();
        window.addEventListener("resize", () => {
            let values = [window.innerHeight, window.innerWidth];
            this.canvas.height = values[0];
            this.canvas.width = values[1];
            this.drawGame(tabOfColors, special);
        });
        this.drawGame(tabOfColors, special);
    }
}
