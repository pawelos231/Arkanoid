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
    DrawColor(special: boolean, color: string) {
        if (special) {
            this.ctx.fillStyle = "#FFD700"
        } else {
            this.ctx.fillStyle = color
        }
    }
    drawBrick(heightOffset: number, widthOffset: number, color: string) {
        this.initBrickState(widthOffset, heightOffset)
        this.DrawColor(this.brickState.special, color)
        this.ctx.fillRect(widthOffset * this.width, heightOffset * this.height, this.width - 1, this.height - 1)
        this.ctx.strokeStyle = "white"
        this.ctx.strokeRect(widthOffset * this.width, heightOffset * this.height, this.width, this.height)
        this.WriteBrickToConsole()
    }
    testBrick() { }
}