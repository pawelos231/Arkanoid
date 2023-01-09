export class GameState {
    constructor(level, pointsToWin, numberOfBricks) {
        this.level = level;
        this.pointsToWin = pointsToWin;
        this.numberOfBricks = numberOfBricks;
    }
    displayGameState() {
        let Direction;
        (function (Direction) {
            Direction[Direction["Up"] = 1] = "Up";
            Direction[Direction["Down"] = 2] = "Down";
            Direction[Direction["Left"] = 3] = "Left";
            Direction[Direction["Right"] = 4] = "Right";
        })(Direction || (Direction = {}));
    }
}
