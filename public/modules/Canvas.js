import { Common } from "./Common";
import { Brick } from './Entities/Brick';
import { Ball } from "./Entities/Ball";
import { Paddle } from "./Entities/Paddle";
import { colorRandomizer } from '../helpers/colorRandomizer';
var Direction;
(function (Direction) {
    Direction[Direction["LeftArrows"] = 65] = "LeftArrows";
    Direction[Direction["LeftNormal"] = 37] = "LeftNormal";
    Direction[Direction["RigthArrows"] = 68] = "RigthArrows";
    Direction[Direction["RigthNormal"] = 39] = "RigthNormal";
})(Direction || (Direction = {}));
const PADDLE_WIDTH = 200;
const PADDLE_HEIGHT = 40;
const GAME_CANVAS = "game_canvas";
export class Canvas extends Common {
    constructor() {
        super(GAME_CANVAS);
        this.canvas = null;
        this.ctx = null;
        this.positions = { heightOffset: window.innerHeight - 70, widthOffset: window.innerWidth / 2 - 100 };
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
            const temp = this.positions.widthOffset;
            if (keyCode == Direction.LeftArrows || keyCode == Direction.LeftNormal) {
                temp >= 0 ? this.positions.widthOffset -= 20 : null;
            }
            if (keyCode == Direction.RigthArrows || keyCode == Direction.RigthNormal) {
                temp + PADDLE_WIDTH <= window.innerWidth ? this.positions.widthOffset += 20 : null;
            }
        });
    }
    drawPaddle() {
        const paddle = new Paddle(PADDLE_WIDTH, PADDLE_HEIGHT, this.ctx);
        paddle.drawPaddle(this.positions);
    }
    drawBricks(heightOffset, widthOffset, color, special) {
        const heightOfBrick = window.innerHeight / 16;
        const widthOfABrick = window.innerWidth / 8;
        const brick = new Brick(widthOfABrick, heightOfBrick, this.ctx, special);
        brick.drawBrick(heightOffset, widthOffset, color);
    }
    async drawGame() {
        this.drawPaddle();
        this.drawBall();
        for (let i = 0; i < 3; i++) {
            const color = colorRandomizer();
            for (let j = 0; j < 8; j++) {
                const random = Math.floor(Math.random() * 100);
                this.drawBricks(i, j, color, random == 69);
            }
        }
    }
    draw() {
        this.configureCanvas();
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        window.addEventListener("resize", () => {
            let values = [window.innerHeight, window.innerWidth];
            this.canvas.height = values[0];
            this.canvas.width = values[1];
            this.drawGame();
        });
        this.drawGame();
    }
}
