import { Common } from "./Common";
import { Logger } from "../interfaces/HelperEnums";
import { Sounds } from "../data/temporarySoundsData";
import { Songs } from "../data/temporarySongsData";

interface SettingsInterface {
    PaginateResults: <T, F extends Function>(arg0: HTMLElement, arg1: number, arg2: T[], arg3: string, arg4: F, arg5: string) => void,
}

class Settings extends Common implements SettingsInterface {
    constructor() {
        super("levelSelect")
    }
    public PaginateResults<T, F extends Function>(songsList: HTMLElement, ITEMS_PER_PAGE: number, mediaToLoad: T[], ListToPaginateId: string, createView: F, PaginationClass: string): void {
        const LEFT: HTMLElement = this.bindElementByClass(`${PaginationClass}> .left`)
        const RIGHT: HTMLElement = this.bindElementByClass(`${PaginationClass}> .right`)
        const PAGE: HTMLElement = this.bindElementByClass(`${PaginationClass}> .page`)
        const PAGINATION_ELEMENT: HTMLElement = this.bindElementByClass(PaginationClass)
        this.changeVisbilityOfGivenElement(PAGINATION_ELEMENT, true)

        const LIST_LEN: number = mediaToLoad.length
        const PAGES: number = Math.ceil(LIST_LEN / ITEMS_PER_PAGE)
        let currentPage: number = 0

        PAGE.innerHTML = `${currentPage + 1} z ${PAGES}`

        createView(songsList, currentPage * ITEMS_PER_PAGE, ITEMS_PER_PAGE, mediaToLoad as Sounds[] & Songs[], ListToPaginateId)

        RIGHT.addEventListener("click", () => {
            currentPage++
            if (currentPage > PAGES - 1) {
                currentPage--
                this.displayMessageAtTheTopOfTheScreen("Strona musi być w rangu", Logger.Error)
                return
            }
            if (LIST_LEN - (currentPage * ITEMS_PER_PAGE) < ITEMS_PER_PAGE) {

                createView(songsList, currentPage * ITEMS_PER_PAGE, LIST_LEN - currentPage * ITEMS_PER_PAGE, mediaToLoad as Songs[] & Sounds[], ListToPaginateId)

            } else {

                createView(songsList, currentPage * ITEMS_PER_PAGE, ITEMS_PER_PAGE, mediaToLoad as Songs[] & Sounds[], ListToPaginateId)

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
            createView(songsList, currentPage * ITEMS_PER_PAGE, ITEMS_PER_PAGE, mediaToLoad as Songs[] & Sounds[], ListToPaginateId)
            PAGE.innerHTML = `${currentPage + 1} z ${PAGES}`
        })

    }

}

export const settings: Settings = new Settings()