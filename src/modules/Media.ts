import { loader } from "./Loader"
const DEFAULT_SOUND = "http://localhost:1234/hitPaddle.mp3"
class Media {
    musicVolume: number
    soundVolume: number
    allowedMusic: boolean
    allowedSound: boolean
    backgroundMusic: any
    sound: any
    bricksound: any
    cachedSongId: string = ""
    cachedSoundId: string = ""

    constructor(musicVolume: number = 0.5, soundVolume: number = 0.5, allowedMusic: boolean = true, allowedSound: boolean = true) {

        this.musicVolume = musicVolume;
        this.soundVolume = soundVolume;
        this.allowedMusic = allowedMusic
        this.allowedSound = allowedSound
    }

    public async setBackroundMusic(path: string): Promise<boolean> {

        //do better error handling
        if (path.length == 0) return false
        
        if (this.cachedSongId == path) return false
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
        return true
    }


    public async setSound(path: string = DEFAULT_SOUND): Promise<boolean> {

        if (path.length == 0) return false
        if (this.cachedSoundId === path) return false

        else if (this.cachedSoundId.length != 0 && this.cachedSoundId !== path) {
            this.sound.pause()
            this.sound = null
            const sound: HTMLAudioElement = await loader.loadSound(path)
            this.sound = sound
        } else {
            const sound: HTMLAudioElement = await loader.loadSound(path)
            this.sound = sound
        }

        this.cachedSoundId = path
        return true
    }

    public playMusic(): void {

        this.backgroundMusic.loop = true
        this.backgroundMusic.volume = this.musicVolume
        this.backgroundMusic.play()
    }

    public stopMusic(): void {
        this.backgroundMusic.pause()
    }

    public changeVolumeOfBackgroundMusic(musicElement: Element): void {

        const inputMusic: any = musicElement.children[0]
        inputMusic.value = this.musicVolume * 100

        inputMusic.addEventListener("input", (e: any) => {
            const valueOfAnElement: number = e.target.value / 100
            this.backgroundMusic.volume = valueOfAnElement
        })

    }

    public changeVolumeOfSound(SoundElement: Element): void {

        const inputMusic: any = SoundElement.children[0]
        inputMusic.value = this.soundVolume * 100

        inputMusic.addEventListener("input", (e: any) => {
            const valueOfAnElement: number = e.target.value / 100
            this.sound.volume = valueOfAnElement
        })

    }

    public resetValuesToDefault(music: Element, sound: Element): void {

        this.allowedMusic = true
        this.allowedSound = true
        this.musicVolume = 0.5
        this.soundVolume = 0.5
        let inputMusic: any = music.children[0]
        inputMusic.value = this.musicVolume * 100
        let inputSound: any = sound.children[0]
        inputSound.value = this.soundVolume * 100
        this.backgroundMusic.volume = this.musicVolume
        this.sound.volume = this.soundVolume

    }

    muteMusic(): void {

    }

    muteSound(): void {

    }

    public spawnSoundWhenHitPaddle(): void {
        if (this.sound) {
            this.sound.play()
            this.sound.loop = false
        }
    }

    public async spawnSoundWhenHitBrick(): Promise<void> {
        const sound: HTMLAudioElement = await loader.loadSound(this.cachedSoundId)
        sound.play()
    }

    public async spanwCustomSound(soundToLoad: string): Promise<void>{
        const sound: HTMLAudioElement = await loader.loadSound(soundToLoad)
        sound.play()
        sound.loop = false
    } 
    
}
export const media: Media = new Media()