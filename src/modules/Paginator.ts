import { Common } from "./Common";
import { Logger } from "../interfaces/HelperEnums";
import { PaginatorInterface } from "../interfaces/classesInterfaces";
import { PaginatorPages } from "../interfaces/HelperEnums";



export class Paginator<T, F extends Function> extends Common implements PaginatorInterface<T, F> {

    private readonly createView: F
    private ITEMS_PER_PAGE: number
    private readonly mediaToLoad: T[]
    private PaginationClass: string
    private readonly MainList: HTMLElement
    private currentPage: number
    private LIST_LEN: number
    private CurrentEnum: unknown

    constructor(
        MainList: HTMLElement, 
        ITEMS_PER_PAGE: number,  
        mediaToLoad: T[], 
        createView: F,  
        PaginationClass: string) {

            super()
            
            this.createView = createView
            this.ITEMS_PER_PAGE = ITEMS_PER_PAGE
            this.mediaToLoad = mediaToLoad
            this.PaginationClass = PaginationClass
            this.MainList = MainList
            this.currentPage = 0
            this.LIST_LEN = 0
            this.CurrentEnum = undefined
            
    }

    private RenderProperVisualizer(caseValue: PaginatorPages): F | void{

        if(caseValue === PaginatorPages.LastNotFullPage){
            return this.createView(
                this.MainList, 
                this.currentPage * this.ITEMS_PER_PAGE, 
                this.LIST_LEN - this.currentPage * this.ITEMS_PER_PAGE, 
                this.mediaToLoad, 
                this.CurrentEnum)

        } else if(caseValue === PaginatorPages.NormalPage){
            return this.createView(
                this.MainList, 
                this.currentPage * this.ITEMS_PER_PAGE, 
                this.ITEMS_PER_PAGE, 
                this.mediaToLoad, 
                this.CurrentEnum)
        } 
        else {
            throw new Error("zła wartość przekazana jako warunek renderowania")
        }
    

    }

    public PaginateResults<V = undefined>(
     ...ToggleCategoryEnums : 
     (V extends string ? [string] : [undefined?])): void 
        {
            this.CurrentEnum = ToggleCategoryEnums[0]

            const LEFT: HTMLElement = this.bindElementByClass(`${this.PaginationClass}> .left`)

            const RIGHT: HTMLElement = this.bindElementByClass(`${this.PaginationClass}> .right`)

            const PAGE: HTMLElement = this.bindElementByClass(`${this.PaginationClass}> .page`)

            const PAGINATION_ELEMENT: HTMLElement = this.bindElementByClass(this.PaginationClass)

            this.changeVisbilityOfGivenElement(PAGINATION_ELEMENT, true)

            this.LIST_LEN = this.mediaToLoad.length
            const PAGES: number = Math.ceil(this.LIST_LEN / this.ITEMS_PER_PAGE)
            

            PAGE.innerHTML = `${this.currentPage + 1} z ${PAGES}`

            this.RenderProperVisualizer(PaginatorPages.NormalPage)
        
            RIGHT.addEventListener("click", () => {
                this.currentPage++

                if (this.currentPage > PAGES - 1) {
                    this.currentPage--
                    this.displayMessageAtTheTopOfTheScreen(
                        "Strona musi być w rangu", 
                        Logger.Error)
                    return
                }
                
                if (this.LIST_LEN - 
                (this.currentPage * this.ITEMS_PER_PAGE) < 
                this.ITEMS_PER_PAGE) {
                    this.RenderProperVisualizer(PaginatorPages.LastNotFullPage)
                } 
                else 
                {
                    this.RenderProperVisualizer(PaginatorPages.NormalPage)
                }

                PAGE.innerHTML = `${this.currentPage + 1} z ${PAGES}`
            })

            LEFT.addEventListener("click", () => {
                this.currentPage--
                if (this.currentPage < 0) {
                    this.currentPage++
                    this.displayMessageAtTheTopOfTheScreen(
                        "Strona musi być w rangu", 
                        Logger.Error)
                    return
                }

                this.RenderProperVisualizer(PaginatorPages.NormalPage)

                PAGE.innerHTML = `${this.currentPage + 1} z ${PAGES}`
            })

        }

}

