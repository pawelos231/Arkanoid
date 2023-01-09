
export class GameState{
    level: number
    pointsToWin: number
    numberOfBricks: number
    constructor(level: number, pointsToWin: number, numberOfBricks: number){
        this.level = level
        this.pointsToWin = pointsToWin
        this.numberOfBricks = numberOfBricks
    }
    displayGameState(){
        enum Direction {
            Up = 1,
            Down,
            Left, 
            Right
        }
    }
}