import {Common} from './Common.js'
import { Validator } from '../helpers/InputValidation.js'
import { Fetcher } from '../helpers/Fetcher.js'

const REGISTER_FORMS: string = "RegisterElement"
const FORM_TO_REGISTER: string = "formToRegister"
const FORM_TO_LOGIN: string = "formToLogin"
const CHECK_IF_LOGIN_OR_REGISTER: string = "checkIfLoginOrRegister"
const STATS_ELELEMENT: string = "Stats"
const MODAL_STATS_ELEMENT: string = "modal"
const PASSWORD_INPUT_ELEMENT: string = "password"
const START_GAME = "Start"
const MAIN_MENU_LEVEL_SELECT= "mainLevelSelect"
const START_THE_GAME = "startTheGame"
const BACK_TO_MENU = "backToMenu"


class Menu extends Common{
    data: string
    constructor(data: string){
        super(REGISTER_FORMS)
        this.data = data;
    }

    formElementRegister: HTMLElement | null = this.bindElementByClass(FORM_TO_REGISTER)
    

    switchBetweenRegisterAndLogin(): void{
        
        const changeValueOfMenuToLogin: HTMLElement | null = this.bindElementByClass(CHECK_IF_LOGIN_OR_REGISTER)

        const formElementLogin: HTMLElement | null = this.bindElementByClass(FORM_TO_LOGIN)

        let flag: boolean = false
        changeValueOfMenuToLogin.addEventListener("click", () =>{
            this.changeVisbilityOfGivenElement(this.formElementRegister, flag)
            flag = !flag;
            
            flag == true ? changeValueOfMenuToLogin.textContent = "Chce się zarejestrować" : changeValueOfMenuToLogin.textContent = "Chce się zalogować"
            this.changeVisbilityOfGivenElement(formElementLogin, flag)
        })
        
    }

    switchStatsModalState(): void{
        const StatsElement: HTMLElement | null = this.bindElementByClass(STATS_ELELEMENT)
        const ModalElementStats: HTMLElement| null = this.bindElementByClass(MODAL_STATS_ELEMENT)

        let flag: boolean = true
        StatsElement.addEventListener("click", () =>{
            this.changeVisbilityOfGivenElement(ModalElementStats, flag)
            flag = !flag
        })
    }

    SendUserDataToBackend(): void{
        const validator: Validator = new Validator(PASSWORD_INPUT_ELEMENT)
        const fetcher: Fetcher = new Fetcher(this.elementId)
        validator.DisplayBadPassword()
        fetcher.SendData();
    }
    StartGame(): void{
        const niewiem: null | string = localStorage.getItem("game")
        const startGamePanel: HTMLElement | null = this.bindElementByClass(START_THE_GAME)
        const BackToMenuPanel: HTMLElement | null = this.bindElementByClass(BACK_TO_MENU)
        if(niewiem) {
            this.makeLoginPanelInvisible()
            this.changeVisbilityOfGivenElement(startGamePanel, true)
        }
        const StartGameButton: HTMLElement | null = this.bindElementByClass(START_GAME)
        const LevelSelect: HTMLElement | null = this.bindElementByClass(MAIN_MENU_LEVEL_SELECT)  
        
        StartGameButton.addEventListener("click", () =>{
            this.changeVisbilityOfGivenElement(LevelSelect, true)
            this.changeVisbilityOfGivenElement(startGamePanel, false)
        })
        BackToMenuPanel.addEventListener("click", ()=>{
            this.changeVisbilityOfGivenElement(LevelSelect, false)
            this.changeVisbilityOfGivenElement(startGamePanel, true)
        })
    }
    start():void{
        this.switchBetweenRegisterAndLogin()
        this.switchStatsModalState();
        this.SendUserDataToBackend();
        this.StartGame()
    }

}
export const menu: Menu = new Menu('siema')
