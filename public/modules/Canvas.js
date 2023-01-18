import { Common } from "./Common";
import { Brick } from './Entities/Brick';
import { Ball } from "./Entities/Ball";
import { Paddle } from "./Entities/Paddle";
import { colorRandomizer } from '../helpers/colorRandomizer';
import { loader } from "./Loader";
const GAME_CANVAS = "game_canvas";
export class Canvas extends Common {
    constructor() {
        super(GAME_CANVAS);
        this.canvas = null;
        this.ctx = null;
    }
    loadSpecialImages() {
        const image = loader.loadImage("https://cdn2.thecatapi.com/images/cgq.jpg");
        console.log(image);
        image.width = 50;
        image.height = 50;
        return image;
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
    drawPaddle() {
        const width = 200;
        const height = 40;
        const paddle = new Paddle(width, height, this.ctx);
        paddle.drawPaddle();
        window.addEventListener("keydown", (event) => {
            paddle.updatePaddlePostion(event.keyCode);
        });
    }
    drawBricks(heightOffset, widthOffset, color, special, images = this.loadSpecialImages()) {
        const heightOfBrick = window.innerHeight / 16;
        const widthOfABrick = window.innerWidth / 8;
        const brick = new Brick(widthOfABrick, heightOfBrick, this.ctx, special);
        brick.drawBrick(heightOffset, widthOffset, color, images);
    }
    drawGame() {
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
