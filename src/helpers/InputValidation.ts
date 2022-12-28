import { Common } from "../modules/Common"
import { INVALID } from "../constants/classNames"

export class Validator extends Common {
    input: string
    value: string | undefined
    constructor(input: string, value?: string){
        super("RegisterElement")
        this.input = input
        this.value = value
    }
    DisplayBadPassword(): void{
        const elements: NodeListOf<Element> | null = this.bindMultipleElements(this.input)

        elements.forEach((item: Element)=>{
            item.addEventListener("keyup", (e: any)=>{
                const value: string = e.target.value

                const regex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;

                const checked: RegExpMatchArray | null = value.match(regex)
                
                if(checked == null){
                    item.classList.add(INVALID)
                }
                else{
                    item.classList.remove(INVALID)
                }

            })
        })
    }

    CheckPass(): boolean{
        if(!this.value) return false
     
        const regex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;

        const checked: RegExpMatchArray | null = this.value.match(regex)

        if(checked !== null) return true

        return false
        

    }
}
