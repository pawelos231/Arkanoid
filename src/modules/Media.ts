import { loader } from "./Loader"
export class Media {
    musicVolume: any
    soundVolume: any
    allowedMusic: boolean
    allowedSound: boolean
    constructor(musicVolume: any, soundVolume: any, allowedMusic: boolean, allowedSound: boolean){
        this.musicVolume = 0.3;
		this.soundVolume = 0.5;
        this.allowedMusic = true
        this.allowedSound = true
    }

    backgroundAudio: HTMLAudioElement = loader.loadSound("https://media.w3.org/2010/07/bunny/04-Death_Becomes_Fur.mp4")

    playMusic(): void{
        if(!this.backgroundAudio) throw new Error("coś poszło nie tak przy wycztywaniu muzyki")
        this.backgroundAudio.loop = true
        this.backgroundAudio.volume = this.musicVolume
        this.backgroundAudio.play()
    }
    stopMusic(): void{
        if(!this.backgroundAudio) throw new Error("coś poszło nie tak przy wycztywaniu muzyki")
        this.backgroundAudio.pause()
    }
    changeVolumeOfBackgroundMusic(element: Element): void{
        let inputMusic: any = element.children[0]
        inputMusic.value = this.musicVolume * 100
        inputMusic.addEventListener("input", (e: any)=>{
            const valueOfAnElement: number = e.target.value / 100
            this.backgroundAudio.volume = valueOfAnElement
        })
    }
    resetValuesToDefault(){

    }
    resetMusic(){
        
    }
    muteMusic(){

    }
    muteSound(){

    }
}