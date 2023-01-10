export class Brick {
    width: number
    height: number
    ctx: CanvasRenderingContext2D
    constructor(width: number, height: number, ctx: CanvasRenderingContext2D){
        this.width = width
        this.height = height
        this.ctx = ctx
    }
    drawBrick(heightOffset: number, widthOffset: number){
        let tab = ["blue", "red", "green"]
        const random = Math.floor(Math.random()*3)
        this.ctx.fillStyle = tab[random]
        this.ctx.fillRect(widthOffset * this.width, heightOffset * this.height, this.width, this.height)
    }
}