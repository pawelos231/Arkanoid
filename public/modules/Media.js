import { loader } from "./Loader";
const DEFAULT_SOUND = "http://localhost:1234/hitPaddle.mp3";
class Media {
    constructor(musicVolume = 0.5, soundVolume = 0.5, allowedMusic = true, allowedSound = true) {
        this.cachedSongId = "";
        this.cachedSoundId = "";
        this.musicVolume = musicVolume;
        this.soundVolume = soundVolume;
        this.allowedMusic = allowedMusic;
        this.allowedSound = allowedSound;
    }
    async setBackroundMusic(path) {
        //do better error handling
        if (path.length == 0)
            return false;
        if (this.cachedSongId == path)
            return false;
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
        return true;
    }
    async setSound(path = DEFAULT_SOUND) {
        if (path.length == 0)
            return false;
        if (this.cachedSoundId === path)
            return false;
        else if (this.cachedSoundId.length != 0 && this.cachedSoundId !== path) {
            this.sound.pause();
            this.sound = null;
            const sound = await loader.loadSound(path);
            this.sound = sound;
        }
        else {
            const sound = await loader.loadSound(path);
            this.sound = sound;
        }
        this.cachedSoundId = path;
        return true;
    }
    playMusic() {
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = this.musicVolume;
        this.backgroundMusic.play();
    }
    stopMusic() {
        this.backgroundMusic.pause();
    }
    changeVolumeOfBackgroundMusic(musicElement) {
        const inputMusic = musicElement.children[0];
        inputMusic.value = this.musicVolume * 100;
        inputMusic.addEventListener("input", (e) => {
            const valueOfAnElement = e.target.value / 100;
            this.backgroundMusic.volume = valueOfAnElement;
        });
    }
    changeVolumeOfSound(SoundElement) {
        const inputMusic = SoundElement.children[0];
        inputMusic.value = this.soundVolume * 100;
        inputMusic.addEventListener("input", (e) => {
            const valueOfAnElement = e.target.value / 100;
            this.sound.volume = valueOfAnElement;
        });
    }
    resetValuesToDefault(music, sound) {
        this.allowedMusic = true;
        this.allowedSound = true;
        this.musicVolume = 0.5;
        this.soundVolume = 0.5;
        let inputMusic = music.children[0];
        inputMusic.value = this.musicVolume * 100;
        let inputSound = sound.children[0];
        inputSound.value = this.soundVolume * 100;
        this.backgroundMusic.volume = this.musicVolume;
        this.sound.volume = this.soundVolume;
    }
    muteMusic() {
    }
    muteSound() {
    }
    spawnSoundWhenHitPaddle() {
        if (this.sound) {
            this.sound.play();
            this.sound.loop = false;
        }
    }
    async spawnSoundWhenHitBrick() {
        const sound = await loader.loadSound(this.cachedSoundId);
        sound.play();
        this.sound.loop = false;
    }
}
export const media = new Media();
