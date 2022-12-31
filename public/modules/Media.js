import { loader } from "./Loader";
export class Media {
    constructor(musicVolume, soundVolume, allowedMusic, allowedSound, backgroundMusic) {
        this.audio = loader.loadSound("https://media.w3.org/2010/07/bunny/04-Death_Becomes_Fur.mp4");
        this.musicVolume = 0.3;
        this.soundVolume = 0.5;
        this.allowedMusic = true;
        this.allowedSound = true;
        this.backgroundMusic = null;
    }
    playMusic() {
        this.audio.play();
    }
    stopMusic() {
        this.audio.pause();
    }
}
