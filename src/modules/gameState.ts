import { Paddle_Pos, Ball_Pos } from "../interfaces/gameStateInterface"
export class GameState {
    level: number
    pointsToWin: number
    paddle_positions: Paddle_Pos
    lives: number
    ball_positions: Ball_Pos
    counter: number
    ballMoveRateX: number
    ballMoveRateY: number
    private playerPoints: number
   
    
    public constructor(level: number, lives: number, pointsToWin: number, counter: number,playerPoints: number, paddle_positions: Paddle_Pos,ball_positions: Ball_Pos,  ballMoveRateX: number, ballMoveRateY: number) {
        this.level = level
        this.pointsToWin = pointsToWin
        this.paddle_positions = paddle_positions
        this.lives = lives
        this.counter = counter
        this.ball_positions = ball_positions
        this.playerPoints = playerPoints
        this.ballMoveRateX = ballMoveRateX
        this.ballMoveRateY = ballMoveRateY
    }

    set BallMoveRateSet(rate: number) {
        this.ballMoveRateX = rate
        this.ballMoveRateY = rate
    }

    set BallMoveRateSetY(rate: number) {
        this.ballMoveRateY = rate
    }

    set BallMoveRateSetX(rate: number) {
        this.ballMoveRateX = rate
    }

    get BallMoveRateGetX(): number {
        return this.ballMoveRateX
    }

    get BallMoveRateGetY(): number {
        return this.ballMoveRateY
    }
    
    set playerPointsSet(points: number){
        this.playerPoints = points
    }

    get playerPointsGet(): number{
        return this.playerPoints
    }

    get getLevel(): number {
        return this.level
    }

    get gamePointsToWin(): number {
        return this.pointsToWin
    }

    get livesGetter(): number {
        return this.lives
    }

    get ball_positions_getter(): Ball_Pos {
        return this.ball_positions
    }

    get paddle_positions_getter(): Paddle_Pos {
        return this.paddle_positions
    }

}