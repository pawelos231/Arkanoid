interface Positions {
    heightOffset: number,
    widthOffset: number
}
enum Direction {
    LeftArrows = 65,
    LeftNormal = 37,
    RigthArrows = 68,
    RigthNormal = 39,
}

export class Paddle {
    height: number
    width: number
    ctx: CanvasRenderingContext2D
    positions: Positions
    constructor(width: number, height: number, ctx: CanvasRenderingContext2D) {
        this.width = width
        this.height = height
        this.ctx = ctx
        this.positions = { heightOffset: 0, widthOffset: 0 }
    }
    drawPaddle(positions: Positions = {widthOffset: window.innerWidth/2 - 100, heightOffset: window.innerHeight - 70}): void {
        this.positions = positions
        this.ctx.fillStyle = "white"

        this.ctx.fillRect(positions.widthOffset, positions.heightOffset, this.width - 1, this.height - 1)

    }
    clearPaddle(heightOffset: number): void {
        this.ctx.clearRect(this.positions.widthOffset, heightOffset, this.width + 1, this.height + 1)
    }
}
