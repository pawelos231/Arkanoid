import { Common } from "./Common";
import { Brick } from './Entities/Brick';
import { Ball } from "./Entities/Ball";
import { Paddle } from "./Entities/Paddle";
import { LEFT_ARROW, LEFT_NORMAL, RIGHT_ARROW, RIGHT_NORMAL, PADDLE_WIDTH, PADDLE_HEIGHT } from "../constants/gameState";
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
    constructor(level, pointsToWin) {
        super(GAME_CANVAS);
        this.dx = -16;
        this.dy = -10;
        this.canvas = null;
        this.ctx = null;
        this.bricksArray = [];
        this.gameState = new GameState(level, pointsToWin, { paddle_y: window.innerHeight - 70, paddle_x: window.innerWidth / 2 - 100 }, 3, {
            ball_x: window.innerWidth / 2, ball_y: window.innerHeight - 150
        });
        this.paddle = null;
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
        let radius = ball.radiusOfBallGetter;
        if (this.gameState.ball_positions.ball_x - radius < 0) {
            this.dx = 10;
        }
        if (this.gameState.ball_positions.ball_y - radius < 0) {
            this.dy = 10;
        }
        if (this.gameState.ball_positions.ball_x + radius > window.innerWidth) {
            this.dx = -10;
        }
        if (this.gameState.ball_positions.ball_y + radius > window.innerHeight) {
            this.dy = -10;
        }
        let paddle_y = this.gameState.paddle_positions.paddle_y;
        let ball_y = this.gameState.ball_positions.ball_y;
        let ball_x = this.gameState.ball_positions.ball_x;
        let paddle_x = this.gameState.paddle_positions.paddle_x;
        console.log(ball_y, paddle_y - PADDLE_HEIGHT);
        if (ball_y > paddle_y - PADDLE_HEIGHT && ball_x + radius < paddle_x + PADDLE_WIDTH && ball_x > paddle_x) {
            console.log("zderzenie!");
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
    drawBricks(x, y, color, special) {
        const heightOfBrick = window.innerHeight / 16;
        const widthOfABrick = window.innerWidth / 8;
        const brick = new Brick(widthOfABrick, heightOfBrick, this.ctx, special, 1, x, y);
        brick.drawBrick(x, y, color);
    }
    async drawGame(tabOfColors) {
        this.drawPaddle();
        this.drawBall();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 8; j++) {
                const random = Math.floor(Math.random() * 100);
                this.drawBricks(i, j, tabOfColors[i], random == 69);
            }
        }
    }
    clearCanvas() {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
    draw(tabOfColors) {
        this.configureCanvas();
        this.clearCanvas();
        window.addEventListener("resize", () => {
            let values = [window.innerHeight, window.innerWidth];
            this.canvas.height = values[0];
            this.canvas.width = values[1];
            this.drawGame(tabOfColors);
        });
        this.drawGame(tabOfColors);
    }
}
