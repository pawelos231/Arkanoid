export class Media {
    private musicVolume: number
    soundVolume: number
    allowedMusic: boolean
    allowedSound: boolean
    backgroundMusic: HTMLAudioElement
    constructor(musicVolume: number = 0.3, soundVolume: number = 0.3, allowedMusic: boolean = true, allowedSound: boolean = true, backgroundMusic: HTMLAudioElement) {
        this.musicVolume = musicVolume;
        this.soundVolume = soundVolume;
        this.allowedMusic = allowedMusic
        this.allowedSound = allowedSound
        this.backgroundMusic = backgroundMusic
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