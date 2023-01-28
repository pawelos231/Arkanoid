import { Common } from "./Common";
import { Logger } from "../interfaces/HelperEnums";
import { media } from "./Media";
import { MediaEnum } from "../interfaces/HelperEnums";
import { Sounds } from "../data/temporarySoundsData";
import { Songs } from "../data/temporarySongsData";
class Settings extends Common {
    constructor() {
        super("levelSelect")
    }
    public PaginateResults<T, P>(songsList: HTMLElement, ITEMS_PER_PAGE: number, mediaToLoad: T[], ListToPaginateId: P): void {
        const LEFT: HTMLElement = this.bindElementByClass("paginateSongResults > .left")
        const RIGHT: HTMLElement = this.bindElementByClass("paginateSongResults > .right")
        const PAGE: HTMLElement = this.bindElementByClass("paginateSongResults > .page")
        const PAGINATION_ELEMENT: HTMLElement = this.bindElementByClass("paginateSongResults")
        this.changeVisbilityOfGivenElement(PAGINATION_ELEMENT, true)


        if (ListToPaginateId == MediaEnum.Music) {
            console.log("muzyka do załadowania")
        }
        if (ListToPaginateId == MediaEnum.Sounds) {
            console.log("sounds do załadowania")
        }

        const SONG_LIST_LEN: number = mediaToLoad.length
        const PAGES: number = Math.ceil(SONG_LIST_LEN / ITEMS_PER_PAGE)
        let currentPage: number = 0

        PAGE.innerHTML = `${currentPage + 1} z ${PAGES}`
        this.createSongsView(songsList, currentPage * ITEMS_PER_PAGE, ITEMS_PER_PAGE, mediaToLoad as Songs[])
        RIGHT.addEventListener("click", () => {
            currentPage++
            if (currentPage > PAGES - 1) {
                currentPage--
                this.displayMessageAtTheTopOfTheScreen("Strona musi być w rangu", Logger.Error)
                return
            }
            if (SONG_LIST_LEN - (currentPage * ITEMS_PER_PAGE) < ITEMS_PER_PAGE) {
                this.createSongsView(songsList, currentPage * ITEMS_PER_PAGE, SONG_LIST_LEN - currentPage * ITEMS_PER_PAGE, mediaToLoad as Songs[])
            } else {
                this.createSongsView(songsList, currentPage * ITEMS_PER_PAGE, ITEMS_PER_PAGE, mediaToLoad as Songs[])
            }
            PAGE.innerHTML = `${currentPage + 1} z ${PAGES}`
        })
        LEFT.addEventListener("click", () => {
            currentPage--
            if (currentPage < 0) {
                currentPage++
                this.displayMessageAtTheTopOfTheScreen("Strona musi być w rangu", Logger.Error)
                return
            }
            this.createSongsView(songsList, currentPage * ITEMS_PER_PAGE, ITEMS_PER_PAGE, mediaToLoad as Songs[])
            PAGE.innerHTML = `${currentPage + 1} z ${PAGES}`
        })

    }
    private createSoundsView(songsList: HTMLElement, skipValue: number, itemsperPage: number, tempTabOfSounds: Sounds[]) {

    }
    private createSongsView(songsList: HTMLElement, skipValue: number, itemsperPage: number, tempTabOfSongs: Songs[]): void {
        songsList.innerHTML = ""
        for (let i = skipValue; i < skipValue + itemsperPage; i++) {
            const li: HTMLLIElement = document.createElement("li")
            const img: HTMLImageElement = document.createElement("img")
            const p: HTMLParagraphElement = document.createElement("p")
            img.src = tempTabOfSongs[i].pathToImage
            img.alt = "siema"
            p.innerHTML = tempTabOfSongs[i].description
            li.appendChild(img)
            li.appendChild(p)
            li.addEventListener("click", async () => {
                if (await media.setBackroundMusic(tempTabOfSongs[i].song)) {
                    this.displayMessageAtTheTopOfTheScreen(`now playing: ${tempTabOfSongs[i].name}`, Logger.Message)
                } else {
                    this.displayMessageAtTheTopOfTheScreen(`nie mozemy zagrać nuty: ${tempTabOfSongs[i].name}, coś poszło nie tak`, Logger.Error)
                }

                media.playMusic()
            })
            songsList.appendChild(li)
        }
    }
}
export const settings: Settings = new Settings()