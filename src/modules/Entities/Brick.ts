export class Brick {
    width: number
    height: number
    ctx: CanvasRenderingContext2D
    brickId: number
    constructor(width: number, height: number, ctx: CanvasRenderingContext2D){
        this.width = width
        this.height = height
        this.ctx = ctx
        this.brickId = Math.floor(Math.random()* 1000000)
    }
    drawBrick(heightOffset: number, widthOffset: number){
        let tab = ["blue", "red", "green"]
        const random = Math.floor(Math.random()*3)
        this.ctx.fillStyle = tab[random]
        this.ctx.fillRect(widthOffset * this.width, heightOffset * this.height, this.width -1, this.height - 1)
        this.ctx.strokeStyle = "white"
        this.ctx.strokeRect(widthOffset * this.width, heightOffset * this.height, this.width, this.height)
    }
    testBrick(){}
}