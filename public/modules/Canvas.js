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
        this.canvas = null;
        this.ctx = null;
        this.gameState = new GameState(level, pointsToWin, { heightOffset: window.innerHeight - 70, widthOffset: window.innerWidth / 2 - 100 });
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
        const ball = new Ball(this.ctx);
        ball.drawBall();
    }
    setListenerMovePaddle() {
        window.addEventListener("keydown", (event) => {
            let keyCode = event.keyCode;
            const temp = this.gameState.paddle_positions.widthOffset;
            if (keyCode == Directions.LeftArrows || keyCode == Directions.LeftNormal) {
                temp >= 0 ? this.gameState.paddle_positions.widthOffset -= 20 : null;
            }
            if (keyCode == Directions.RigthArrows || keyCode == Directions.RigthNormal) {
                (temp + PADDLE_WIDTH) <= window.innerWidth ? this.gameState.paddle_positions.widthOffset += 20 : null;
            }
        });
    }
    drawPaddle() {
        const paddle = new Paddle(PADDLE_WIDTH, PADDLE_HEIGHT, this.ctx);
        paddle.drawPaddle(this.gameState.paddle_positions);
    }
    drawBricks(heightOffset, widthOffset, color, special) {
        const heightOfBrick = window.innerHeight / 16;
        const widthOfABrick = window.innerWidth / 8;
        const brick = new Brick(widthOfABrick, heightOfBrick, this.ctx, special);
        brick.drawBrick(heightOffset, widthOffset, color);
    }
    async drawGame(tabOfColors) {
        this.drawPaddle();
        this.drawBall();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 8; j++) {
                const random = Math.floor(Math.random() * 10);
                this.drawBricks(i, j, tabOfColors[i], random == 6);
            }
        }
    }
    clearCnvas() {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
    draw(tabOfColors) {
        this.configureCanvas();
        this.clearCnvas();
        window.addEventListener("resize", () => {
            let values = [window.innerHeight, window.innerWidth];
            this.canvas.height = values[0];
            this.canvas.width = values[1];
            this.drawGame(tabOfColors);
        });
        this.drawGame(tabOfColors);
    }
}
