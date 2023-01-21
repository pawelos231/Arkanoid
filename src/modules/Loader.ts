class Loader {
    constructor() {

    }
    private IsUrlValid(){

    }
    public loadSound(soundUrl: string): HTMLAudioElement {
        const audio: HTMLAudioElement = new Audio()
        audio.addEventListener('canplaythrough', (event: Event) => this.itemLoaded<Event>(event), false)
        audio.src = soundUrl
        return audio
    }
    public itemLoaded<T extends Event>(event: T): void {
        if (!event.target) return
        event.target.removeEventListener(event.type, this.itemLoaded, false);
    }
    public loadImage(imageUrl: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const image:HTMLImageElement = new Image();
            image.src = imageUrl;
            image.addEventListener("load", (event: Event) => this.itemLoaded<Event>(event), false);
            resolve(image)
        })
      }
    public loadMultipleImages(imagesUrl: string[]): Promise<HTMLImageElement[]>{
        return new Promise((resolve, reject) => {
            const multiple = imagesUrl.map(item => {
                const image: HTMLImageElement = new Image()
                image.src = item
                image.addEventListener("load", (event: Event) => this.itemLoaded<Event>(event), false);
                return image
            })
            resolve(multiple)
        })
    }
}
export const loader: Loader = new Loader()