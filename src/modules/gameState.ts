import { Common } from "./Common";

class GameState extends Common{
    level: any
    pointsToWin: any
    constructor(level: any, pointsToWin: any){
        super("siema")
        this.level = level
        this.pointsToWin = pointsToWin
    }
}