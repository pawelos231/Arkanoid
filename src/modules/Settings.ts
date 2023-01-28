import { Common } from "./Common";
import { Logger } from "../interfaces/HelperEnums";
import { media } from "./Media";
import { MediaEnum } from "../interfaces/HelperEnums";
import { Sounds } from "../data/temporarySoundsData";
import { Songs, tempTabOfSongs } from "../data/temporarySongsData";
class Settings extends Common {
    constructor() {
        super("levelSelect")
    }
    public PaginateResults<T, P>(songsList: HTMLElement, ITEMS_PER_PAGE: number, mediaToLoad: T[], ListToPaginateId: P): void {
        console.log(ListToPaginateId)
        const LEFT: HTMLElement = this.bindElementByClass("paginateSongResults > .left")
        const RIGHT: HTMLElement = this.bindElementByClass("paginateSongResults > .right")
        const PAGE: HTMLElement = this.bindElementByClass("paginateSongResults > .page")
        const PAGINATION_ELEMENT: HTMLElement = this.bindElementByClass("paginateSongResults")
        this.changeVisbilityOfGivenElement(PAGINATION_ELEMENT, true)


        const SONG_LIST_LEN: number = mediaToLoad.length
        const PAGES: number = Math.ceil(SONG_LIST_LEN / ITEMS_PER_PAGE)
        let currentPage: number = 0

        PAGE.innerHTML = `${currentPage + 1} z ${PAGES}`

        this.createView(songsList, currentPage * ITEMS_PER_PAGE, ITEMS_PER_PAGE, mediaToLoad as Songs[] & Sounds[], ListToPaginateId as string)

        RIGHT.addEventListener("click", () => {
            currentPage++
            if (currentPage > PAGES - 1) {
                currentPage--
                this.displayMessageAtTheTopOfTheScreen("Strona musi być w rangu", Logger.Error)
                return
            }
            if (SONG_LIST_LEN - (currentPage * ITEMS_PER_PAGE) < ITEMS_PER_PAGE) {

                this.createView(songsList, currentPage * ITEMS_PER_PAGE, SONG_LIST_LEN - currentPage * ITEMS_PER_PAGE, mediaToLoad as Songs[] & Sounds[], ListToPaginateId as MediaEnum)

            } else {

                this.createView(songsList, currentPage * ITEMS_PER_PAGE, ITEMS_PER_PAGE, mediaToLoad as Songs[] & Sounds[], ListToPaginateId as string)

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
            this.createView(songsList, currentPage * ITEMS_PER_PAGE, ITEMS_PER_PAGE, mediaToLoad as Songs[] & Sounds[], ListToPaginateId as string)
            PAGE.innerHTML = `${currentPage + 1} z ${PAGES}`
        })

    }

    private createView(songsList: HTMLElement, skipValue: number, itemsperPage: number, tempTabOfMusic: Songs[] & Sounds[], ListToPaginateId: string): void {
        songsList.innerHTML = ""

        if (ListToPaginateId == MediaEnum.Music) {
            for (let i = skipValue; i < skipValue + itemsperPage; i++) {
                const li: HTMLLIElement = document.createElement("li")
                const img: HTMLImageElement = document.createElement("img")
                const p: HTMLParagraphElement = document.createElement("p")
                img.src = tempTabOfMusic[i].pathToImage
                img.alt = `Piosenka o nazwie  ${tempTabOfMusic[i].song}`
                p.innerHTML = tempTabOfMusic[i].description
                li.appendChild(img)
                li.appendChild(p)
                li.addEventListener("click", async () => {
                    if (await media.setBackroundMusic(tempTabOfMusic[i].song)) {
                        this.displayMessageAtTheTopOfTheScreen(`Ustawiono piosenkę o nazwie: ${tempTabOfMusic[i].name}`, Logger.Message)
                    } else {
                        this.displayMessageAtTheTopOfTheScreen(`nie mozemy zagrać nuty: ${tempTabOfMusic[i].name}, coś poszło nie tak`, Logger.Error)
                        throw new Error("nie mozemy zagrać tej piosenki")
                    }

                    media.playMusic()
                })
                songsList.appendChild(li)
            }
        } else if (ListToPaginateId == MediaEnum.Sounds) {
            for (let i = skipValue; i < skipValue + itemsperPage; i++) {
                const li: HTMLLIElement = document.createElement("li")
                const img: HTMLImageElement = document.createElement("img")
                const p: HTMLParagraphElement = document.createElement("p")
                img.src = tempTabOfMusic[i].pathToImage
                img.alt = `Dźwięk o nazwie  ${tempTabOfMusic[i].sound}`
                p.innerHTML = tempTabOfMusic[i].description
                li.appendChild(img)
                li.appendChild(p)
                li.addEventListener("click", async () => {
                    if (await media.setSound(tempTabOfMusic[i].sound)) {
                        this.displayMessageAtTheTopOfTheScreen(`Ustawiono dźwięk o nazwie: ${tempTabOfSongs[i].name}`, Logger.Message)
                    } else {
                        this.displayMessageAtTheTopOfTheScreen(`nie wczytać dźwięku: ${tempTabOfMusic[i].name}, coś poszło nie tak`, Logger.Error)
                        throw new Error("nie mozemy wczytać tego dźwięku")
                    }
                    console.log("media spawn sound")
                    media.spawnSound()
                })
                songsList.appendChild(li)
            }
        }
    }
}
export const settings: Settings = new Settings()