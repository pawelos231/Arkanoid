import { Common } from "./Common";

const GAME_CANVAS = "game"
class Canvas extends Common{
    constructor(){
        super(GAME_CANVAS)
    }
    configureCanvas(): void{
        if(!this.elementId) throw new Error("Element nie istnieje")

        const canvas = this.elementId as HTMLCanvasElement;

        canvas.getContext("2d")
    }
}
export const canvas: Canvas = new Canvas()