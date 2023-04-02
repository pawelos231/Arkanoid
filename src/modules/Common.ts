import { HIDDEN } from "../constants/classNames";
import { sealed } from "../decorators/seal";
import { Logger } from "../interfaces/HelperEnums";
const REGISTER_FORMS = "RegisterElement"


type CommonElementIdType<T> = (T extends string ? HTMLElement : undefined)

@sealed
export class Common<T = undefined> {

    protected elementId: CommonElementIdType<T>;
    protected constructor(...elementId: (T extends string ? [string] : [undefined?])) { 
        if(elementId && elementId[0]) {
            this.elementId = 
            this.bindElementById(elementId[0]) as CommonElementIdType<T>
        }
        else {
            this.elementId = undefined as CommonElementIdType<T>
        } 
    }

    protected bindElementById(elementToFindById: string): HTMLElement {

        const element: HTMLElement | null = document.getElementById(elementToFindById);

        if (!element) throw new Error(`nie znaleziono elementu ${elementToFindById}`)

        return element
    }

    protected bindElementByClass(elementToFindByClass: string): HTMLElement {

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

    protected displayMessageAtTheTopOfTheScreen(message: string, status: number) {
        if (status > 2 || status < 0) throw new Error("nieporawny status wiadomości, wprowadź wartości z enuma Errors")

        const messageNode: HTMLElement = this.bindElementByClass("MESSAGE")
        if (Logger.Error == status) {
            messageNode.style.color = "red"
        }
        if (status == Logger.Message) {
            messageNode.style.color = "green"
        }
        if (status == Logger.Warn){
            messageNode.style.color = "orange"
        }


        this.changeVisbilityOfGivenElement(messageNode, true)
        setTimeout(() => {
            this.changeVisbilityOfGivenElement(messageNode, false)
        }, 1500)
        messageNode.textContent = message
    }

    protected makeLoginPanelInvisible(): void {
        const RegisterElemement: HTMLElement | null = this.bindElementById(REGISTER_FORMS)
        this.changeVisbilityOfGivenElement(RegisterElemement, false)
    }
}
