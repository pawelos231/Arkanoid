import { Common } from "./Common";
import { Brick } from './Entities/Brick'
import { Ball } from "./Entities/Ball";
import { Paddle } from "./Entities/Paddle";
import { LEFT_ARROW, LEFT_NORMAL, RIGHT_ARROW, RIGHT_NORMAL, PADDLE_WIDTH, PADDLE_HEIGHT, INIT_BALL_POS, INIT_PADDLE_POS } from "../constants/gameState";
import { GameState } from "./gameState";
import { Specialbrick } from "../interfaces/gameStateInterface";
import { media } from "./Media";
import { BrickPoints } from "../interfaces/gameStateInterface";
interface StatusOfEnd {
    end: boolean
    status: number //1 - win, 0 - loss
}

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
    bricksArray: Array<Brick>
    image: T
    constructor(level: number, pointsToWin: number, lives: number, image: T, rowsCount: number, columnsCount: number) {
        super(GAME_CANVAS)
        this.canvas = null as any
        this.ctx = null as any
        this.bricksArray = []
        this.image = image
        this.rowsCount = rowsCount
        this.columnsCount = columnsCount
        this.gameState = new GameState(level, pointsToWin, INIT_PADDLE_POS, lives, INIT_BALL_POS, 0, 0)
    }

    public addEventOnResize(): void {
        window.addEventListener("resize", () => {
            let values: number[] = [window.innerHeight, window.innerWidth]
            this.canvas.height = values[0]
            this.canvas.width = values[1]
            this.BRICK_HEIGHT = window.innerHeight / 18
            this.BRICK_WIDTH = window.innerWidth / 8
            for (let i = 0; i < this.bricksArray.length; i++) {
                this.bricksArray[i].widthSetter = this.BRICK_WIDTH
                this.bricksArray[i].heightSetter = this.BRICK_HEIGHT
            }
        })

    }


    public get getGameState() {
        return this.gameState
    }

    public configureCanvas(brickPoints: BrickPoints[], isSpecialLevel: boolean, special: Specialbrick | null): void {
        this.changeVisbilityOfGivenElement(this.elementId, true)
        this.canvas = this.elementId as HTMLCanvasElement;
        this.canvas.style.backgroundColor = "black"
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.BRICK_HEIGHT = window.innerHeight / 18
        this.BRICK_WIDTH = window.innerWidth / this.columnsCount
        isSpecialLevel ? this.initBricks(special, brickPoints) : this.initBricks(null, brickPoints)
    }

    drawBuffs() {

    }

    private isCollisonFromSide(i: number, ball_x: number, ball_y: number, RADIUS: number): boolean {
        const brick_pos_x: number = this.bricksArray[i].brickStateGet.brick_x * this.BRICK_WIDTH
        const brick_pos_y: number = this.bricksArray[i].brickStateGet.brick_y * this.BRICK_HEIGHT
        return ((brick_pos_x + this.BRICK_WIDTH <= ball_x - RADIUS && brick_pos_x + this.BRICK_WIDTH >= ball_x - RADIUS - 12) || (brick_pos_x <= ball_x + RADIUS && brick_pos_x >= ball_x + RADIUS + 10) && ball_y - RADIUS > brick_pos_y + this.BRICK_HEIGHT && brick_pos_y < brick_pos_y + RADIUS)
    }

    private isCollision(i: number, ball_x: number, ball_y: number, RADIUS: number): boolean {
        const brick_pos_x: number = this.bricksArray[i].brickStateGet.brick_x * this.BRICK_WIDTH
        const brick_pos_y: number = this.bricksArray[i].brickStateGet.brick_y * this.BRICK_HEIGHT

        return (brick_pos_y + this.BRICK_HEIGHT > ball_y - RADIUS && brick_pos_y < ball_y + RADIUS && brick_pos_x < ball_x + RADIUS + 12.5 && brick_pos_x + this.BRICK_WIDTH > ball_x - RADIUS - 12.5)
    }


    private CheckCollisionWithBricks(ball_x: number, ball_y: number, RADIUS: number) {
        for (let i = 0; i < this.bricksArray.length; i++) {
            if (this.bricksArray[i].brickStateGet.status == 0) continue

            if (this.isCollision(i, ball_x, ball_y, RADIUS)) {

                this.isCollisonFromSide(i, ball_x, ball_y, RADIUS) ? this.ballMoveRateX = -this.ballMoveRateX : null

                this.gameState.counter = this.gameState.counter += 1
                const temp: Specialbrick | null = this.bricksArray[i].brickStateGet.special

                if (temp && temp.Position) {
                    if (temp.Position.brick_x * this.BRICK_WIDTH < ball_x - RADIUS && ball_x + RADIUS < temp.Position.brick_x * this.BRICK_WIDTH + this.BRICK_WIDTH && temp.Position.brick_y * this.BRICK_HEIGHT + this.BRICK_HEIGHT > ball_y - RADIUS) {
                        console.log("trafiony special")
                    }
                }

                this.ballMoveRateY = -this.ballMoveRateY
                this.bricksArray[i].setStatus = 0
                media.spawnSoundWhenHitBrick()
                break;
            }

        }
    }

    private CheckCollisionWithPaddle(ball_y: number, ball_x: number, RADIUS: number, paddle_x: number, paddle_y: number) {
        if (ball_y >= paddle_y - PADDLE_HEIGHT && ball_x - RADIUS <= paddle_x + PADDLE_WIDTH && ball_x + RADIUS >= paddle_x) {
            media.spawnSoundWhenHitPaddle()
            this.ballMoveRateY = -this.ballMoveRateY
        }
    }

    private drawBall(): StatusOfEnd {
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
            this.gameState.lives = this.gameState.lives - 1
            if (this.gameState.lives == 0) {
                return { end: false, status: 0 }
            }

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

        //winning condtion
        if (this.gameState.counter == 3) {
            return { end: false, status: 1 }
        }

        this.CheckCollisionWithPaddle(ball_y, ball_x, RADIUS, paddle_x, paddle_y)
        this.CheckCollisionWithBricks(ball_x, ball_y, RADIUS)

        ball.drawBall({ ball_x: this.gameState.ball_positions.ball_x += this.ballMoveRateX, ball_y: this.gameState.ball_positions.ball_y += this.ballMoveRateY })
        return { end: true, status: 0 }
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

    private addBricksToArray(brick_x: number, brick_y: number, special: Specialbrick | null, color: BrickPoints): void {
        const brick: Brick = new Brick(this.BRICK_WIDTH, this.BRICK_HEIGHT, this.ctx, special, 1, brick_x, brick_y, color)
        this.bricksArray.push(brick)
    }

    private initBricks(special: Specialbrick | null, tabOfColor: BrickPoints[]): void {
        for (let i = 0; i < this.rowsCount; i++) {
            for (let j = 0; j < this.columnsCount; j++) {
                this.addBricksToArray(j, i, special, tabOfColor[i])
            }
        }
    }

    private drawBricks() {
        for (let i = 0; i < this.bricksArray.length; i++) {
            this.bricksArray[i].drawBrick(this.image, i)
        }
    }

    private drawGame(): StatusOfEnd {
        this.drawPaddle()
        this.drawBricks()
        return this.drawBall()
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

    public draw(): StatusOfEnd {
        this.handleKeyPress()
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.clearCanvas()
        return this.drawGame()

    }
}
