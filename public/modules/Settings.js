import { Common } from "./Common";
import { Logger } from "../interfaces/HelperEnums";
import { media } from "./Media";
import { MediaEnum } from "../interfaces/HelperEnums";
class Settings extends Common {
    constructor() {
        super("levelSelect");
    }
    PaginateResults(songsList, ITEMS_PER_PAGE, mediaToLoad, ListToPaginateId) {
        const LEFT = this.bindElementByClass("paginateSongResults > .left");
        const RIGHT = this.bindElementByClass("paginateSongResults > .right");
        const PAGE = this.bindElementByClass("paginateSongResults > .page");
        const PAGINATION_ELEMENT = this.bindElementByClass("paginateSongResults");
        this.changeVisbilityOfGivenElement(PAGINATION_ELEMENT, true);
        if (ListToPaginateId == MediaEnum.Music) {
            console.log("muzyka do załadowania");
        }
        if (ListToPaginateId == MediaEnum.Sounds) {
            console.log("sounds do załadowania");
        }
        const SONG_LIST_LEN = mediaToLoad.length;
        const PAGES = Math.ceil(SONG_LIST_LEN / ITEMS_PER_PAGE);
        let currentPage = 0;
        PAGE.innerHTML = `${currentPage + 1} z ${PAGES}`;
        this.createSongsView(songsList, currentPage * ITEMS_PER_PAGE, ITEMS_PER_PAGE, mediaToLoad);
        RIGHT.addEventListener("click", () => {
            currentPage++;
            if (currentPage > PAGES - 1) {
                currentPage--;
                this.displayMessageAtTheTopOfTheScreen("Strona musi być w rangu", Logger.Error);
                return;
            }
            if (SONG_LIST_LEN - (currentPage * ITEMS_PER_PAGE) < ITEMS_PER_PAGE) {
                this.createSongsView(songsList, currentPage * ITEMS_PER_PAGE, SONG_LIST_LEN - currentPage * ITEMS_PER_PAGE, mediaToLoad);
            }
            else {
                this.createSongsView(songsList, currentPage * ITEMS_PER_PAGE, ITEMS_PER_PAGE, mediaToLoad);
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
            this.createSongsView(songsList, currentPage * ITEMS_PER_PAGE, ITEMS_PER_PAGE, mediaToLoad);
            PAGE.innerHTML = `${currentPage + 1} z ${PAGES}`;
        });
    }
    createSoundsView(songsList, skipValue, itemsperPage, tempTabOfSounds) {
    }
    createSongsView(songsList, skipValue, itemsperPage, tempTabOfSongs) {
        songsList.innerHTML = "";
        for (let i = skipValue; i < skipValue + itemsperPage; i++) {
            const li = document.createElement("li");
            const img = document.createElement("img");
            const p = document.createElement("p");
            img.src = tempTabOfSongs[i].pathToImage;
            img.alt = "siema";
            p.innerHTML = tempTabOfSongs[i].description;
            li.appendChild(img);
            li.appendChild(p);
            li.addEventListener("click", async () => {
                if (await media.setBackroundMusic(tempTabOfSongs[i].song)) {
                    this.displayMessageAtTheTopOfTheScreen(`now playing: ${tempTabOfSongs[i].name}`, Logger.Message);
                }
                else {
                    this.displayMessageAtTheTopOfTheScreen(`nie mozemy zagrać nuty: ${tempTabOfSongs[i].name}, coś poszło nie tak`, Logger.Error);
                }
                media.playMusic();
            });
            songsList.appendChild(li);
        }
    }
}
export const settings = new Settings();
