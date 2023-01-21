import { loader } from "../Loader"
import { brickState } from "../../interfaces/gameStateInterface"
export class Brick {
    private width: number
    private height: number
    private ctx: CanvasRenderingContext2D
    private brickState: brickState
    public constructor(width: number, height: number, ctx: CanvasRenderingContext2D, isSpecial: boolean) {
        this.width = width
        this.height = height
        this.ctx = ctx
        this.brickState = { x: 0, y: 0, status: 1, special: isSpecial }
    }
    private initBrickState(x: number, y: number): void {
        this.brickState.x = x
        this.brickState.y = y
    }
    WriteBrickToConsole(): void {
        console.log(this.brickState)
    }
    private async loadSpecialImages(): Promise<HTMLImageElement>{ 
        let images: HTMLImageElement = new Image();
       await loader.loadImage("https://cdn2.thecatapi.com/images/4vg.jpg").then(data => images = data)
        return images
    }
    private async setColor(special: boolean, color: string, x: number, y: number): Promise<void> {
        if (special) {
            let image: HTMLImageElement = new Image();
            await this.loadSpecialImages().then((data:HTMLImageElement) => image = data)
            
            image.onload = () =>{
                const pattern: CanvasPattern | null = this.ctx.createPattern(image, "repeat");
                if(!pattern) return
                this.ctx.fillStyle = pattern;
                this.ctx.drawImage(image, x+1,y+1, this.width - 2, this.height - 2);
            }    
        } else{
            this.ctx.fillStyle = color
        } 
    }
    public drawBrick(heightOffset: number, widthOffset: number, color: string ): void {
        this.initBrickState(widthOffset, heightOffset)

        this.setColor(this.brickState.special, color, widthOffset * this.width, heightOffset * this.height)

        this.ctx.fillRect(widthOffset * this.width, heightOffset * this.height, this.width - 1, this.height - 1)

        this.ctx.strokeStyle = "white"

        this.ctx.strokeRect(widthOffset * this.width, heightOffset * this.height, this.width, this.height)

        //this.WriteBrickToConsole()
    }
    private testBrick() { }
}