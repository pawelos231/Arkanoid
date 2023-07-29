const DEFAULT_MAX_SPEED_PADDLE = 15;
export class GameState {
    constructor(level, lives, pointsToWin, playerPoints, paddle_positions, ball_positions, ballMoveRateX, ballMoveRateY, ballSpeed, paddleMoveRateX, maxPaddleSpeed = DEFAULT_MAX_SPEED_PADDLE) {
        this.level = level;
        this.pointsToWin = pointsToWin;
        this.paddle_positions = paddle_positions;
        this.lives = lives;
        this.ball_positions = ball_positions;
        this.playerPoints = playerPoints;
        this.ballMoveRateX = ballMoveRateX;
        this.ballMoveRateY = ballMoveRateY;
        this.ballSpeed = ballSpeed;
        this.maxPaddleSpeed = maxPaddleSpeed;
        this.paddleMoveRateX = paddleMoveRateX;
    }
    set BallMoveRateSet(rate) {
        this.ballMoveRateX = rate;
        this.ballMoveRateY = rate;
    }
    get BallMoveRateGet() {
        return {
            rate_x: this.ballMoveRateX,
            rate_y: this.ballMoveRateY,
        };
    }
    set BallMoveRateSetY(rate) {
        this.ballMoveRateY = rate;
    }
    set BallMoveRateSetX(rate) {
        this.ballMoveRateX = rate;
    }
    set SetMaxPaddleSpeed(maxSpeed) {
        this.maxPaddleSpeed = maxSpeed;
    }
    get GetMaxPaddleSpeed() {
        return this.maxPaddleSpeed;
    }
    set SetBallSpeed(speed) {
        this.ballSpeed = speed;
    }
    get GetBallSpeed() {
        return this.ballSpeed;
    }
    get BallMoveRateGetX() {
        return this.ballMoveRateX;
    }
    get BallMoveRateGetY() {
        return this.ballMoveRateY;
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
    get getLives() {
        return this.lives;
    }
    set setLives(lives) {
        this.lives = lives;
    }
    get ball_positions_getter() {
        return this.ball_positions;
    }
    get paddle_positions_getter() {
        return this.paddle_positions;
    }
    get get_paddle_move_rate_X() {
        return this.paddleMoveRateX;
    }
    set set_paddle_move_rate_X(paddleMoveRate) {
        this.paddleMoveRateX = paddleMoveRate;
    }
}
