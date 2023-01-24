export class Brick {
    constructor(width, height, ctx, special, status, x, y) {
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.brickState = { x, y, status, special };
    }
    initBrickState(x, y) {
        this.brickState.x = x;
        this.brickState.y = y;
    }
    WriteBrickToConsole() {
        console.log(this.brickState);
    }
    get brickStateGet() {
        return this.brickState;
    }
    setColor(special, color, x, y, image, counter) {
        if (special.isSpecial && special.randomBrick == counter) {
            this.ctx.drawImage(image, x + 1, y + 1, this.width - 2, this.height - 2);
        }
        else {
            this.ctx.fillStyle = color;
            this.ctx.fillRect(this.brickState.x * this.width, this.brickState.y * this.height, this.width - 1, this.height - 1);
        }
    }
    async drawBrick(heightOffset, widthOffset, color, image = null, counter) {
        this.initBrickState(widthOffset, heightOffset);
        this.setColor(this.brickState.special, color, widthOffset * this.width, heightOffset * this.height, image, counter);
        this.ctx.strokeStyle = "white";
        this.ctx.strokeRect(widthOffset * this.width, heightOffset * this.height, this.width, this.height);
        //this.WriteBrickToConsole()
    }
    testBrick() { }
}
