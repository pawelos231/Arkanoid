import { loader } from "../Loader"
import { BrickState, BrickPoints, Specialbrick } from "../../interfaces/gameStateInterface"
export class Brick {
    private width: number
    private height: number
    private ctx: CanvasRenderingContext2D
    private brickState: BrickState
    private brickPoints: BrickPoints
    public constructor(width: number, height: number, ctx: CanvasRenderingContext2D, special: Specialbrick | null, status: number, brick_x: number, brick_y: number, color: BrickPoints) {
        this.width = width
        this.height = height
        this.ctx = ctx
        this.brickState = { brick_x, brick_y, status, special }
        this.brickPoints = color
    }
    WriteBrickToConsole(): void {
        console.log(this.brickState)
    }
    public get brickStateGet() {
        return this.brickState
    }
    public set setStatus(value: number) {
        this.brickState.status = value
    }
    private setColor<T>(special: Specialbrick | null, x: number, y: number, image: T, counter: number): void {
        if (special && special.randomBrick == counter) {
            if (special.Position) {
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
    public set widthSetter(width: number) {
        this.width = width
    }
    public set heightSetter(height: number) {
        this.height = height
    }
    public async drawBrick<T>(image: T | null = null, counter: number) {

        if (this.brickState.status == 0) return
        this.setColor<T | null>(this.brickState.special, this.brickState.brick_x * this.width, this.brickState.brick_y * this.height, image, counter)

        this.ctx.strokeStyle = "white"

        this.ctx.strokeRect(this.brickState.brick_x * this.width, this.brickState.brick_y * this.height, this.width, this.height)

        //this.WriteBrickToConsole()
    }
    private testBrick() { }
}