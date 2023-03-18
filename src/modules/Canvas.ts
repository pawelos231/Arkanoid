import { Common } from "./Common";
import { Brick } from './Entities/Brick'
import { Ball } from "./Entities/Ball";
import { Paddle } from "./Entities/Paddle";
import {  PADDLE_WIDTH, PADDLE_HEIGHT, INIT_BALL_POS, INIT_PADDLE_POS } from "../constants/gameState";
import { GameOverStatus } from "../interfaces/gameStateInterface";
import { Directions } from "../interfaces/HelperEnums";
import { GameState } from "./gameState";
import { media } from "./Media";
import { BrickPoints } from "../interfaces/gameStateInterface";
import { SpecialBrick } from "./SpecialBrickView";


const GAME_CANVAS = "game_canvas"

export class Canvas<T> extends Common {

    private BRICK_HEIGHT: number = 0
    private BRICK_WIDTH: number = 0
    private ballMoveRateX: number = -12
    private ballMoveRateY: number = -12
    private rowsCount: number
    private columnsCount: number
    private hitCounter: number
    private playerPoints: number
    private keyPressedLeft: boolean = false
    private keyPressedRight: boolean = false
    private pointsToWin: number
    private ctx: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;
    private gameState: GameState
    private bricksArray: Array<Brick>
    private image: T

    constructor(level: number, pointsToWin: number, lives: number, image: T, rowsCount: number, columnsCount: number) {
        super(GAME_CANVAS)
        this.canvas = null as any
        this.ctx = null as any
        this.bricksArray = []
        this.image = image
        this.rowsCount = rowsCount
        this.columnsCount = columnsCount
        this.playerPoints = 0
        this.hitCounter = 0
        this.pointsToWin = pointsToWin
        this.gameState = new GameState(level, lives, this.pointsToWin,  this.hitCounter, this.playerPoints, INIT_PADDLE_POS, INIT_BALL_POS, this.ballMoveRateX, this.ballMoveRateY)
    }

    public get getGameState() {
        return this.gameState
    }

    public configureCanvas(brickPoints: BrickPoints[], isSpecialLevel: boolean, randomBrickIndex: number = 0): void {

        this.changeVisbilityOfGivenElement(this.elementId, true)
        this.canvas = this.elementId as HTMLCanvasElement;
        this.canvas.style.backgroundColor = "black"
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.BRICK_HEIGHT = window.innerHeight / 18
        this.BRICK_WIDTH = window.innerWidth / this.columnsCount
        isSpecialLevel ? this.initBricks(randomBrickIndex, brickPoints) : this.initBricks(-100, brickPoints)

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

    private upadateScore(index: number){
        this.gameState.playerPointsSet = this.bricksArray[index].brickPointsGet.points + this.getGameState.playerPointsGet
    }

    private isCollisonFromSide(i: number, ball_x: number, ball_y: number, RADIUS: number): boolean {
        const brick_pos_x: number = this.bricksArray[i].brickStateGet.brick_x * this.BRICK_WIDTH
        const brick_pos_y: number = this.bricksArray[i].brickStateGet.brick_y * this.BRICK_HEIGHT
        return ((brick_pos_x + this.BRICK_WIDTH <= ball_x - RADIUS && brick_pos_x + this.BRICK_WIDTH >= ball_x - RADIUS - 12) || (brick_pos_x <= ball_x + RADIUS && brick_pos_x >= ball_x + RADIUS + 10) && ball_y - RADIUS > brick_pos_y + this.BRICK_HEIGHT && brick_pos_y < brick_pos_y + RADIUS)
    }


    private isCollision(i: number, ball_x: number, ball_y: number, RADIUS: number): boolean {
        const BRICK = this.bricksArray[i]
        const brick_pos_x: number = BRICK.brickStateGet.brick_x * this.BRICK_WIDTH
        const brick_pos_y: number = BRICK.brickStateGet.brick_y * this.BRICK_HEIGHT

        return (brick_pos_y + this.BRICK_HEIGHT > ball_y - RADIUS && brick_pos_y < ball_y + RADIUS && brick_pos_x < ball_x + RADIUS + 12.5 && brick_pos_x + this.BRICK_WIDTH > ball_x - RADIUS - 12.5) 
           
    }



    private CheckCollisionWithBricks(ball_x: number, ball_y: number, RADIUS: number) {
        for (let i = 0; i < this.bricksArray.length; i++) {

            const BRICK: Brick = this.bricksArray[i]
            
            if (BRICK.brickStateGet.status == 0) continue

            if (this.isCollision(i, ball_x, ball_y, RADIUS)) {

                this.upadateScore(i)
              
                this.isCollisonFromSide(i, ball_x, ball_y, RADIUS) ? this.gameState.BallMoveRateSetX = -this.getGameState.BallMoveRateGetX : null

                const IsSpecialBrick: boolean = this.bricksArray[i].brickStateGet.specialBrick
                const status: number = this.bricksArray[i].getStatus

                if (IsSpecialBrick && status == 1) {
                    const specialBrick: SpecialBrick = new SpecialBrick(this.image as HTMLImageElement, "http://localhost:1234/cotomabyc.mp3")
                    specialBrick.displayViewOfSpecialBrick()     
                }


                this.gameState.BallMoveRateSetY = -this.gameState.BallMoveRateGetY

                let timesToHit: number = this.bricksArray[i].brickPointsGet.timesToHit
                timesToHit--

                this.bricksArray[i].timesToHitSet = timesToHit

                if(timesToHit <= 0){
                    this.bricksArray[i].setStatus = 0
                }

                media.spawnSoundWhenHitBrick()
                break;
            }

        }
    }

    private CheckCollisionWithPaddle(ball_y: number, ball_x: number, RADIUS: number, paddle_x: number, paddle_y: number) {
        if (ball_y >= paddle_y - PADDLE_HEIGHT && ball_x - RADIUS <= paddle_x + PADDLE_WIDTH && ball_x + RADIUS >= paddle_x) {
            media.spawnSoundWhenHitPaddle()
            this.gameState.BallMoveRateSetY = -this.gameState.BallMoveRateGetY
        }
    }

    private drawBuffs(): void {

    }

    private drawBall(): GameOverStatus {
        //change to fix resizeable
        const ball: Ball = new Ball(this.ctx, 25)
        const RADIUS: number = ball.radiusOfBallGetter

        if (this.gameState.ball_positions.ball_x - RADIUS < 0) {
            this.gameState.BallMoveRateSetX = 12
        }
        if (this.gameState.ball_positions.ball_y - RADIUS < 0) {
            this.gameState.BallMoveRateSetY = 12
        }
        if (this.gameState.ball_positions.ball_x + RADIUS > window.innerWidth) {
            this.gameState.BallMoveRateSetX = -12
        }
        if (this.gameState.ball_positions.ball_y + RADIUS > window.innerHeight) {
            this.gameState.lives = this.gameState.lives - 1
            if (this.gameState.lives == 0) {
                return { end: false, status: 0, level: this.gameState.getLevel, points: this.gameState.playerPointsGet }
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
        if (!(this.bricksArray.find((item: Brick) => item.getStatus == 1 ))) {
            return { end: false, status: 1, level: this.gameState.getLevel, points: this.gameState.playerPointsGet }
        }

        this.CheckCollisionWithPaddle(ball_y, ball_x, RADIUS, paddle_x, paddle_y)
        this.CheckCollisionWithBricks(ball_x, ball_y, RADIUS)

        ball.drawBall({ ball_x: this.gameState.ball_positions.ball_x += this.gameState.BallMoveRateGetX, ball_y: this.gameState.ball_positions.ball_y += this.gameState.BallMoveRateGetY })
        
        return { end: true, status: 0, level: this.gameState.getLevel, points: this.gameState.playerPointsGet }
    }


    private drawPaddle(): void {
        const paddle: Paddle = new Paddle(PADDLE_WIDTH, PADDLE_HEIGHT, this.ctx)
        paddle.drawPaddle(this.gameState.paddle_positions)
    }

    private addBricksToArray(brick_x: number, brick_y: number, specialBrick: boolean, brickData: BrickPoints): void {
        const brick: Brick = new Brick(this.BRICK_WIDTH, this.BRICK_HEIGHT, this.ctx, specialBrick, 1, brick_x, brick_y, brickData)
        this.bricksArray.push(brick)
    }

    private initBricks(SpecialBrickIndex: number = -100, BrickPoints: BrickPoints[]): void {
        let count: number = 0
        for (let i = 0; i < this.rowsCount; i++) {
            for (let j = 0; j < this.columnsCount; j++) {
                count++
                if (SpecialBrickIndex === count){
                    this.addBricksToArray(j, i, true, BrickPoints[i])
                } else {
                    this.addBricksToArray(j, i, false, BrickPoints[i])
                }
            }
        }

    }

    private drawBricks() {
        for (let i = 0; i < this.bricksArray.length; i++) {
            this.bricksArray[i].drawBrick(this.image)
        }
    }

    private drawGame(): GameOverStatus {
        this.drawPaddle()
        this.drawBricks()
        return this.drawBall()
    }

    private clearCanvas(): void {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    }

    private handleKeyPress(): void {

        const paddle_x: number = this.gameState.paddle_positions.paddle_x

        if (this.keyPressedLeft && paddle_x > 0) 
        {
            this.gameState.paddle_positions.paddle_x -= 15
        }
        if (this.keyPressedRight && paddle_x + PADDLE_WIDTH < window.innerWidth) 
        {
            this.gameState.paddle_positions.paddle_x += 15
        }
    }


    private setInitCanvasSize(): void{
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
    }


    public draw(): GameOverStatus {

        this.handleKeyPress()
        this.setInitCanvasSize()
        this.clearCanvas()

        return this.drawGame()

    }
}
