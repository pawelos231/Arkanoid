import { Common } from "./Common";
import { Logger } from "../interfaces/HelperEnums";
import { Sounds } from "../data/temporarySoundsData";
import { Songs } from "../data/temporarySongsData";
import { SettingsInterface } from "../interfaces/classesInterfaces";


class Settings extends Common implements SettingsInterface {
    constructor() {
        super("levelSelect")
    }
    public PaginateResults<T, F extends Function, V = undefined>(
     MainList: HTMLElement, 
     ITEMS_PER_PAGE: number, 
     mediaToLoad: T[], 
     createView: F, 
     PaginationClass: string, 
     ...ToggleEnums : (V extends string ? [string] : [undefined?])): void 
        {

            const CurrentEnum: string | undefined = ToggleEnums[0]

            const LEFT: HTMLElement = this.bindElementByClass(`${PaginationClass}> .left`)
            const RIGHT: HTMLElement = this.bindElementByClass(`${PaginationClass}> .right`)
            const PAGE: HTMLElement = this.bindElementByClass(`${PaginationClass}> .page`)
            const PAGINATION_ELEMENT: HTMLElement = this.bindElementByClass(PaginationClass)
            this.changeVisbilityOfGivenElement(PAGINATION_ELEMENT, true)

            const LIST_LEN: number = mediaToLoad.length
            const PAGES: number = Math.ceil(LIST_LEN / ITEMS_PER_PAGE)
            let currentPage: number = 0

            PAGE.innerHTML = `${currentPage + 1} z ${PAGES}`

            createView(MainList, currentPage * ITEMS_PER_PAGE, ITEMS_PER_PAGE, mediaToLoad, CurrentEnum)
        
            RIGHT.addEventListener("click", () => {
                currentPage++
                if (currentPage > PAGES - 1) {
                    currentPage--
                    this.displayMessageAtTheTopOfTheScreen("Strona musi być w rangu", Logger.Error)
                    return
                }
                if (LIST_LEN - (currentPage * ITEMS_PER_PAGE) < ITEMS_PER_PAGE) {

                    createView(MainList, currentPage * ITEMS_PER_PAGE, LIST_LEN - currentPage * ITEMS_PER_PAGE, mediaToLoad, CurrentEnum)

                } 
                else 
                {

                    createView(MainList, currentPage * ITEMS_PER_PAGE, ITEMS_PER_PAGE, mediaToLoad, CurrentEnum)

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
                createView(MainList, currentPage * ITEMS_PER_PAGE, ITEMS_PER_PAGE, mediaToLoad, CurrentEnum)
                PAGE.innerHTML = `${currentPage + 1} z ${PAGES}`
            })

        }

}

export const settings: Settings = new Settings()