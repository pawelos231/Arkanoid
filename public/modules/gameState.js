import { Common } from "./Common";
export class GameState extends Common {
    constructor(level, pointsToWin, numberOfBricks) {
        super("siema");
        this.level = level;
        this.pointsToWin = pointsToWin;
        this.numberOfBricks = numberOfBricks;
    }
}
