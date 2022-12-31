import { loader } from "./Loader"
export class Media {
    musicVolume: any
    soundVolume: any
    allowedMusic: boolean
    allowedSound: boolean
    backgroundMusic: any
    constructor(musicVolume: any, soundVolume: any, allowedMusic: boolean, allowedSound: boolean, backgroundMusic: any){
        this.musicVolume = 0.3;
		this.soundVolume = 0.5;
        this.allowedMusic = true
        this.allowedSound = true
        this.backgroundMusic = null
    }

    audio: HTMLAudioElement = loader.loadSound("https://media.w3.org/2010/07/bunny/04-Death_Becomes_Fur.mp4")

    playMusic(){
        this.audio.play()
    }
    stopMusic(){
        this.audio.pause()
    }
}