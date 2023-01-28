export class Brick {
    constructor(width, height, ctx, special, status, brick_x, brick_y, color) {
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.brickState = { brick_x, brick_y, status, special };
        this.color = color;
    }
    WriteBrickToConsole() {
        console.log(this.brickState);
    }
    get brickStateGet() {
        return this.brickState;
    }
    set setStatus(value) {
        this.brickState.status = value;
    }
    setColor(special, x, y, image, counter) {
        if (special && special.randomBrick == counter) {
            if (special.Position) {
                special.Position.brick_x = this.brickState.brick_x;
                special.Position.brick_y = this.brickState.brick_y;
            }
            this.ctx.drawImage(image, x, y, this.width - 2, this.height - 2);
        }
        else {
            this.ctx.fillStyle = this.color;
            this.ctx.fillRect(this.brickState.brick_x * this.width, this.brickState.brick_y * this.height, this.width - 1, this.height - 1);
        }
    }
    set widthSetter(width) {
        this.width = width;
    }
    set heightSetter(height) {
        this.height = height;
    }
    async drawBrick(image = null, counter) {
        if (this.brickState.status == 0)
            return;
        this.setColor(this.brickState.special, this.brickState.brick_x * this.width, this.brickState.brick_y * this.height, image, counter);
        this.ctx.strokeStyle = "white";
        this.ctx.strokeRect(this.brickState.brick_x * this.width, this.brickState.brick_y * this.height, this.width, this.height);
        //this.WriteBrickToConsole()
    }
    testBrick() { }
}
