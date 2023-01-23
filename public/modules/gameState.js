export class GameState {
    constructor(level, pointsToWin, paddle_positions, lives, ball_positions) {
        this.level = level;
        this.pointsToWin = pointsToWin;
        this.paddle_positions = paddle_positions;
        this.lives = lives;
        this.ball_positions = ball_positions;
    }
    displayGameState() {
    }
}
