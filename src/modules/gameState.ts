import { Positions } from "../interfaces/gameStateInterface"
export class GameState {
    level: number
    pointsToWin: number
    paddle_positions: Positions
    public constructor(level: number, pointsToWin: number, paddle_positions: Positions) {
        this.level = level
        this.pointsToWin = pointsToWin
        this.paddle_positions = paddle_positions
    }
    displayGameState() {
       
    }
}