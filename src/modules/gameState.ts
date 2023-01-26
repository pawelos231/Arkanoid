import { Paddle_Pos, Ball_Pos } from "../interfaces/gameStateInterface"
export class GameState {
    level: number
    pointsToWin: number
    paddle_positions: Paddle_Pos
    lives: number
    ball_positions: Ball_Pos
    public constructor(level: number, pointsToWin: number, paddle_positions: Paddle_Pos, lives: number, ball_positions: Ball_Pos) {
        this.level = level
        this.pointsToWin = pointsToWin
        this.paddle_positions = paddle_positions
        this.lives = lives
        this.ball_positions = ball_positions
    }
    get GameLevel(): number {
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