import { media } from "./Media"
export class SpecialBrick {
    private image: any | HTMLImageElement
    private sound: string

    constructor(image: HTMLImageElement, sound: string){
        this.image = image
        this.sound = sound
    }

    public displayViewOfSpecialBrick(){

        if(this.sound == "") throw new Error("nie mozesz przekazać pustego stringa")
        console.log(this.image)
        media.spanwCustomSound(this.sound)
        console.log("trafiony special")
        
    }
}