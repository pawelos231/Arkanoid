import { Common } from "./Common";
import {Brick} from './Entities/Brick'
const GAME_CANVAS = "game_canvas"

class Canvas extends Common{
    ctx: CanvasRenderingContext2D | null;
    canvas: HTMLCanvasElement;
    constructor() {
        super(GAME_CANVAS)
        this.canvas = null as any
        this.ctx = null
    }
    configureCanvas(): void{
        if(!this.elementId) throw new Error("Element nie istnieje")

        this.changeVisbilityOfGivenElement(this.elementId, true)
        this.canvas = this.elementId as HTMLCanvasElement;

        if(!this.canvas) throw new Error("Failed to init canvas");

        this.ctx = this.canvas.getContext("2d");

        if(!this.ctx) throw new Error("Failed to init canvas");
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        window.addEventListener("resize", () =>{
            let values: number[] = [window.innerHeight, window.innerWidth]
            this.canvas.height = values[0]
            this.canvas.width = values[1]
        })
        //chuj
    }
    drawBricksOnScreen(heightOffset: number, widthOffset: number){
        const heightOfBrick: number = window.innerHeight / 16
        const widthOfABrick: number = window.innerWidth / 8
        const brick = new Brick(widthOfABrick, heightOfBrick, this.ctx as CanvasRenderingContext2D)
        brick.drawBrick(heightOffset, widthOffset)
    }
    drawGame(){
        for(let i = 0; i<3; i++){
            for(let j = 0; j<8; j++){
                this.drawBricksOnScreen(i, j)
            }
        }
    }
    draw(){
        this.configureCanvas()
        this.drawGame()
    }
}

export const canvas: Canvas = new Canvas()