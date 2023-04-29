import { Common } from "./Common";
import { Logger } from "../interfaces/HelperEnums";
import { PaginatorInterface } from "../interfaces/classesInterfaces";
import { PaginatorPages } from "../interfaces/HelperEnums";
import { EventListener } from "../helpers/Events/EventListener";


export class Paginator<T, F extends Function> extends Common implements PaginatorInterface<T, F> {

    private readonly createView: F
    private ITEMS_PER_PAGE: number
    private readonly mediaToLoad: T[]
    private PaginationClass: string
    private readonly MainList: HTMLElement
    private currentPage: number
    private LIST_LEN: number
    private CurrentEnum: unknown
    private EventListenerInstance: EventListener 
    private RightIterator: HTMLElement | null
    private LeftIterator: HTMLElement | null
    private PAGES: number
    private PAGE_CONTAINER: HTMLElement | null

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
            this.EventListenerInstance = new EventListener()
            this.RightIterator = null
            this.LeftIterator = null
            this.PAGES = 0
            this.PAGE_CONTAINER = null
            
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



    private incrementRight(PAGES: number, PAGE: HTMLElement) {
        this.currentPage++
        console.log(this.currentPage, this.CurrentEnum)
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
    }

    private incrementLeft(PAGES: number, PAGE: HTMLElement){
        this.currentPage--
        console.log(this.currentPage, this.CurrentEnum)
        if (this.currentPage < 0) {
            this.currentPage++
            this.displayMessageAtTheTopOfTheScreen(
                "Strona musi być w rangu", 
                Logger.Error)
            return
        }

        this.RenderProperVisualizer(PaginatorPages.NormalPage)

        PAGE.innerHTML = `${this.currentPage + 1} z ${PAGES}`
    }


    public cleanupListeneres(): void {
        this.currentPage = 0

        this.EventListenerInstance.removeListenersOnGivenNode(this.RightIterator as HTMLElement, "click")

        this.EventListenerInstance.removeListenersOnGivenNode(this.LeftIterator as HTMLElement, "click")
    }

    public PaginateResults<V = undefined>(
     ...ToggleCategoryEnums : 
     (V extends string ? [string] : [undefined?])) 
        {   

        
            this.CurrentEnum = ToggleCategoryEnums[0]

            this.LeftIterator 
            = this.bindElementByClass(`${this.PaginationClass}> .left`)

            this.RightIterator 
            = this.bindElementByClass(`${this.PaginationClass}> .right`)

            this.PAGE_CONTAINER 
            = this.bindElementByClass(`${this.PaginationClass}> .page`)

            const PAGINATION_ELEMENT: HTMLElement 
            = this.bindElementByClass(this.PaginationClass)

            this.changeVisbilityOfGivenElement(PAGINATION_ELEMENT, true)

            this.LIST_LEN = this.mediaToLoad.length
            this.PAGES = Math.ceil(this.LIST_LEN / this.ITEMS_PER_PAGE)
            

            this.PAGE_CONTAINER.innerHTML 
            = `${this.currentPage + 1} z ${this.PAGES}`

            this.RenderProperVisualizer(PaginatorPages.NormalPage)
        
            
            const incrementRight = (): void => this.incrementRight(this.PAGES, this.PAGE_CONTAINER as HTMLElement)

            const incrementLeft = (): void => this.incrementLeft(this.PAGES, this.PAGE_CONTAINER as HTMLElement)


            this.EventListenerInstance.add(this.RightIterator, 
                "click", incrementRight)
            
            this.EventListenerInstance.add(this.LeftIterator, 
                "click", incrementLeft)
                

        }

}

