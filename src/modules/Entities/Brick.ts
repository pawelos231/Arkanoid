import { loader } from "../Loader"
import { BrickState } from "../../interfaces/gameStateInterface"
import { Specialbrick } from "../../interfaces/gameStateInterface"
export class Brick {
    private width: number
    private height: number
    private ctx: CanvasRenderingContext2D
    private brickState: BrickState
    public constructor(width: number, height: number, ctx: CanvasRenderingContext2D, special: Specialbrick | null, status: number, brick_x: number, brick_y: number) {
        this.width = width
        this.height = height
        this.ctx = ctx
        this.brickState = { brick_x, brick_y, status, special }
    }
    private initBrickState(brick_x: number, brick_y: number): void {

        this.brickState.brick_x = brick_x
        this.brickState.brick_y = brick_y
    }
    WriteBrickToConsole(): void {
        console.log(this.brickState)
    }
    public get brickStateGet() {
        return this.brickState
    }

    private setColor<T>(special: Specialbrick | null, color: string, x: number, y: number, image: T): void {
        if (special && special.randomBrick == (this.brickState.brick_x + 1) * (this.brickState.brick_y + 1)) {
            if (special.Position) {
                special.Position.brick_x = this.brickState.brick_x
                special.Position.brick_y = this.brickState.brick_y
            }
            this.ctx.drawImage(image as HTMLImageElement, x + 1, y + 1, this.width - 2, this.height - 2);
        }
        else {
            this.ctx.fillStyle = color
            this.ctx.fillRect(this.brickState.brick_x * this.width, this.brickState.brick_y * this.height, this.width - 1, this.height - 1)
        }
    }
    public async drawBrick<T>(heightOffset: number, widthOffset: number, color: string, image: T | null = null) {

        this.initBrickState(widthOffset, heightOffset)

        this.setColor<T | null>(this.brickState.special, color, widthOffset * this.width, heightOffset * this.height, image)

        this.ctx.strokeStyle = "white"

        this.ctx.strokeRect(widthOffset * this.width, heightOffset * this.height, this.width, this.height)

        //this.WriteBrickToConsole()
    }
    private testBrick() { }
}