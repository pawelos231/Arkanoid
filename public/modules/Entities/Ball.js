import { LIGHT_BLUE } from "../../constants/colors";
export class Ball {
    constructor(ctx, radius) {
        this.ballPosition = { ball_x: 0, ball_y: 0 };
        this.ctx = ctx;
        this.radius = radius;
        this.angle = Math.cos(1);
        this.speed = 12;
    }
    set setRadius(radius) {
        this.radius = radius;
    }
    get radiusOfBallGetter() {
        return this.radius;
    }
    get BallPositionGetter() {
        return this.ballPosition;
    }
    set SetAngle(angle) {
        this.angle = angle;
    }
    get GetAngle() {
        return this.angle;
    }
    reflectOffPaddle(paddleX, paddleWidth, gameState, paddleSpeed) {
        const ballCenterX = this.ballPosition.ball_x;
        const paddleCenterX = paddleX + paddleWidth / 2;
        const distanceX = ballCenterX - paddleCenterX;
        const normalizedDistance = distanceX / (paddleWidth / 2);
        const reflectionAngle = normalizedDistance * (Math.PI / 3);
        gameState.BallMoveRateSetX =
            gameState.BallMoveRateGetX * Math.tan(reflectionAngle);
        gameState.BallMoveRateSetY = gameState.BallMoveRateGetY;
        if (paddleSpeed !== 0) {
            const paddleDirection = paddleSpeed > 0 ? 1 : -1;
            gameState.BallMoveRateSetX =
                paddleDirection * Math.abs(paddleSpeed * 0.65);
        }
    }
    initBallPos() {
        //to fix
        const ball_y = window.innerHeight - 100;
        const ball_x = window.innerWidth / 2;
        return { ball_y, ball_x };
    }
    drawBall(positions = Object.assign({}, this.initBallPos())) {
        this.ballPosition = positions;
        this.ctx.beginPath();
        this.ctx.arc(this.ballPosition.ball_x, this.ballPosition.ball_y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = LIGHT_BLUE;
        this.ctx.fill();
        //this.renderFireParticlesAroundBall();
    }
    drawFireParticlesAroundBall() {
        const numParticles = 10;
        const particleRadius = 2;
        for (let i = 0; i < numParticles; i++) {
            const angle = (Math.PI * 2 * i) / numParticles;
            const particleX = this.ballPosition.ball_x + Math.cos(angle) * this.radius;
            const particleY = this.ballPosition.ball_y + Math.sin(angle) * this.radius;
            this.ctx.beginPath();
            this.ctx.arc(particleX, particleY, particleRadius, 0, Math.PI * 2, false);
            const fillColor = `hsl(${Math.random() * 60 + 10}, 100%, 50%)`;
            this.ctx.fillStyle = fillColor;
            this.ctx.fill();
        }
    }
}
