import { Common } from "../modules/Common"



const INVALID: string = "Invalid"

export class Validator extends Common {
    input: string
    constructor(input: string){
        super("RegisterElement")
        this.input = input
    }
    checkPasswordValidation(){
        const element:  HTMLElement | null = this.bindElementByClass(this.input)
        element.addEventListener("click", ()=>{
            console.log("siema")
        })
    }
}
