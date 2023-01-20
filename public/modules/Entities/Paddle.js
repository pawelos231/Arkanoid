var Direction;
(function (Direction) {
    Direction[Direction["LeftArrows"] = 65] = "LeftArrows";
    Direction[Direction["LeftNormal"] = 37] = "LeftNormal";
    Direction[Direction["RigthArrows"] = 68] = "RigthArrows";
    Direction[Direction["RigthNormal"] = 39] = "RigthNormal";
})(Direction || (Direction = {}));
export class Paddle {
    constructor(width, height, ctx) {
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.positions = { heightOffset: 0, widthOffset: 0 };
    }
    drawPaddle(positions = { widthOffset: window.innerWidth / 2 - 100, heightOffset: window.innerHeight - 70 }) {
        this.positions = positions;
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(positions.widthOffset, positions.heightOffset, this.width - 1, this.height - 1);
    }
    clearPaddle(heightOffset) {
        this.ctx.clearRect(this.positions.widthOffset, heightOffset, this.width + 1, this.height + 1);
    }
}
