import { Common } from "../modules/Common";
import { Validator } from "./InputValidation";
import { HIDDEN } from "../constants/classNames";

const PASSWORD_INPUT_ELEMENT: string = "password"

export class Fetcher extends Common {
    formElement: HTMLElement | null
    constructor(formElement: HTMLElement | null){
        super("form")
        this.formElement = formElement
    }
    SendData(): void{
        let newForm = this.elementId as HTMLFormElement | undefined
        if(this.formElement !== null){
            this.formElement.addEventListener("submit", async (e: SubmitEvent)=>{
                e.preventDefault()
                const formData: FormData = new FormData(newForm);
                for (const [key, value] of formData) {

                    if(key === "haslo")
                    {
                        const elements: NodeListOf<Element> | null = this.bindMultipleElements(PASSWORD_INPUT_ELEMENT)
                        console.log(elements)
                        elements.forEach((item: any)=>{
                            //check if parent element contains hidden class if yes then proceed to validate further
                            const change: boolean = item.parentElement.classList.contains(HIDDEN)
                            if(!change){
                                const validator: Validator = new Validator(PASSWORD_INPUT_ELEMENT, item.value)
                                const value = validator.CheckPassword()
                                console.log(value)
                            }
                        })
                    }
                    
                    if(value === "")
                    {
                        throw new Error("Musisz wprowadzić wartości !")
                    }
                  } 
            })
        }
    }
    FetchData(url: string){

    }
}