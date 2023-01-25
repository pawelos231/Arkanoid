import { Common } from "./Common";
import { Brick } from './Entities/Brick'
import { Ball } from "./Entities/Ball";
import { Paddle } from "./Entities/Paddle";
import { LEFT_ARROW, LEFT_NORMAL, RIGHT_ARROW, RIGHT_NORMAL, PADDLE_WIDTH, PADDLE_HEIGHT, INIT_BALL_POS, INIT_PADDLE_POS } from "../constants/gameState";
import { GameState } from "./gameState";
import { Specialbrick } from "../interfaces/gameStateInterface";


enum Directions {
    LeftArrows = LEFT_ARROW,
    LeftNormal = LEFT_NORMAL,
    RigthArrows = RIGHT_ARROW,
    RigthNormal = RIGHT_NORMAL,
}
const GAME_CANVAS = "game_canvas"

export class Canvas<T> extends Common {
    private BRICK_HEIGHT = window.innerHeight / 18
    private BRICK_WIDTH: number = window.innerWidth / 8
    private ballMoveRateX = -12
    private ballMoveRateY = -12
    private ctx: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;
    gameState: GameState
    bricksArray: Array<any>
    image: T
    constructor(level: number, pointsToWin: number, lives: number, image: T) {
        super(GAME_CANVAS)
        this.canvas = null as any
        this.ctx = null as any
        this.bricksArray = []
        this.image = image
        this.gameState = new GameState(level, pointsToWin, INIT_PADDLE_POS, lives, INIT_BALL_POS)
    }

    public addEventOnResize(): void {
        window.addEventListener("resize", () => {
            let values: number[] = [window.innerHeight, window.innerWidth]
            this.canvas.height = values[0]
            this.canvas.width = values[1]
            this.BRICK_HEIGHT = window.innerHeight / 18
            this.BRICK_WIDTH = window.innerWidth / 8
        })

    }
    public configureCanvas(): void {

        this.changeVisbilityOfGivenElement(this.elementId, true)

        this.canvas = this.elementId as HTMLCanvasElement;
        this.canvas.style.backgroundColor = "black"
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    }
    drawBuffs() {

    }

    drawBall() {
        //change to fix resizeable
        const ball: Ball = new Ball(this.ctx, 25)
        const RADIUS: number = ball.radiusOfBallGetter
        if (this.gameState.ball_positions.ball_x - RADIUS < 0) {
            this.ballMoveRateX = 12
        }
        if (this.gameState.ball_positions.ball_y - RADIUS < 0) {
            this.ballMoveRateY = 12
        }
        if (this.gameState.ball_positions.ball_x + RADIUS > window.innerWidth) {
            this.ballMoveRateX = -12
        }
        if (this.gameState.ball_positions.ball_y + RADIUS > window.innerHeight) {
            this.ballMoveRateY = -12
            this.gameState.ball_positions = {
                ball_x: window.innerWidth / 2, ball_y: window.innerHeight - 150
            }
            this.gameState.paddle_positions = { paddle_y: window.innerHeight - 70, paddle_x: window.innerWidth / 2 - 100 }
        }
        const paddle_y: number = this.gameState.paddle_positions.paddle_y
        const ball_y: number = this.gameState.ball_positions.ball_y
        const ball_x: number = this.gameState.ball_positions.ball_x
        const paddle_x: number = this.gameState.paddle_positions.paddle_x

        if (ball_y >= paddle_y - PADDLE_HEIGHT && ball_x - RADIUS <= paddle_x + PADDLE_WIDTH && ball_x + RADIUS >= paddle_x) {
            this.ballMoveRateY = -this.ballMoveRateY
        }

        ball.drawBall({ ball_x: this.gameState.ball_positions.ball_x += this.ballMoveRateX, ball_y: this.gameState.ball_positions.ball_y += this.ballMoveRateY })
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
    private drawPaddle(): void {
        const paddle: Paddle = new Paddle(PADDLE_WIDTH, PADDLE_HEIGHT, this.ctx)
        paddle.drawPaddle(this.gameState.paddle_positions)
    }
    private drawBrick(brick_x: number, brick_y: number, color: string, special: Specialbrick | null): void {
        const brick: Brick = new Brick(this.BRICK_WIDTH, this.BRICK_HEIGHT, this.ctx, special, 1, brick_x, brick_y)
        brick.drawBrick<T>(brick_x, brick_y, color, this.image)
    }
    private drawGame(tabOfColors: string[], special: Specialbrick | null): void {
        this.drawPaddle()
        this.drawBall()
        if (special) {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 8; j++) {
                    this.drawBrick(i, j, tabOfColors[i], special)
                }
            }
        }
        else {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 8; j++) {
                    this.drawBrick(i, j, tabOfColors[i], null)
                }
            }
        }


    }
    private clearCanvas(): void {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    }
    public draw(tabOfColors: string[], isSpecialLevel: boolean, special: Specialbrick): void {

        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.clearCanvas()
        window.addEventListener("resize", () => {
            let values: number[] = [window.innerHeight, window.innerWidth]
            this.canvas.height = values[0]
            this.canvas.width = values[1]
            this.drawGame(tabOfColors, special)
        })
        isSpecialLevel ? this.drawGame(tabOfColors, special) : this.drawGame(tabOfColors, null)

    }
}
