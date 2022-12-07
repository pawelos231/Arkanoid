const HIDDEN: string = "hidden"
export class Common {
    elementId: HTMLElement | null;
    constructor(elementId: string){
        this.elementId = this.bindElementById(elementId)
        if (typeof elementId === "undefined") {
            return;
          }
    }
    bindElementById(elementToFindById: string): HTMLElement{
        const element: HTMLElement | null = document.getElementById(elementToFindById);
        console.log(element)
        if(!element){
            throw new Error(`nie znaleziono elementu ${elementToFindById}`)
        }
        return element
    }
    bindElementByClass(elementToFindByClass: string): HTMLElement{
        const element: HTMLElement | null = document.documentElement.querySelector(elementToFindByClass);
        console.log(element)
        if(!element){
            throw new Error(`nie znaleziono elementu ${elementToFindByClass}`)
        }
        return element
    }
    changeVisbilityOfGivenElement(element: HTMLElement | null, flag: boolean): void{
        flag ? 
        element?.classList.remove(HIDDEN) : 
        element?.classList.add(HIDDEN)
    }
}
