import { loader } from "./Loader";
export class Media {
    constructor(musicVolume, soundVolume, allowedMusic, allowedSound) {
        this.backgroundAudio = loader.loadSound("https://media.w3.org/2010/07/bunny/04-Death_Becomes_Fur.mp4");
        this.musicVolume = 0.3;
        this.soundVolume = 0.5;
        this.allowedMusic = true;
        this.allowedSound = true;
    }
    playMusic() {
        if (!this.backgroundAudio)
            throw new Error("coś poszło nie tak przy wycztywaniu muzyki");
        this.backgroundAudio.loop = true;
        this.backgroundAudio.volume = this.musicVolume;
        this.backgroundAudio.play();
    }
    stopMusic() {
        if (!this.backgroundAudio)
            throw new Error("coś poszło nie tak przy wycztywaniu muzyki");
        this.backgroundAudio.pause();
    }
    changeVolumeOfBackgroundMusic(element) {
        let inputMusic = element.children[0];
        inputMusic.value = this.musicVolume * 100;
        inputMusic.addEventListener("input", (e) => {
            const valueOfAnElement = e.target.value / 100;
            this.backgroundAudio.volume = valueOfAnElement;
        });
    }
    resetValuesToDefault() {
    }
    resetMusic() {
    }
    muteMusic() {
    }
    muteSound() {
    }
}
