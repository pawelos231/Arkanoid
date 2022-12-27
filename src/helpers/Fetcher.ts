import { Common } from "../modules/Common";
import { Validator } from "./InputValidation";
import { HIDDEN } from "../constants/classNames";
import {DEVELEPOMENT_URL, POST, GET} from '../constants/Fetchers'
import {responseData} from '../interfaces/LoginData'

const PASSWORD_INPUT_ELEMENT = "password"
const ELEMENT_DOES_NOT_EXIST = "element nie istnieje"
const PASSWORD = "haslo"
const MUST_PUT_VALID_PASS = "Musisz wprowadzić poprawne hasło !"
const MUST_PUT_VALID_VAL = "Musisz wprowadzić wartości !"


const REGISTER_FORMS = "RegisterElement"
const LOGIN_STATUS_MESSAGE = "LoginStatus"
const START_THE_GAME = "startTheGame"

export class Fetcher extends Common {
    formElement: HTMLElement | null
    constructor(formElement: HTMLElement | null){
        super("form")
        this.formElement = formElement
    }


    makeLoginPanelInvisible(): void{
        const RegisterElemement: HTMLElement | null = this.bindElementById(REGISTER_FORMS)
        this.changeVisbilityOfGivenElement(RegisterElemement, false)
    }

    async sendDataToBackend(form: FormData, parentName: string): Promise<void>{
      
        const LoginStatus: HTMLElement | null = this.bindElementByClass(LOGIN_STATUS_MESSAGE)
        const startGamePanel: HTMLElement | null = this.bindElementByClass(START_THE_GAME)

        let obj: any = {}

        for(const [key, value] of form){
            obj[key] = value
        }
        await fetch(`${DEVELEPOMENT_URL}/${parentName}`, {
            method: POST,
            body: JSON.stringify(obj)
        })
        .then((res: Response) => res.json())
        .then((data: responseData)=> {
            LoginStatus.textContent = data.message
            if(data.status === 0){
                LoginStatus.style.color = "red"
            }
            if(data.status === 1){
                LoginStatus.style.color = "green"
                setTimeout(()=>{
                    LoginStatus.textContent = ""
                    this.makeLoginPanelInvisible()
                    this.changeVisbilityOfGivenElement(startGamePanel, true)
                }, 1000) 
            } 
        })

    }

    SendData(): void{
        let newForm = this.elementId as HTMLFormElement | undefined

        if(this.formElement == null) throw new Error(ELEMENT_DOES_NOT_EXIST)
        this.formElement.addEventListener("submit", async (e: SubmitEvent)=>{
             e.preventDefault()
             let items = this?.formElement?.children
             if(items){
             for(let item of items){
                console.log(item.nodeName)
             }
            }
             const formData: FormData = new FormData(newForm);

             for (const [key, value] of formData) {
                if(key !== PASSWORD) continue
                
                
                const elements: NodeListOf<Element> | null = this.bindMultipleElements(PASSWORD_INPUT_ELEMENT)
                elements.forEach((item: any)=>{
                    //check if parent element contains hidden class if yes then proceed to validate further
                    const change: boolean = item.parentElement.classList.contains(HIDDEN);
                    const parentName: string = item.parentElement.name

                    //if yes then return, there is no need to validate
                    if(change) return;
                    const validator: Validator = new Validator(PASSWORD_INPUT_ELEMENT, item.value)
                    const returnValue: boolean = validator.CheckPass()

                    if(returnValue) this.sendDataToBackend(formData, parentName)
                    else throw new Error(MUST_PUT_VALID_PASS) 
     
                })

                if(value === "") throw new Error(MUST_PUT_VALID_VAL)           
            }
            })
        
    }
    FetchData(url: string){

    }
    
}