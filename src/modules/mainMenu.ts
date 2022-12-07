const FORM_TO_REGISTER: string = ".formToRegister"
const CHECK_IF_LOGIN_OR_REGISTER: string = ".checkIfLoginOrRegister"
const FORM_TO_LOGIN: string = ".formToLogin"
import {Common} from './Common.js'
class Menu extends Common{
    data: string
    constructor(data: string){
        super("MenuElement")
        this.data = data;
    }
    switchBetweenRegisterAndLogin(){

        const formElementRegister: HTMLElement | null = this.bindElementByClass(FORM_TO_REGISTER)
        const elementP: HTMLElement | null = this.bindElementByClass(CHECK_IF_LOGIN_OR_REGISTER)
        const formElementLogin: HTMLElement | null = this.bindElementByClass(FORM_TO_LOGIN)

        let flag = false
        elementP.addEventListener("click", () =>{
            console.log("siema")
            this.changeVisbilityOfGivenElement(formElementRegister, flag)
            flag = true;
            this.changeVisbilityOfGivenElement(formElementLogin, flag)
        })
    }
}
export const menu: Menu = new Menu('siema')
