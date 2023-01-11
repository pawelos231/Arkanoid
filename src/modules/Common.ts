import { HIDDEN } from "../constants/classNames";
const REGISTER_FORMS = "RegisterElement"
export class Common {
    elementId: HTMLElement;
    constructor(elementId: string){
        this.elementId = this.bindElementById(elementId)
        if (typeof elementId === "undefined" || elementId === null) return
    }
    bindElementById(elementToFindById: string): HTMLElement{

        const element: HTMLElement | null = document.getElementById(elementToFindById);

        if(!element) throw new Error(`nie znaleziono elementu ${elementToFindById}`)
    
        return element
    }
    bindElementByClass(elementToFindByClass: string): HTMLElement{

        const element: HTMLElement | null = document.documentElement.querySelector("." + elementToFindByClass);

        if(!element) throw new Error(`nie znaleziono elementu ${elementToFindByClass}`)
        
        return element
    }
    changeVisbilityOfGivenElement(element: HTMLElement, flag: boolean): void{
        flag ? 
        element?.classList.remove(HIDDEN) : 
        element?.classList.add(HIDDEN)
    }

    bindMultipleElements(elementsTobBind: string): NodeListOf<Element>{  
        const elements: NodeListOf<Element> = document.querySelectorAll("."+ elementsTobBind)
        
        if(!elements) throw new Error(`nie znaleziono elementu ${elementsTobBind}`)
        
        return elements
    }
    displayMessageAtTheTopOfTheScreen(message: string){
        console.log(message)
    }
    makeLoginPanelInvisible(): void{
        const RegisterElemement: HTMLElement | null = this.bindElementById(REGISTER_FORMS)
        this.changeVisbilityOfGivenElement(RegisterElemement, false)
    }
}
