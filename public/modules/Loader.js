class Loader {
    constructor() {
    }
    IsUrlValid() {
    }
    loadSound(soundUrl) {
        const audio = new Audio();
        return new Promise((resolve, reject) => {
            audio.addEventListener('canplaythrough', (event) => this.itemLoaded(event), false);
            audio.src = soundUrl;
            soundUrl.length !== 0 ? resolve(audio) : reject("nie udało się wczytać pliku");
        });
    }
    itemLoaded(event) {
        if (!event.target)
            return;
        event.target.removeEventListener(event.type, this.itemLoaded, false);
    }
    loadImage(imageUrl) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = imageUrl;
            image.addEventListener("load", (event) => this.itemLoaded(event), false);
            resolve(image);
        });
    }
    loadMultipleImages(imagesUrl) {
        return new Promise((resolve, reject) => {
            const multiple = imagesUrl.map(item => {
                const image = new Image();
                image.src = item;
                image.addEventListener("load", (event) => this.itemLoaded(event), false);
                return image;
            });
            resolve(multiple);
        });
    }
}
export const loader = new Loader();
