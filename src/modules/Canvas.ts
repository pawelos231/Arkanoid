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
    private BRICK_HEIGHT: number = 0
    private BRICK_WIDTH: number = 0
    private ballMoveRateX: number = -12
    private ballMoveRateY: number = -12
    private rowsCount: number
    private columnsCount: number
    private keyPressedLeft: boolean = false
    private keyPressedRight: boolean = false
    private ctx: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;
    gameState: GameState
    bricksArray: Array<any>
    image: T
    constructor(level: number, pointsToWin: number, lives: number, image: T, rowsCount: number, columnsCount: number) {
        super(GAME_CANVAS)
        this.canvas = null as any
        this.ctx = null as any
        this.bricksArray = []
        this.image = image
        this.rowsCount = rowsCount
        this.columnsCount = columnsCount
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
        this.BRICK_HEIGHT = window.innerHeight / 18
        this.BRICK_WIDTH = window.innerWidth / this.columnsCount
    }
    drawBuffs() {

    }

    private drawBall(): void {
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
            this.gameState.paddle_positions = { paddle_y: window.innerHeight - 40, paddle_x: window.innerWidth / 2 - 100 }
        }
        const ball_x: number = this.gameState.ball_positions.ball_x
        const ball_y: number = this.gameState.ball_positions.ball_y
        const paddle_x: number = this.gameState.paddle_positions.paddle_x
        const paddle_y: number = this.gameState.paddle_positions.paddle_y

        if (ball_y >= paddle_y - PADDLE_HEIGHT && ball_x - RADIUS <= paddle_x + PADDLE_WIDTH && ball_x + RADIUS >= paddle_x) {
            this.ballMoveRateY = -this.ballMoveRateY
        }

        ball.drawBall({ ball_x: this.gameState.ball_positions.ball_x += this.ballMoveRateX, ball_y: this.gameState.ball_positions.ball_y += this.ballMoveRateY })
    }

    public setListenerMovePaddle(): void {
        window.addEventListener("keydown", (event: KeyboardEvent) => {
            const keyCode: number = event.keyCode
            if (keyCode == Directions.LeftArrows || keyCode == Directions.LeftNormal) {
                this.keyPressedLeft = true

            }
            if (keyCode == Directions.RigthArrows || keyCode == Directions.RigthNormal) {
                this.keyPressedRight = true

            }
        })
        window.addEventListener("keyup", (event: KeyboardEvent) => {
            const keyCode: number = event.keyCode
            if (keyCode == Directions.LeftArrows || keyCode == Directions.LeftNormal) {
                this.keyPressedLeft = false
            }
            if (keyCode == Directions.RigthArrows || keyCode == Directions.RigthNormal) {
                this.keyPressedRight = false

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

    private drawGameBricks(tabOfColors: string[], special: Specialbrick | null): void {
        for (let i = 0; i < this.rowsCount; i++) {
            for (let j = 0; j < this.columnsCount; j++) {
                this.drawBrick(i, j, tabOfColors[i], special)
            }
        }
    }

    private drawGame(tabOfColors: string[], special: Specialbrick | null): void {
        this.drawPaddle()
        this.drawBall()
        special ? this.drawGameBricks(tabOfColors, special) : this.drawGameBricks(tabOfColors, null)
    }
    private clearCanvas(): void {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    }
    private handleKeyPress(): void {
        const paddle_x: number = this.gameState.paddle_positions.paddle_x
        if (this.keyPressedLeft && paddle_x > 0) {
            this.gameState.paddle_positions.paddle_x -= 15
        }
        if (this.keyPressedRight && paddle_x + PADDLE_WIDTH < window.innerWidth) {
            this.gameState.paddle_positions.paddle_x += 15
        }
    }
    public draw(tabOfColors: string[], isSpecialLevel: boolean, special: Specialbrick): void {
        this.handleKeyPress()
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.clearCanvas()
        isSpecialLevel ? this.drawGame(tabOfColors, special) : this.drawGame(tabOfColors, null)

    }
}
