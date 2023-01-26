import { loader } from "./Loader"
export class Media {
    musicVolume: number
    soundVolume: number
    allowedMusic: boolean
    allowedSound: boolean
    backgroundMusic: any
    cachedSongId: string = ""
    constructor(musicVolume: number = 0.3, soundVolume: number = 0.3, allowedMusic: boolean = true, allowedSound: boolean = true) {
        this.musicVolume = musicVolume;
        this.soundVolume = soundVolume;
        this.allowedMusic = allowedMusic
        this.allowedSound = allowedSound
    }
    public async setBackroundMusic(path: string) {
        if (path.length == 0) throw new Error("niepoprawna ściezka")
        if (this.cachedSongId == path) throw new Error("ta nuta juz bangla")

        else if (this.cachedSongId.length !== 0 && this.cachedSongId !== path) {
            this.backgroundMusic.pause()
            this.backgroundMusic = null
            const backgroundAudio: HTMLAudioElement = await loader.loadSound(path)
            this.backgroundMusic = backgroundAudio
        } else {
            const backgroundAudio: HTMLAudioElement = await loader.loadSound(path)
            this.backgroundMusic = backgroundAudio
        }
        this.cachedSongId = path
    }
    playMusic(): void {
        this.backgroundMusic.loop = true
        this.backgroundMusic.volume = this.musicVolume
        this.backgroundMusic.play()
    }
    public stopMusic(): void {
        this.backgroundMusic.pause()
    }
    public changeVolumeOfBackgroundMusic(element: Element): void {
        let inputMusic: any = element.children[0]
        inputMusic.value = this.musicVolume * 100
        inputMusic.addEventListener("input", (e: any) => {
            const valueOfAnElement: number = e.target.value / 100
            this.backgroundMusic.volume = valueOfAnElement
        })
    }
    public resetValuesToDefault(element: Element): void {
        this.allowedMusic = true
        this.allowedSound = true
        this.musicVolume = 0.5
        this.soundVolume = 0.5
        let inputMusic: any = element.children[0]
        inputMusic.value = this.musicVolume * 100
        this.backgroundMusic.volume = this.musicVolume
    }
    resetMusic(): void {

    }
    muteMusic(): void {

    }
    muteSound(): void {

    }
    spawnSound(): void {

    }
}