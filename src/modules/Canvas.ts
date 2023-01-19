import { Common } from "./Common";
import { Brick } from './Entities/Brick'
import { Ball } from "./Entities/Ball";
import { Paddle } from "./Entities/Paddle";
import { colorRandomizer } from '../helpers/colorRandomizer'
import { loader } from "./Loader";
const GAME_CANVAS = "game_canvas"

export class Canvas extends Common {
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    constructor() {
        super(GAME_CANVAS)
        this.canvas = null as any
        this.ctx = null as any
    }
    configureCanvas(): void {
        
        this.changeVisbilityOfGivenElement(this.elementId, true)

        this.canvas = this.elementId as HTMLCanvasElement;
        this.canvas.style.backgroundColor = "black"
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
    }
    drawBuffs() {

    }
    drawBall() {
        const ball = new Ball(this.ctx)
        ball.drawBall()
    }
    drawPaddle() {
        const width = 200
        const height = 40
        const paddle: Paddle = new Paddle(width, height, this.ctx)
        paddle.drawPaddle()
        window.addEventListener("keydown", (event: KeyboardEvent) => {
            paddle.updatePaddlePostion(event.keyCode)
        })
    }
    drawBricks(heightOffset: number, widthOffset: number, color: string, special: boolean ) {
        const heightOfBrick: number = window.innerHeight / 16
        const widthOfABrick: number = window.innerWidth / 8
        const brick: Brick = new Brick(widthOfABrick, heightOfBrick, this.ctx, special)
        brick.drawBrick(heightOffset, widthOffset, color)
    }
    async drawGame() {
        let images: any;
        
        this.drawPaddle()
        this.drawBall()
        for (let i = 0; i < 3; i++) {
            const color: string = colorRandomizer()
            for (let j = 0; j < 8; j++) {
                const random = Math.floor(Math.random() * 100)
                this.drawBricks(i, j, color, random == 5)
            }
        }

    }
    draw() {
        window.addEventListener("resize", () => {
            let values: number[] = [window.innerHeight, window.innerWidth]
            this.canvas.height = values[0]
            this.canvas.width = values[1]
            this.drawGame()
        })
        this.configureCanvas()
        this.drawGame()
    }
}
