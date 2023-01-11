class Loader{
    constructor(){

    }
    loadSound(soundUrl: string): HTMLAudioElement{
        const audio: HTMLAudioElement = new Audio()
        audio.addEventListener('canplaythrough', (event: Event) => this.itemLoaded<Event>(event), false)
        audio.src = soundUrl
        return audio
    }
    itemLoaded<T extends Event>(event: T): void{
        if(!event.target) return
 		event.target.removeEventListener(event.type, this.itemLoaded, false);
	}
}
export const loader: Loader = new Loader()