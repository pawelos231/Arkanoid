import { Common } from "./Common";
import { Logger } from "../interfaces/HelperEnums";
class Settings extends Common {
    constructor() {
        super("levelSelect");
    }
    PaginateResults(MainList, ITEMS_PER_PAGE, mediaToLoad, createView, PaginationClass, ...ToggleEnums) {
        const CurrentEnum = ToggleEnums[0];
        const LEFT = this.bindElementByClass(`${PaginationClass}> .left`);
        const RIGHT = this.bindElementByClass(`${PaginationClass}> .right`);
        const PAGE = this.bindElementByClass(`${PaginationClass}> .page`);
        const PAGINATION_ELEMENT = this.bindElementByClass(PaginationClass);
        this.changeVisbilityOfGivenElement(PAGINATION_ELEMENT, true);
        const LIST_LEN = mediaToLoad.length;
        const PAGES = Math.ceil(LIST_LEN / ITEMS_PER_PAGE);
        let currentPage = 0;
        PAGE.innerHTML = `${currentPage + 1} z ${PAGES}`;
        createView(MainList, currentPage * ITEMS_PER_PAGE, ITEMS_PER_PAGE, mediaToLoad, CurrentEnum);
        RIGHT.addEventListener("click", () => {
            currentPage++;
            if (currentPage > PAGES - 1) {
                currentPage--;
                this.displayMessageAtTheTopOfTheScreen("Strona musi być w rangu", Logger.Error);
                return;
            }
            if (LIST_LEN - (currentPage * ITEMS_PER_PAGE) < ITEMS_PER_PAGE) {
                createView(MainList, currentPage * ITEMS_PER_PAGE, LIST_LEN - currentPage * ITEMS_PER_PAGE, mediaToLoad, CurrentEnum);
            }
            else {
                createView(MainList, currentPage * ITEMS_PER_PAGE, ITEMS_PER_PAGE, mediaToLoad, CurrentEnum);
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
            createView(MainList, currentPage * ITEMS_PER_PAGE, ITEMS_PER_PAGE, mediaToLoad, CurrentEnum);
            PAGE.innerHTML = `${currentPage + 1} z ${PAGES}`;
        });
    }
}
export const settings = new Settings();
