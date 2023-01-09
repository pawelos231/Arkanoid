class Loader{
    constructor(){

    }
    loadSound(soundUrl: string): HTMLAudioElement{
        const audio: HTMLAudioElement = new Audio()
        audio.addEventListener('canplaythrough', (event: Event) => this.itemLoaded(event), false)
        audio.src = soundUrl
        return audio
    }
    itemLoaded(event: any) {
		event.target.removeEventListener(event.type, this.itemLoaded, false);
	}
}
export const loader = new Loader()