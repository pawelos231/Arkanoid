export class Ball {
    constructor(ctx) {
        this.position = { x: 0, y: 0 };
        this.ctx = ctx;
    }
    updatePostion() {
    }
    DetectCollision() {
    }
    drawBall() {
        this.calculatePositionOfPaddle();
        this.ctx.arc(this.position.x, this.position.y, 25, 0, Math.PI * 2);
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
        console.log("siema");
    }
    calculatePositionOfPaddle() {
        //to fix
        const heightOffset = window.innerHeight - 100;
        const widthOffset = window.innerWidth / 2;
        this.position = { y: heightOffset, x: widthOffset };
    }
}
