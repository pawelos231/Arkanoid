import { loader } from "../Loader";
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
    async setColor(special, color, x, y) {
        if (special.isSpecial && special.randomBrick == this.brickState.x * this.brickState.y) {
            let image = new Image();
            await loader.loadImage("https://cdn2.thecatapi.com/images/4vg.jpg").then((data) => image = data);
            this.ctx.clearRect(x + 1, y + 1, this.width - 2, this.height - 2);
            image.onload = () => {
                const pattern = this.ctx.createPattern(image, "repeat");
                if (!pattern)
                    return;
                this.ctx.fillStyle = pattern;
                this.ctx.drawImage(image, x + 1, y + 1, this.width - 2, this.height - 2);
            };
        }
        else {
            this.ctx.fillStyle = color;
            this.ctx.fillRect(this.brickState.x * this.width, this.brickState.y * this.height, this.width - 1, this.height - 1);
        }
    }
    async drawBrick(heightOffset, widthOffset, color) {
        this.initBrickState(widthOffset, heightOffset);
        await this.setColor(this.brickState.special, color, widthOffset * this.width, heightOffset * this.height);
        this.ctx.strokeStyle = "white";
        this.ctx.strokeRect(widthOffset * this.width, heightOffset * this.height, this.width, this.height);
        //this.WriteBrickToConsole()
    }
    testBrick() { }
}
