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
        const items: HTMLCollection = this?.formElement?.children
        let arr: any = []
             if(items){
             for(let item of items){
                if(item.nodeName === "FORM"){
                    arr.push(item)
                }
             }
            }
        arr.forEach((item : any) =>{
           
            item.addEventListener("submit", (e: any)=>{
                e.preventDefault()
                let newForm2 = item as HTMLFormElement | undefined
                const newFormData: FormData = new FormData(newForm2)
                for (const [key, value] of newFormData) {
                    if(key !== PASSWORD) continue

                    const contains: boolean = item.classList.contains(HIDDEN)

                    if(contains) return

                    const validator: Validator = new Validator(PASSWORD_INPUT_ELEMENT, value as string)

                    const returnValue: boolean = validator.CheckPass()

                    if(returnValue) this.sendDataToBackend(newFormData, item.name)
                    else{
                        console.log("podaj poprawne hasło")
                    }

                    if(value === "") throw new Error(MUST_PUT_VALID_VAL)   
                }
            })
        })  
    }



    FetchData(url: string)
    {

    }
    
}