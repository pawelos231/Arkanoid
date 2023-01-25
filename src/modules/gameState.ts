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
    get GameState() {
        return this
    }
}