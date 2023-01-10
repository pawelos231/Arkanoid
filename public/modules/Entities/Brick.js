export class Brick {
    constructor(width, height, ctx) {
        this.width = width;
        this.height = height;
        this.ctx = ctx;
    }
    drawBrick(heightOffset, widthOffset) {
        let tab = ["blue", "red", "green"];
        const random = Math.floor(Math.random() * 3);
        this.ctx.fillStyle = tab[random];
        this.ctx.fillRect(widthOffset * this.width, heightOffset * this.height, this.width, this.height);
    }
}
