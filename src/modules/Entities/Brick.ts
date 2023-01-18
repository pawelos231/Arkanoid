import { loader } from "../Loader"

interface brickState {
    x: number
    y: number
    status: number
    special: boolean
}
export class Brick {
    width: number
    height: number
    ctx: CanvasRenderingContext2D
    brickState: brickState
    constructor(width: number, height: number, ctx: CanvasRenderingContext2D, isSpecial: boolean) {
        this.width = width
        this.height = height
        this.ctx = ctx
        this.brickState = { x: 0, y: 0, status: 1, special: isSpecial }
    }
    initBrickState(x: number, y: number) {
        this.brickState.x = x
        this.brickState.y = y
    }
    WriteBrickToConsole() {
        console.log(this.brickState)
    }
    setColor(special: boolean, color: string, images: HTMLImageElement, x: number, y: number) {
        if (special) {
            images.onload = () =>{
                const pattern: CanvasPattern | null = this.ctx.createPattern(images, "repeat");
                if(!pattern) return
                this.ctx.fillStyle = pattern;
                this.ctx.drawImage(images, x,y, this.width - 2, this.height - 2);
            }    
        } else{
            this.ctx.fillStyle = color
        } 
    }
    drawBrick(heightOffset: number, widthOffset: number, color: string, images:HTMLImageElement ) {
        this.initBrickState(widthOffset, heightOffset)

        this.setColor(this.brickState.special, color, images, widthOffset * this.width, heightOffset * this.height)

        this.ctx.fillRect(widthOffset * this.width, heightOffset * this.height, this.width - 1, this.height - 1)

        this.ctx.strokeStyle = "white"

        this.ctx.strokeRect(widthOffset * this.width, heightOffset * this.height, this.width, this.height)

        this.WriteBrickToConsole()
    }
    testBrick() { }
}