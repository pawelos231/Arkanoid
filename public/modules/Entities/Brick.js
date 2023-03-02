export class Brick {
    constructor(width, height, ctx, specialBrick, status, brick_x, brick_y, brickPoints) {
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.brickState = { brick_x, brick_y, status, specialBrick };
        this.brickPoints = Object.assign({}, brickPoints);
    }
    set heightSetter(height) {
        this.height = height;
    }
    set widthSetter(width) {
        this.width = width;
    }
    get brickStateGet() {
        return this.brickState;
    }
    get brickPointsGet() {
        return this.brickPoints;
    }
    get getStatus() {
        return this.brickState.status;
    }
    set setStatus(value) {
        this.brickState.status = value;
    }
    set timesToHitSet(times) {
        this.brickPoints.timesToHit = times;
    }
    setColor(specialBrick, x, y, image) {
        if (specialBrick) {
            this.brickPoints.points = 100;
            this.brickPoints.timesToHit = 1;
            this.ctx.drawImage(image, x, y, this.width - 2, this.height - 2);
        }
        else {
            this.ctx.fillStyle = this.brickPoints.color;
            this.ctx.fillRect(this.brickState.brick_x * this.width, this.brickState.brick_y * this.height, this.width - 1, this.height - 1);
        }
    }
    drawBrick(image = null) {
        if (this.brickState.status == 0)
            return;
        this.setColor(this.brickState.specialBrick, this.brickState.brick_x * this.width, this.brickState.brick_y * this.height, image);
        this.ctx.strokeStyle = "white";
        this.ctx.strokeRect(this.brickState.brick_x * this.width, this.brickState.brick_y * this.height, this.width, this.height);
    }
}
