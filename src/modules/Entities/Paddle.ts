export class Paddle{
    height: number
    width: number
    ctx: CanvasRenderingContext2D
    constructor(width: number, height: number, ctx: CanvasRenderingContext2D){
        this.width = width
        this.height = height
        this.ctx = ctx
    }
    calculatePositionOfPaddle(){
        //to fix
        const heightOffset: number = window.innerHeight - 70
        const widthOffset: number = window.innerWidth / 2 - 100 
        return {heightOffset, widthOffset}
    }
    drawPaddle(): void{
        console.log("chuj")
        this.ctx.fillStyle = "white"
        const positions = this.calculatePositionOfPaddle()
        console.log(positions)
        this.ctx.fillRect(positions.widthOffset, positions.heightOffset, this.width - 1, this.height - 1)
        this.ctx.strokeStyle = "red"
        this.ctx.strokeRect(positions.widthOffset, positions.heightOffset, this.width, this.height) 
    }
}
