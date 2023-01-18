class Loader {
    constructor() {
    }
    IsUrlValid() {
    }
    loadSound(soundUrl) {
        const audio = new Audio();
        audio.addEventListener('canplaythrough', (event) => this.itemLoaded(event), false);
        audio.src = soundUrl;
        return audio;
    }
    itemLoaded(event) {
        if (!event.target)
            return;
        event.target.removeEventListener(event.type, this.itemLoaded, false);
    }
    loadImage(imageUrl) {
        const image = new Image();
        image.src = imageUrl;
        image.addEventListener("load", (event) => this.itemLoaded(event), false);
        return image;
    }
}
export const loader = new Loader();
