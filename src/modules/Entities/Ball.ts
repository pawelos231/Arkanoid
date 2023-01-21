import { BallPosition } from "../../interfaces/gameStateInterface"
export class Ball {
    position: BallPosition
    private ctx: CanvasRenderingContext2D
    public constructor(ctx: CanvasRenderingContext2D) {
        this.position = { x: 0, y: 0 }
        this.ctx = ctx
    }
    updatePostion() {

    }
    DetectCollision() {

    }
    drawBall() {
        this.calculatePositionOfPaddle()
        this.ctx.arc(this.position.x, this.position.y, 25, 0, Math.PI * 2);
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
    }
    calculatePositionOfPaddle(): void {
        //to fix
        const heightOffset: number = window.innerHeight - 100
        const widthOffset: number = window.innerWidth / 2
        this.position = { y: heightOffset, x: widthOffset }
    }
}