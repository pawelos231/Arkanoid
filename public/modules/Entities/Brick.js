import { loader } from "../Loader";
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
    async loadSpecialImages() {
        let images = new Image();
        await loader.loadImage("https://cdn2.thecatapi.com/images/4vg.jpg").then(data => images = data);
        return images;
    }
    async setColor(special, color, x, y) {
        if (special) {
            let image = new Image();
            await this.loadSpecialImages().then((data) => image = data);
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
        }
    }
    drawBrick(heightOffset, widthOffset, color) {
        this.initBrickState(widthOffset, heightOffset);
        this.setColor(this.brickState.special, color, widthOffset * this.width, heightOffset * this.height);
        this.ctx.fillRect(widthOffset * this.width, heightOffset * this.height, this.width - 1, this.height - 1);
        this.ctx.strokeStyle = "white";
        this.ctx.strokeRect(widthOffset * this.width, heightOffset * this.height, this.width, this.height);
        //this.WriteBrickToConsole()
    }
    testBrick() { }
}
