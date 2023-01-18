export class Brick {
    constructor(width, height, ctx, isSpecial) {
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.brickState = { x: 0, y: 0, status: 1, special: isSpecial };
    }
    initBrickState(x, y) {
        this.brickState.x = x;
        this.brickState.y = y;
    }
    WriteBrickToConsole() {
        console.log(this.brickState);
    }
    DrawColor(special, color) {
        if (special) {
            this.ctx.fillStyle = "#FFD700";
        }
        else {
            this.ctx.fillStyle = color;
        }
    }
    drawBrick(heightOffset, widthOffset, color) {
        this.initBrickState(widthOffset, heightOffset);
        this.DrawColor(this.brickState.special, color);
        this.ctx.fillRect(widthOffset * this.width, heightOffset * this.height, this.width - 1, this.height - 1);
        this.ctx.strokeStyle = "white";
        this.ctx.strokeRect(widthOffset * this.width, heightOffset * this.height, this.width, this.height);
        this.WriteBrickToConsole();
    }
    testBrick() { }
}
