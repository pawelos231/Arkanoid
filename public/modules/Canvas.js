import { Common } from "./Common";
const GAME_CANVAS = "game";
class Canvas extends Common {
    constructor() {
        super(GAME_CANVAS);
    }
    configureCanvas() {
        if (!this.elementId)
            throw new Error("Element nie istnieje");
        const canvas = this.elementId;
        canvas.getContext("2d");
    }
}
export const canvas = new Canvas();
