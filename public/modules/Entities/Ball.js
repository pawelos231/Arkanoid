export class Ball {
    constructor(ctx, radius) {
        this.ballPosition = { ball_x: 0, ball_y: 0 };
        this.ctx = ctx;
        this.radius = radius;
    }
    get radiusOfBallGetter() {
        return this.radius;
    }
    drawBall(positions = Object.assign({}, this.initBallPos())) {
        this.ballPosition = positions;
        this.ctx.arc(this.ballPosition.ball_x, this.ballPosition.ball_y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
    }
    initBallPos() {
        //to fix
        const ball_y = window.innerHeight - 100;
        const ball_x = window.innerWidth / 2;
        return { ball_y, ball_x };
    }
}
