class Loader {
    constructor() {

    }
    IsUrlValid(){
        
    }
    loadSound(soundUrl: string): HTMLAudioElement {
        const audio: HTMLAudioElement = new Audio()
        audio.addEventListener('canplaythrough', (event: Event) => this.itemLoaded<Event>(event), false)
        audio.src = soundUrl
        return audio
    }
    itemLoaded<T extends Event>(event: T): void {
        if (!event.target) return
        event.target.removeEventListener(event.type, this.itemLoaded, false);
    }
    loadImage(imageUrl: string) {
        const image = new Image();
        image.src = imageUrl;
        image.addEventListener("load", (event: Event) => this.itemLoaded<Event>(event), false);
        return image;
      }
}
export const loader: Loader = new Loader()