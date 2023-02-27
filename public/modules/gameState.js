export class GameState {
    constructor(level, pointsToWin, paddle_positions, lives, ball_positions, counter, playerPoints) {
        this.level = level;
        this.pointsToWin = pointsToWin;
        this.paddle_positions = paddle_positions;
        this.lives = lives;
        this.counter = counter;
        this.ball_positions = ball_positions;
        this.playerPoints = playerPoints;
    }
    set playerPointsSet(points) {
        this.playerPoints = points;
    }
    get playerPointsGet() {
        return this.playerPoints;
    }
    get getLevel() {
        return this.level;
    }
    get gamePointsToWin() {
        return this.pointsToWin;
    }
    get livesGetter() {
        return this.lives;
    }
    get ball_positions_getter() {
        return this.ball_positions;
    }
    get paddle_positions_getter() {
        return this.paddle_positions;
    }
}
