import { loader } from "./Loader";
export class Media {
    constructor(musicVolume = 0.3, soundVolume = 0.3, allowedMusic = true, allowedSound = true) {
        this.cachedSongId = "";
        this.musicVolume = musicVolume;
        this.soundVolume = soundVolume;
        this.allowedMusic = allowedMusic;
        this.allowedSound = allowedSound;
    }
    async setBackroundMusic(path) {
        if (path.length == 0)
            throw new Error("niepoprawna ściezka");
        if (this.cachedSongId == path)
            throw new Error("ta nuta juz bangla");
        else if (this.cachedSongId.length !== 0 && this.cachedSongId !== path) {
            this.backgroundMusic.pause();
            this.backgroundMusic = null;
            const backgroundAudio = await loader.loadSound(path);
            this.backgroundMusic = backgroundAudio;
        }
        else {
            const backgroundAudio = await loader.loadSound(path);
            this.backgroundMusic = backgroundAudio;
        }
        this.cachedSongId = path;
    }
    playMusic() {
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = this.musicVolume;
        this.backgroundMusic.play();
    }
    stopMusic() {
        this.backgroundMusic.pause();
    }
    changeVolumeOfBackgroundMusic(element) {
        let inputMusic = element.children[0];
        inputMusic.value = this.musicVolume * 100;
        inputMusic.addEventListener("input", (e) => {
            const valueOfAnElement = e.target.value / 100;
            this.backgroundMusic.volume = valueOfAnElement;
        });
    }
    resetValuesToDefault(element) {
        this.allowedMusic = true;
        this.allowedSound = true;
        this.musicVolume = 0.5;
        this.soundVolume = 0.5;
        let inputMusic = element.children[0];
        inputMusic.value = this.musicVolume * 100;
        this.backgroundMusic.volume = this.musicVolume;
    }
    resetMusic() {
    }
    muteMusic() {
    }
    muteSound() {
    }
    spawnSound() {
    }
}
