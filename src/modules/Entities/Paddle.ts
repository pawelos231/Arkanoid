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
    calculatePositionOfPaddle(): void {
        //to fix
        const heightOffset: number = window.innerHeight - 70
        const widthOffset: number = window.innerWidth / 2 - 100
        this.positions = { heightOffset, widthOffset }
    }
    drawPaddle(): void {
        this.ctx.fillStyle = "white"
        this.calculatePositionOfPaddle()

        this.ctx.fillRect(this.positions.widthOffset, this.positions.heightOffset, this.width - 1, this.height - 1)

    }
    clearPaddle(heightOffset: number): void {
        this.ctx.clearRect(this.positions.widthOffset, heightOffset, this.width + 1, this.height + 1)
    }
    updatePaddlePostion(keyCode: number): void {
        const { heightOffset } = this.positions
        this.ctx.fillStyle = "white"
        this.ctx.strokeStyle = "red"
        if (keyCode == Direction.LeftArrows || keyCode == Direction.LeftNormal) {
            this.clearPaddle(heightOffset)
            this.ctx.fillRect(this.positions.widthOffset -= 20, heightOffset, this.width - 1, this.height - 1)
        }
        if (keyCode == Direction.RigthArrows || keyCode == Direction.RigthNormal) {
            this.clearPaddle(heightOffset)
            this.ctx.fillRect(this.positions.widthOffset += 20, heightOffset, this.width - 1, this.height - 1)
        }
    }
}
