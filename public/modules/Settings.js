import { Common } from "./Common";
import { Logger } from "../interfaces/HelperEnums";
import { PaginatorPages } from "../interfaces/HelperEnums";
export class Paginator extends Common {
    constructor(MainList, ITEMS_PER_PAGE, mediaToLoad, createView, PaginationClass) {
        super("levelSelect");
        this.createView = createView;
        this.ITEMS_PER_PAGE = ITEMS_PER_PAGE;
        this.mediaToLoad = mediaToLoad;
        this.PaginationClass = PaginationClass;
        this.MainList = MainList;
        this.currentPage = 0;
        this.LIST_LEN = 0;
        this.CurrentEnum = undefined;
    }
    RenderProperVisualizer(caseValue) {
        if (caseValue === PaginatorPages.LastNotFullPage) {
            return this.createView(this.MainList, this.currentPage * this.ITEMS_PER_PAGE, this.LIST_LEN - this.currentPage * this.ITEMS_PER_PAGE, this.mediaToLoad, this.CurrentEnum);
        }
        else if (caseValue === PaginatorPages.NormalPage) {
            return this.createView(this.MainList, this.currentPage * this.ITEMS_PER_PAGE, this.ITEMS_PER_PAGE, this.mediaToLoad, this.CurrentEnum);
        }
        else {
            throw new Error("zła wartość przekazana jako warunek renderowania");
        }
    }
    PaginateResults(...ToggleCategoryEnums) {
        this.CurrentEnum = ToggleCategoryEnums[0];
        const LEFT = this.bindElementByClass(`${this.PaginationClass}> .left`);
        const RIGHT = this.bindElementByClass(`${this.PaginationClass}> .right`);
        const PAGE = this.bindElementByClass(`${this.PaginationClass}> .page`);
        const PAGINATION_ELEMENT = this.bindElementByClass(this.PaginationClass);
        this.changeVisbilityOfGivenElement(PAGINATION_ELEMENT, true);
        this.LIST_LEN = this.mediaToLoad.length;
        const PAGES = Math.ceil(this.LIST_LEN / this.ITEMS_PER_PAGE);
        PAGE.innerHTML = `${this.currentPage + 1} z ${PAGES}`;
        this.RenderProperVisualizer(PaginatorPages.NormalPage);
        RIGHT.addEventListener("click", () => {
            this.currentPage++;
            if (this.currentPage > PAGES - 1) {
                this.currentPage--;
                this.displayMessageAtTheTopOfTheScreen("Strona musi być w rangu", Logger.Error);
                return;
            }
            if (this.LIST_LEN -
                (this.currentPage * this.ITEMS_PER_PAGE) <
                this.ITEMS_PER_PAGE) {
                this.RenderProperVisualizer(PaginatorPages.LastNotFullPage);
            }
            else {
                this.RenderProperVisualizer(PaginatorPages.NormalPage);
            }
            PAGE.innerHTML = `${this.currentPage + 1} z ${PAGES}`;
        });
        LEFT.addEventListener("click", () => {
            this.currentPage--;
            if (this.currentPage < 0) {
                this.currentPage++;
                this.displayMessageAtTheTopOfTheScreen("Strona musi być w rangu", Logger.Error);
                return;
            }
            this.RenderProperVisualizer(PaginatorPages.NormalPage);
            PAGE.innerHTML = `${this.currentPage + 1} z ${PAGES}`;
        });
    }
}
