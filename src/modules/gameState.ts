import { Common } from "./Common";

export class GameState extends Common{
    level: number
    pointsToWin: number
    numberOfBricks: number
    constructor(level: number, pointsToWin: number, numberOfBricks: number){
        super("siema")
        this.level = level
        this.pointsToWin = pointsToWin
        this.numberOfBricks = numberOfBricks
    }
}