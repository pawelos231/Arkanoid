export class Paddle {
    constructor(width, height, ctx) {
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.positions = { paddle_y: 0, paddle_x: 0 };
    }
    initPaddlePos() {
        return {
            paddle_x: window.innerWidth / 2 - 100,
            paddle_y: window.innerHeight - 70,
        };
    }
    set setPaddleSize({ width, height }) {
        this.width = width;
        this.height = height;
    }
    get getPaddleSize() {
        return {
            paddleWidth: this.width,
            paddleHeight: this.height,
        };
    }
    clearPaddle(heightOffset) {
        this.ctx.clearRect(this.positions.paddle_x, heightOffset, this.width + 1, this.height + 1);
    }
    drawPaddle(positions = Object.assign({}, this.initPaddlePos())) {
        this.positions = positions;
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(positions.paddle_x, positions.paddle_y, this.width - 1, this.height - 1);
    }
    get paddlePositions() {
        return this.positions;
    }
}
