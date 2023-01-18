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
    setColor(special, color, images, x, y) {
        if (special) {
            images.onload = () => {
                const pattern = this.ctx.createPattern(images, "repeat");
                if (!pattern)
                    return;
                this.ctx.fillStyle = pattern;
                this.ctx.drawImage(images, x, y, this.width - 2, this.height - 2);
            };
        }
        else {
            this.ctx.fillStyle = color;
        }
    }
    drawBrick(heightOffset, widthOffset, color, images) {
        this.initBrickState(widthOffset, heightOffset);
        this.setColor(this.brickState.special, color, images, widthOffset * this.width, heightOffset * this.height);
        this.ctx.fillRect(widthOffset * this.width, heightOffset * this.height, this.width - 1, this.height - 1);
        this.ctx.strokeStyle = "white";
        this.ctx.strokeRect(widthOffset * this.width, heightOffset * this.height, this.width, this.height);
        this.WriteBrickToConsole();
    }
    testBrick() { }
}
