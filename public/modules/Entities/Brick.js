export class Brick {
    constructor(width, height, ctx, special, status, brick_x, brick_y) {
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.brickState = { brick_x, brick_y, status, special };
    }
    initBrickState(brick_x, brick_y) {
        this.brickState.brick_x = brick_x;
        this.brickState.brick_y = brick_y;
    }
    WriteBrickToConsole() {
        console.log(this.brickState);
    }
    get brickStateGet() {
        return this.brickState;
    }
    setColor(special, color, x, y, image) {
        if (special && special.randomBrick == (this.brickState.brick_x + 1) * (this.brickState.brick_y + 1)) {
            if (special.Position) {
                special.Position.brick_x = this.brickState.brick_x;
                special.Position.brick_y = this.brickState.brick_y;
            }
            this.ctx.drawImage(image, x + 1, y + 1, this.width - 2, this.height - 2);
        }
        else {
            this.ctx.fillStyle = color;
            this.ctx.fillRect(this.brickState.brick_x * this.width, this.brickState.brick_y * this.height, this.width - 1, this.height - 1);
        }
    }
    async drawBrick(heightOffset, widthOffset, color, image = null) {
        this.initBrickState(widthOffset, heightOffset);
        this.setColor(this.brickState.special, color, widthOffset * this.width, heightOffset * this.height, image);
        this.ctx.strokeStyle = "white";
        this.ctx.strokeRect(widthOffset * this.width, heightOffset * this.height, this.width, this.height);
        //this.WriteBrickToConsole()
    }
    testBrick() { }
}
