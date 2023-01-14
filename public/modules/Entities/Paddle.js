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
    calculatePositionOfPaddle() {
        //to fix
        const heightOffset = window.innerHeight - 70;
        const widthOffset = window.innerWidth / 2 - 100;
        this.positions = { heightOffset, widthOffset };
    }
    drawPaddle() {
        this.ctx.fillStyle = "white";
        this.calculatePositionOfPaddle();
        this.ctx.fillRect(this.positions.widthOffset, this.positions.heightOffset, this.width - 1, this.height - 1);
    }
    clearPaddle(heightOffset) {
        this.ctx.clearRect(this.positions.widthOffset, heightOffset, this.width + 5, this.height + 5);
    }
    updatePaddlePostion(keyCode) {
        const { heightOffset } = this.positions;
        this.ctx.fillStyle = "white";
        this.ctx.strokeStyle = "red";
        if (keyCode == Direction.LeftArrows || keyCode == Direction.LeftNormal) {
            this.clearPaddle(heightOffset);
            this.ctx.fillRect(this.positions.widthOffset -= 20, heightOffset, this.width - 1, this.height - 1);
        }
        if (keyCode == Direction.RigthArrows || keyCode == Direction.RigthNormal) {
            this.clearPaddle(heightOffset);
            this.ctx.fillRect(this.positions.widthOffset += 20, heightOffset, this.width - 1, this.height - 1);
        }
    }
}
