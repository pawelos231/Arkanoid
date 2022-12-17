import { Common } from "../modules/Common";
import { Validator } from "./InputValidation";
import { HIDDEN } from "../constants/classNames";
import { Login } from "../interfaces/LoginData";
import {DEVELEPOMENT_URL, POST, GET} from '../constants/Fetchers'


const PASSWORD_INPUT_ELEMENT = "password"
const ELEMENT_DOES_NOT_EXIST = "element nie istnieje"
const PASSWORD = "haslo"
const MUST_PUT_VALID_PASS = "Musisz wprowadzić poprawne hasło !"
const MUST_PUT_VALID_VAL = "Musisz wprowadzić wartości !"

export class Fetcher extends Common {
    formElement: HTMLElement | null
    constructor(formElement: HTMLElement | null){
        super("form")
        this.formElement = formElement
    }
    async sendDataToBackend(form: FormData){
        let obj: any = {}
        for(const [key, value] of form){
            obj[key] = value
        }
        await fetch(`${DEVELEPOMENT_URL}/register`, {
            method: POST,
            body: JSON.stringify(obj)
        })
        .then(res => res.json())
        .then(data=> console.log(data))

    }

    SendData(): void{
        let newForm = this.elementId as HTMLFormElement | undefined
        if(this.formElement == null) throw new Error(ELEMENT_DOES_NOT_EXIST)
        this.formElement.addEventListener("submit", async (e: SubmitEvent)=>{
             e.preventDefault()
             const formData: FormData = new FormData(newForm);

             for (const [key, value] of formData) {
                if(key !== PASSWORD) continue
                
                
                const elements: NodeListOf<Element> | null = this.bindMultipleElements(PASSWORD_INPUT_ELEMENT)
                elements.forEach((item: any)=>{
                    //check if parent element contains hidden class if yes then proceed to validate further
                    const change: boolean = item.parentElement.classList.contains(HIDDEN);

                    //if yes then return, there is no need to validate
                    if(change) return;
                            
                    const validator: Validator = new Validator(PASSWORD_INPUT_ELEMENT, item.value)
                    const returnValue: boolean = validator.CheckPass()

                    if(returnValue) this.sendDataToBackend(formData)
                    else throw new Error(MUST_PUT_VALID_PASS) 
     
                })

                if(value === "") throw new Error(MUST_PUT_VALID_VAL)           
            }
            })
        
    }
    FetchData(url: string){

    }
    
}