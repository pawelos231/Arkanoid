import { loader } from "../Loader"
import { BrickState, BrickPoints, Specialbrick } from "../../interfaces/gameStateInterface"
export class Brick {
    private width: number
    private height: number
    private ctx: CanvasRenderingContext2D
    private brickState: BrickState
    private brickPoints: BrickPoints
    public constructor(width: number, height: number, ctx: CanvasRenderingContext2D, special: Specialbrick | null, status: number, brick_x: number, brick_y: number, brickPoints: BrickPoints) {
        this.width = width
        this.height = height
        this.ctx = ctx
        this.brickState = { brick_x, brick_y, status, special }
        this.brickPoints = {...brickPoints}
    }


    public set heightSetter(height: number) {
        this.height = height
    }

    public set widthSetter(width: number) {
        this.width = width
    }

    public get brickStateGet(): BrickState {
        return this.brickState
    }

    public get brickPointsGet(): BrickPoints{
        return this.brickPoints
    }
    public get getStatus(){
        return this.brickState.status
    }

    public set setStatus(value: number) {
        this.brickState.status = value
    }

    public set timesToHitSet(times: number){
        this.brickPoints.timesToHit = times
    }
   
    private setColor<T>(special: Specialbrick | null, x: number, y: number, image: T, counter: number): void {
        if (special && special.randomBrick == counter) {
            if (special.Position) {
                this.brickPoints.points = 100
                this.brickPoints.timesToHit = 1
                special.Position.brick_x = this.brickState.brick_x
                special.Position.brick_y = this.brickState.brick_y
            }
            this.ctx.drawImage(image as HTMLImageElement, x, y, this.width - 2, this.height - 2);
        }
        else {
            this.ctx.fillStyle = this.brickPoints.color
            this.ctx.fillRect(this.brickState.brick_x * this.width, this.brickState.brick_y * this.height, this.width - 1, this.height - 1)
        }
    }


    public async drawBrick<T>(image: T | null = null, counter: number): Promise<void> {

        if (this.brickState.status == 0) return

        this.setColor<T | null>(this.brickState.special, this.brickState.brick_x * this.width, this.brickState.brick_y * this.height, image, counter)

        this.ctx.strokeStyle = "white"

        this.ctx.strokeRect(this.brickState.brick_x * this.width, this.brickState.brick_y * this.height, this.width, this.height)

    }
}