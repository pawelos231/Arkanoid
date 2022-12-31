class Loader {
    constructor() {
    }
    loadSound(soundUrl) {
        const audio = new Audio();
        audio.addEventListener('canplaythrough', event => this.itemLoaded(event), false);
        audio.src = soundUrl;
        return audio;
    }
    itemLoaded(event) {
        event.target.removeEventListener(event.type, this.itemLoaded, false);
    }
}
export const loader = new Loader();
