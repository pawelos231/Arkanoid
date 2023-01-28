import { Common } from "./Common";
import { Logger } from "../interfaces/HelperEnums";
import { media } from "./Media";
import { MediaEnum } from "../interfaces/HelperEnums";
import { tempTabOfSongs } from "../data/temporarySongsData";
class Settings extends Common {
    constructor() {
        super("levelSelect");
    }
    PaginateResults(songsList, ITEMS_PER_PAGE, mediaToLoad, ListToPaginateId) {
        console.log(ListToPaginateId);
        const LEFT = this.bindElementByClass("paginateSongResults > .left");
        const RIGHT = this.bindElementByClass("paginateSongResults > .right");
        const PAGE = this.bindElementByClass("paginateSongResults > .page");
        const PAGINATION_ELEMENT = this.bindElementByClass("paginateSongResults");
        this.changeVisbilityOfGivenElement(PAGINATION_ELEMENT, true);
        const SONG_LIST_LEN = mediaToLoad.length;
        const PAGES = Math.ceil(SONG_LIST_LEN / ITEMS_PER_PAGE);
        let currentPage = 0;
        PAGE.innerHTML = `${currentPage + 1} z ${PAGES}`;
        this.createView(songsList, currentPage * ITEMS_PER_PAGE, ITEMS_PER_PAGE, mediaToLoad, ListToPaginateId);
        RIGHT.addEventListener("click", () => {
            currentPage++;
            if (currentPage > PAGES - 1) {
                currentPage--;
                this.displayMessageAtTheTopOfTheScreen("Strona musi być w rangu", Logger.Error);
                return;
            }
            if (SONG_LIST_LEN - (currentPage * ITEMS_PER_PAGE) < ITEMS_PER_PAGE) {
                this.createView(songsList, currentPage * ITEMS_PER_PAGE, SONG_LIST_LEN - currentPage * ITEMS_PER_PAGE, mediaToLoad, ListToPaginateId);
            }
            else {
                this.createView(songsList, currentPage * ITEMS_PER_PAGE, ITEMS_PER_PAGE, mediaToLoad, ListToPaginateId);
            }
            PAGE.innerHTML = `${currentPage + 1} z ${PAGES}`;
        });
        LEFT.addEventListener("click", () => {
            currentPage--;
            if (currentPage < 0) {
                currentPage++;
                this.displayMessageAtTheTopOfTheScreen("Strona musi być w rangu", Logger.Error);
                return;
            }
            this.createView(songsList, currentPage * ITEMS_PER_PAGE, ITEMS_PER_PAGE, mediaToLoad, ListToPaginateId);
            PAGE.innerHTML = `${currentPage + 1} z ${PAGES}`;
        });
    }
    createView(songsList, skipValue, itemsperPage, tempTabOfMusic, ListToPaginateId) {
        songsList.innerHTML = "";
        if (ListToPaginateId == MediaEnum.Music) {
            for (let i = skipValue; i < skipValue + itemsperPage; i++) {
                const li = document.createElement("li");
                const img = document.createElement("img");
                const p = document.createElement("p");
                img.src = tempTabOfMusic[i].pathToImage;
                img.alt = `Piosenka o nazwie  ${tempTabOfMusic[i].song}`;
                p.innerHTML = tempTabOfMusic[i].description;
                li.appendChild(img);
                li.appendChild(p);
                li.addEventListener("click", async () => {
                    if (await media.setBackroundMusic(tempTabOfMusic[i].song)) {
                        this.displayMessageAtTheTopOfTheScreen(`Ustawiono piosenkę o nazwie: ${tempTabOfMusic[i].name}`, Logger.Message);
                    }
                    else {
                        this.displayMessageAtTheTopOfTheScreen(`nie mozemy zagrać nuty: ${tempTabOfMusic[i].name}, coś poszło nie tak`, Logger.Error);
                        throw new Error("nie mozemy zagrać tej piosenki");
                    }
                    media.playMusic();
                });
                songsList.appendChild(li);
            }
        }
        else if (ListToPaginateId == MediaEnum.Sounds) {
            for (let i = skipValue; i < skipValue + itemsperPage; i++) {
                const li = document.createElement("li");
                const img = document.createElement("img");
                const p = document.createElement("p");
                img.src = tempTabOfMusic[i].pathToImage;
                img.alt = `Dźwięk o nazwie  ${tempTabOfMusic[i].sound}`;
                p.innerHTML = tempTabOfMusic[i].description;
                li.appendChild(img);
                li.appendChild(p);
                li.addEventListener("click", async () => {
                    if (await media.setSound(tempTabOfMusic[i].sound)) {
                        this.displayMessageAtTheTopOfTheScreen(`Ustawiono dźwięk o nazwie: ${tempTabOfSongs[i].name}`, Logger.Message);
                    }
                    else {
                        this.displayMessageAtTheTopOfTheScreen(`nie wczytać dźwięku: ${tempTabOfMusic[i].name}, coś poszło nie tak`, Logger.Error);
                        throw new Error("nie mozemy wczytać tego dźwięku");
                    }
                    console.log("media spawn sound");
                    media.spawnSoundWhenHitPaddle();
                });
                songsList.appendChild(li);
            }
        }
    }
}
export const settings = new Settings();
