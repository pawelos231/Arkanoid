import { loader } from "../Loader"
import { brickState } from "../../interfaces/gameStateInterface"
import { Specialbrick } from "../../interfaces/gameStateInterface"
export class Brick {
    private width: number
    private height: number
    private ctx: CanvasRenderingContext2D
    private brickState: brickState
    public constructor(width: number, height: number, ctx: CanvasRenderingContext2D, special: Specialbrick, status: number, x: number, y: number) {
        this.width = width
        this.height = height
        this.ctx = ctx
        this.brickState = { x, y, status, special }
    }
    private initBrickState(x: number, y: number): void {
        this.brickState.x = x
        this.brickState.y = y
    }
    WriteBrickToConsole(): void {
        console.log(this.brickState)
    }

    public get brickStateGet() {
        return this.brickState
    }

    private async setColor(special: Specialbrick, color: string, x: number, y: number): Promise<void> {
        if (special.isSpecial && special.randomBrick == this.brickState.x * this.brickState.y) {
            let image: HTMLImageElement = new Image();
            await loader.loadImage("https://cdn2.thecatapi.com/images/4vg.jpg").then((data: HTMLImageElement) => image = data)
            this.ctx.clearRect(x + 1, y + 1, this.width - 2, this.height - 2)
            image.onload = () => {
                const pattern: CanvasPattern | null = this.ctx.createPattern(image, "repeat");
                if (!pattern) return
                this.ctx.fillStyle = pattern;
                this.ctx.drawImage(image, x + 1, y + 1, this.width - 2, this.height - 2);
            }
        }
        else {
            this.ctx.fillStyle = color
            this.ctx.fillRect(this.brickState.x * this.width, this.brickState.y * this.height, this.width - 1, this.height - 1)
        }
    }
    public async drawBrick(heightOffset: number, widthOffset: number, color: string) {
        this.initBrickState(widthOffset, heightOffset)

        await this.setColor(this.brickState.special, color, widthOffset * this.width, heightOffset * this.height)

        this.ctx.strokeStyle = "white"

        this.ctx.strokeRect(widthOffset * this.width, heightOffset * this.height, this.width, this.height)

        //this.WriteBrickToConsole()
    }
    private testBrick() { }
}