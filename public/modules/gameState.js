import { Common } from "./Common";
class GameState extends Common {
    constructor(level, pointsToWin) {
        super("siema");
        this.level = level;
        this.pointsToWin = pointsToWin;
    }
}
