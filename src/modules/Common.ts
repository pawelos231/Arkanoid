import { HIDDEN } from "../constants/classNames";
import { sealed } from "../decorators/seal";
const REGISTER_FORMS = "RegisterElement"
@sealed
export class Common {
    elementId: HTMLElement;
    protected constructor(elementId: string) {
        this.elementId = this.bindElementById(elementId)
        if (typeof elementId === "undefined" || elementId === null) return
    }
    protected bindElementById(elementToFindById: string): HTMLElement {

        const element: HTMLElement | null = document.getElementById(elementToFindById);

        if (!element) throw new Error(`nie znaleziono elementu ${elementToFindById}`)

        return element
    }
    protected  bindElementByClass(elementToFindByClass: string): HTMLElement {

        const element: HTMLElement | null = document.documentElement.querySelector("." + elementToFindByClass);

        if (!element) throw new Error(`nie znaleziono elementu ${elementToFindByClass}`)

        return element
    }
    protected changeVisbilityOfGivenElement(element: HTMLElement, flag: boolean): void {
        flag ?
            element?.classList.remove(HIDDEN) :
            element?.classList.add(HIDDEN)
    }

    protected bindMultipleElements(elementsTobBind: string): NodeListOf<Element> {
        const elements: NodeListOf<Element> = document.querySelectorAll("." + elementsTobBind)

        if (!elements) throw new Error(`nie znaleziono elementu ${elementsTobBind}`)

        return elements
    }
    protected static displayMessageAtTheTopOfTheScreen(message: string) {
        console.log(message)
    }
    protected makeLoginPanelInvisible(): void {
        const RegisterElemement: HTMLElement | null = this.bindElementById(REGISTER_FORMS)
        this.changeVisbilityOfGivenElement(RegisterElemement, false)
    }
}
