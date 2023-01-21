import { Common } from "./Common";
import { Brick } from './Entities/Brick'
import { Ball } from "./Entities/Ball";
import { Paddle } from "./Entities/Paddle";
import { colorRandomizer } from '../helpers/colorRandomizer'
import { LEFT_ARROW, LEFT_NORMAL, RIGHT_ARROW, RIGHT_NORMAL, PADDLE_WIDTH, PADDLE_HEIGHT } from "../constants/gameState";
import { GameState } from "./gameState";

enum Directions {
    LeftArrows = LEFT_ARROW,
    LeftNormal = LEFT_NORMAL,
    RigthArrows = RIGHT_ARROW,
    RigthNormal = RIGHT_NORMAL,
}
const GAME_CANVAS = "game_canvas"

export class Canvas extends Common {
    private ctx: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;
    paddle: Paddle | any
    gameState: GameState
    constructor(level: number, pointsToWin: number) {
        super(GAME_CANVAS)
        this.canvas = null as any
        this.ctx = null as any
        this.gameState = new GameState(level, pointsToWin, { heightOffset:  window.innerHeight - 70, widthOffset: window.innerWidth / 2 - 100 })
        this.paddle = null
    }
    private configureCanvas(): void {
        
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
    public setListenerMovePaddle(): void {
        window.addEventListener("keydown", (event: KeyboardEvent) => {
            let keyCode = event.keyCode
            const temp = this.gameState.paddle_positions.widthOffset
            if (keyCode == Directions.LeftArrows || keyCode == Directions.LeftNormal) {
                temp >= 0 ? this.gameState.paddle_positions.widthOffset -= 20 : null
                
            }
            if (keyCode == Directions.RigthArrows || keyCode == Directions.RigthNormal) {
                (temp + PADDLE_WIDTH) <= window.innerWidth ? this.gameState.paddle_positions.widthOffset += 20 : null
                
            }
        })
    }
    drawPaddle() {
        const paddle = new Paddle(PADDLE_WIDTH, PADDLE_HEIGHT, this.ctx)
        paddle.drawPaddle(this.gameState.paddle_positions)
    }
    drawBricks(heightOffset: number, widthOffset: number, color: string, special: boolean ) {
        const heightOfBrick: number = window.innerHeight / 16
        const widthOfABrick: number = window.innerWidth / 8
        const brick: Brick = new Brick(widthOfABrick, heightOfBrick, this.ctx, special)
        brick.drawBrick(heightOffset, widthOffset, color)
    }
    private async drawGame(): Promise<void> {
        this.drawPaddle()
        this.drawBall()
        for (let i = 0; i < 3; i++) {
            const color: string = colorRandomizer()
            for (let j = 0; j < 8; j++) {
                const random = Math.floor(Math.random() * 100)
                this.drawBricks(i, j, color, random == 69)
            }
        }

    }
    private clearCnvas(): void {
        this.ctx.clearRect(0,0, window.innerWidth, window.innerHeight)
    }
    public draw(): void {
        this.configureCanvas()
        this.clearCnvas()
        window.addEventListener("resize", () => {
            let values: number[] = [window.innerHeight, window.innerWidth]
            this.canvas.height = values[0]
            this.canvas.width = values[1]
            this.drawGame()
        })
        this.drawGame()
    }
}
