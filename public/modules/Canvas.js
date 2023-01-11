import { Common } from "./Common";
import { Brick } from './Entities/Brick';
import { Paddle } from "./Entities/Paddle";
const GAME_CANVAS = "game_canvas";
export class Canvas extends Common {
    constructor() {
        super(GAME_CANVAS);
        this.canvas = null;
        this.ctx = null;
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
    }
    drawPaddle() {
        const width = 200;
        const height = 40;
        const paddle = new Paddle(width, height, this.ctx);
        paddle.drawPaddle();
    }
    drawBricks(heightOffset, widthOffset) {
        const heightOfBrick = window.innerHeight / 16;
        const widthOfABrick = window.innerWidth / 8;
        const brick = new Brick(widthOfABrick, heightOfBrick, this.ctx);
        brick.drawBrick(heightOffset, widthOffset);
    }
    drawGame() {
        this.drawPaddle();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 8; j++) {
                this.drawBricks(i, j);
            }
        }
    }
    draw() {
        window.addEventListener("resize", () => {
            let values = [window.innerHeight, window.innerWidth];
            this.canvas.height = values[0];
            this.canvas.width = values[1];
            this.drawGame();
        });
        this.configureCanvas();
        this.drawGame();
    }
}
