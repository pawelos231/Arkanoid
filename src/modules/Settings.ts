import { Common } from "./Common";
import { tempTabOfSongs } from '../data/temporarySongsData.js'
import { Logger } from "../interfaces/Logger";
import { media } from "./Media";
class Settings extends Common {
    constructor() {
        super("levelSelect")
    }
    public PaginateSongResults(songsList: HTMLElement): void {
        const LEFT: Element = this.bindElementByClass("paginateSongResults > .left")
        const RIGHT: Element = this.bindElementByClass("paginateSongResults > .right")
        const PAGE: Element = this.bindElementByClass("paginateSongResults > .page")
        const SONG_LIST_LEN: number = tempTabOfSongs.length
        const ITEMS_PER_PAGE = 5
        const PAGES: number = Math.ceil(SONG_LIST_LEN / ITEMS_PER_PAGE)
        console.log(PAGES)
        let currentPage = 0

        PAGE.innerHTML = `${currentPage + 1} z ${PAGES}`
        this.createSongsView(songsList, currentPage * ITEMS_PER_PAGE, ITEMS_PER_PAGE)
        RIGHT.addEventListener("click", () => {
            currentPage++
            if (currentPage > PAGES - 1) {
                currentPage--
                this.displayMessageAtTheTopOfTheScreen("Strona musi być w rangu", Logger.Error)
                return
            }
            if (SONG_LIST_LEN - (currentPage * ITEMS_PER_PAGE) < ITEMS_PER_PAGE) {
                this.createSongsView(songsList, currentPage * ITEMS_PER_PAGE, SONG_LIST_LEN - currentPage * ITEMS_PER_PAGE)
            } else {
                this.createSongsView(songsList, currentPage * ITEMS_PER_PAGE, ITEMS_PER_PAGE)
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
            this.createSongsView(songsList, currentPage * ITEMS_PER_PAGE, ITEMS_PER_PAGE)
            PAGE.innerHTML = `${currentPage + 1} z ${PAGES}`
        })

    }

    private createSongsView(songsList: HTMLElement, skipValue: number, itemsperPage: number): void {
        songsList.innerHTML = ""
        for (let i = skipValue; i < skipValue + itemsperPage; i++) {
            let li = document.createElement("li")
            let img = document.createElement("img")
            let p = document.createElement("p")
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