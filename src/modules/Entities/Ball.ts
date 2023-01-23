import { Ball_Pos } from "../../interfaces/gameStateInterface"
export class Ball {
    private ballPosition: Ball_Pos
    private ctx: CanvasRenderingContext2D
    private radius: number
    public constructor(ctx: CanvasRenderingContext2D, radius: number) {
        this.ballPosition = { ball_x: 0, ball_y: 0 }
        this.ctx = ctx
        this.radius = radius
    }
    get radiusOfBallGetter(): number {
        return this.radius
    }
    public drawBall(positions: Ball_Pos = { ... this.initBallPos() }): void {

        this.ballPosition = positions
        this.ctx.arc(this.ballPosition.ball_x, this.ballPosition.ball_y, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
    }
    private initBallPos(): Ball_Pos {
        //to fix
        const ball_y: number = window.innerHeight - 100
        const ball_x: number = window.innerWidth / 2
        return { ball_y, ball_x }
    }
}