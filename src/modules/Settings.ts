import { Common } from "./Common";
import { Logger } from "../interfaces/HelperEnums";
import { media } from "./Media";
import { MediaEnum } from "../interfaces/HelperEnums";
import { Sounds } from "../data/temporarySoundsData";
import { Songs, tempTabOfSongs } from "../data/temporarySongsData";

interface SettingsInterface {
    PaginateResults: <T>(arg0: HTMLElement, arg1: number, arg2: T[], arg3: string) => void,
}

class Settings extends Common implements SettingsInterface {
    constructor() {
        super("levelSelect")
    }
    public PaginateResults<T>(songsList: HTMLElement, ITEMS_PER_PAGE: number, mediaToLoad: T[], ListToPaginateId: string): void {
        const LEFT: HTMLElement = this.bindElementByClass("paginateSongResults > .left")
        const RIGHT: HTMLElement = this.bindElementByClass("paginateSongResults > .right")
        const PAGE: HTMLElement = this.bindElementByClass("paginateSongResults > .page")
        const PAGINATION_ELEMENT: HTMLElement = this.bindElementByClass("paginateSongResults")
        this.changeVisbilityOfGivenElement(PAGINATION_ELEMENT, true)


        const SONG_LIST_LEN: number = mediaToLoad.length
        const PAGES: number = Math.ceil(SONG_LIST_LEN / ITEMS_PER_PAGE)
        let currentPage: number = 0

        PAGE.innerHTML = `${currentPage + 1} z ${PAGES}`

        this.createView(songsList, currentPage * ITEMS_PER_PAGE, ITEMS_PER_PAGE, mediaToLoad as Sounds[] & Songs[], ListToPaginateId as string)

        RIGHT.addEventListener("click", () => {
            currentPage++
            if (currentPage > PAGES - 1) {
                currentPage--
                this.displayMessageAtTheTopOfTheScreen("Strona musi być w rangu", Logger.Error)
                return
            }
            if (SONG_LIST_LEN - (currentPage * ITEMS_PER_PAGE) < ITEMS_PER_PAGE) {

                this.createView(songsList, currentPage * ITEMS_PER_PAGE, SONG_LIST_LEN - currentPage * ITEMS_PER_PAGE, mediaToLoad as Songs[] & Sounds[], ListToPaginateId)

            } else {

                this.createView(songsList, currentPage * ITEMS_PER_PAGE, ITEMS_PER_PAGE, mediaToLoad as Songs[] & Sounds[], ListToPaginateId)

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
            this.createView(songsList, currentPage * ITEMS_PER_PAGE, ITEMS_PER_PAGE, mediaToLoad as Songs[] & Sounds[], ListToPaginateId)
            PAGE.innerHTML = `${currentPage + 1} z ${PAGES}`
        })

    }

    private createView(songsList: HTMLElement, skipValue: number, itemsperPage: number, tempTabOfMusic: Sounds[] & Songs[], ListToPaginateId: string): void {
        songsList.innerHTML = ""

        for (let i = skipValue; i < skipValue + itemsperPage; i++) {
            const li: HTMLLIElement = document.createElement("li")
            const img: HTMLImageElement = document.createElement("img")
            const p: HTMLParagraphElement = document.createElement("p")
            img.src = tempTabOfMusic[i].pathToImage
            if (ListToPaginateId == MediaEnum.Music) {
                img.alt = `Piosenka o nazwie  ${tempTabOfMusic[i].song}`
            } else if (ListToPaginateId == MediaEnum.Music) {
                img.alt = `Dźwięk o nazwie  ${tempTabOfMusic[i].sound}`
            }
            p.innerHTML = tempTabOfMusic[i].description
            li.appendChild(img)
            li.appendChild(p)
            if (ListToPaginateId == MediaEnum.Music) {
                li.addEventListener("click", async () => {
                    if (await media.setBackroundMusic(tempTabOfMusic[i].song)) {
                        this.displayMessageAtTheTopOfTheScreen(`Ustawiono piosenkę o nazwie: ${tempTabOfMusic[i].name}`, Logger.Message)
                    } else {
                        this.displayMessageAtTheTopOfTheScreen(`nie mozemy zagrać nuty: ${tempTabOfMusic[i].name}, coś poszło nie tak`, Logger.Error)
                        throw new Error("nie mozemy zagrać tej piosenki")
                    }

                    media.playMusic()
                })
            } else if (ListToPaginateId == MediaEnum.Sounds) {
                li.addEventListener("click", async () => {
                    if (await media.setSound(tempTabOfMusic[i].sound)) {
                        this.displayMessageAtTheTopOfTheScreen(`Ustawiono dźwięk o nazwie: ${tempTabOfSongs[i].name}`, Logger.Message)
                    } else {
                        this.displayMessageAtTheTopOfTheScreen(`nie wczytać dźwięku: ${tempTabOfMusic[i].name}, coś poszło nie tak`, Logger.Error)
                        throw new Error("nie mozemy wczytać tego dźwięku")
                    }
                    media.spawnSoundWhenHitPaddle()
                })
            }
            songsList.appendChild(li)

        }
    }
}

export const settings: Settings = new Settings()