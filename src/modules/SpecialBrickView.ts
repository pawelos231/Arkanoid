import { Media } from "./Media";
export class SpecialBrick {
  private readonly image: any | HTMLImageElement;
  private readonly sound: string;

  constructor(image: HTMLImageElement, sound: string) {
    this.image = image;
    this.sound = sound;
  }

  public displayViewOfSpecialBrick() {
    if (this.sound == "")
      throw new Error("nie mozesz przekazać pustego stringa");
    Media.spanwCustomSound(this.sound);
    console.log("trafiony special");
  }
}
