export class Paddle {
    constructor(width, height, ctx) {
        this.width = width;
        this.height = height;
        this.ctx = ctx;
    }
    calculatePositionOfPaddle() {
        //to fix
        const heightOffset = window.innerHeight - 70;
        const widthOffset = window.innerWidth / 2 - 100;
        return { heightOffset, widthOffset };
    }
    drawPaddle() {
        console.log("chuj");
        this.ctx.fillStyle = "white";
        const positions = this.calculatePositionOfPaddle();
        console.log(positions);
        this.ctx.fillRect(positions.widthOffset, positions.heightOffset, this.width - 1, this.height - 1);
        this.ctx.strokeStyle = "red";
        this.ctx.strokeRect(positions.widthOffset, positions.heightOffset, this.width, this.height);
    }
}
