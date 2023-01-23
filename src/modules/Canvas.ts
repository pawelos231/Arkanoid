import { Common } from "./Common";
import { Brick } from './Entities/Brick'
import { Ball } from "./Entities/Ball";
import { Paddle } from "./Entities/Paddle";
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
    bricksArray: Array<any>
    constructor(level: number, pointsToWin: number) {
        super(GAME_CANVAS)
        this.canvas = null as any
        this.ctx = null as any
        this.bricksArray = []
        this.gameState = new GameState(level, pointsToWin, { paddle_y: window.innerHeight - 70, paddle_x: window.innerWidth / 2 - 100 }, 3, {
            ball_x: window.innerWidth / 2, ball_y: window.innerHeight - 150
        })
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
    dx = -12
    dy = -12
    drawBall() {
        const ball: Ball = new Ball(this.ctx, 25)
        let radius = ball.radiusOfBallGetter
        if (this.gameState.ball_positions.ball_x - radius < 0) {
            this.dx = 12
        }
        if (this.gameState.ball_positions.ball_y - radius < 0) {
            this.dy = 12
        }
        if (this.gameState.ball_positions.ball_x + radius > window.innerWidth) {
            this.dx = -12
        }
        if (this.gameState.ball_positions.ball_y + radius > window.innerHeight) {
            this.dy = -12
            this.gameState.ball_positions = {
                ball_x: window.innerWidth / 2, ball_y: window.innerHeight - 150
            }
            this.gameState.paddle_positions = { paddle_y: window.innerHeight - 70, paddle_x: window.innerWidth / 2 - 100 }
        }
        let paddle_y = this.gameState.paddle_positions.paddle_y
        let ball_y = this.gameState.ball_positions.ball_y
        let ball_x = this.gameState.ball_positions.ball_x
        let paddle_x = this.gameState.paddle_positions.paddle_x
        console.log(ball_x + radius, paddle_x)
        if (ball_y >= paddle_y - PADDLE_HEIGHT && ball_x - radius <= paddle_x + PADDLE_WIDTH && ball_x + radius >= paddle_x) {
            console.log("zderzenie!", ball_y, ball_x + radius, paddle_x + PADDLE_WIDTH, paddle_y - PADDLE_HEIGHT)
            this.dy = -this.dy
        }

        ball.drawBall({ ball_x: this.gameState.ball_positions.ball_x += this.dx, ball_y: this.gameState.ball_positions.ball_y += this.dy })



    }
    interval: any
    public setListenerMovePaddle(): void {
        window.addEventListener("keydown", (event: KeyboardEvent) => {
            let keyCode = event.keyCode
            const temp = this.gameState.paddle_positions.paddle_x
            if (keyCode == Directions.LeftArrows || keyCode == Directions.LeftNormal) {
                temp >= 0 ? this.gameState.paddle_positions.paddle_x -= 20 : null

            }
            if (keyCode == Directions.RigthArrows || keyCode == Directions.RigthNormal) {
                (temp + PADDLE_WIDTH) <= window.innerWidth ? this.gameState.paddle_positions.paddle_x += 20 : null

            }
        })
    }
    private drawPaddle() {
        const paddle = new Paddle(PADDLE_WIDTH, PADDLE_HEIGHT, this.ctx)
        paddle.drawPaddle(this.gameState.paddle_positions)
    }
    drawBricks(x: number, y: number, color: string, special: boolean) {
        const heightOfBrick: number = window.innerHeight / 16
        const widthOfABrick: number = window.innerWidth / 8
        const brick: Brick = new Brick(widthOfABrick, heightOfBrick, this.ctx, special, 1, x, y)
        brick.drawBrick(x, y, color)
    }
    private async drawGame(tabOfColors: string[]): Promise<void> {
        this.drawPaddle()
        this.drawBall()
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 8; j++) {
                const random = Math.floor(Math.random() * 100)
                this.drawBricks(i, j, tabOfColors[i], random == 69)
            }
        }

    }
    private clearCanvas(): void {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    }
    public draw(tabOfColors: string[]): void {
        this.configureCanvas()
        this.clearCanvas()
        window.addEventListener("resize", () => {
            let values: number[] = [window.innerHeight, window.innerWidth]
            this.canvas.height = values[0]
            this.canvas.width = values[1]
            this.drawGame(tabOfColors)
        })
        this.drawGame(tabOfColors)
    }
}
