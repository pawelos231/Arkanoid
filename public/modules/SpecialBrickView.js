import { Media } from "./Media";
export class SpecialBrick {
    constructor(image, sound) {
        this.image = image;
        this.sound = sound;
    }
    displayViewOfSpecialBrick() {
        if (this.sound == "")
            throw new Error("nie mozesz przekazać pustego stringa");
        Media.spanwCustomSound(this.sound);
        console.log("trafiony special");
    }
}
