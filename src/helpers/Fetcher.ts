import { Common } from "../modules/Common";
const REGISTER_FORMS: string = "RegisterElement"

export class Fetcher {
    formElement: HTMLElement | null
    constructor(formElement: HTMLElement | null){
        this.formElement = formElement
    }
    SendData(){
        if(this.formElement !== null){
            this.formElement.addEventListener("submit", (e)=>{
                e.preventDefault()
                console.log("used")
            })
        }
    }
}