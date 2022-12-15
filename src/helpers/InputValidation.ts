import { Common } from "../modules/Common"



const INVALID: string = "invalid"

export class Validator extends Common {
    input: string
    constructor(input: string){
        super("RegisterElement")
        this.input = input
    }
    checkPasswordValidation(){
        const elements: NodeListOf<Element> | null = this.bindMultipleElements(this.input)
        elements.forEach((item)=>{
            item.addEventListener("keyup", (e: any)=>{
                const value: string = e.target.value
                const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
                ;
                const checked = value.match(regex)
                console.log(checked)
                if(checked == null){
                    item.classList.add(INVALID)
                }else{
                    item.classList.remove(INVALID)
                }
            })
        })
    }
}
