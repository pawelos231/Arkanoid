import { Common } from './Common.js'
import { Validator } from '../helpers/PasswordInputValidation.js'
import { Fetcher } from '../helpers/Fetcher.js'
import { Media } from './Media.js'
import { loader } from "./Loader"
import { levelSelect } from './LevelSelect.js'

const I_WANT_TO_REGISTER = "Chce się zarejestrować"
const I_WANT_TO_LOGIN = "Chce się zalogować"


const REGISTER_FORMS: string = "RegisterElement"
const FORM_TO_REGISTER: string = "formToRegister"
const FORM_TO_LOGIN: string = "formToLogin"
const CHECK_IF_LOGIN_OR_REGISTER: string = "checkIfLoginOrRegister"
const STATS_ELELEMENT: string = "Stats"
const MODAL_STATS_ELEMENT: string = "modalStats"
const PASSWORD_INPUT_ELEMENT: string = "password"
const START_GAME = "Start"
const MAIN_MENU_LEVEL_SELECT = "mainLevelSelect"
const START_THE_GAME = "startTheGame"
const BACK_TO_MENU = "backToMenu"
const OPEN_SETTINGS = "Ustawienia"
const OPENED_SETTINGS_PAGE = "OpenedSettings"
const CLOSE_SETTINGS = "closeSettings"
const MUSIC_RANGE = "musicRange"
const SOUND_RANGE = "soundRange"
const INNER_MODAL_STATS_ELEMENT = "innerModalStats"
const RESET_INPUT_SETTINGS = "resetInputsSettings"

class Menu extends Common {

    public constructor() {
        super(REGISTER_FORMS)
    }
    private fetcher: Fetcher = new Fetcher(this.elementId)
    private formElementRegister: HTMLElement = this.bindElementByClass(FORM_TO_REGISTER)


    private switchBetweenRegisterAndLogin(): void {

        const changeValueOfMenuToLogin: HTMLElement = this.bindElementByClass(CHECK_IF_LOGIN_OR_REGISTER)

        const formElementLogin: HTMLElement = this.bindElementByClass(FORM_TO_LOGIN)

        let flag: boolean = false
        changeValueOfMenuToLogin.addEventListener("click", () => {
            this.changeVisbilityOfGivenElement(this.formElementRegister, flag)
            flag = !flag;

            flag == true ? changeValueOfMenuToLogin.textContent = I_WANT_TO_REGISTER : changeValueOfMenuToLogin.textContent = I_WANT_TO_LOGIN
            this.changeVisbilityOfGivenElement(formElementLogin, flag)
        })

    }

    private async switchStatsModalState(): Promise<void> {
        const StatsElement: HTMLElement = this.bindElementByClass(STATS_ELELEMENT)
        const ModalElementStats: HTMLElement = this.bindElementByClass(MODAL_STATS_ELEMENT)
        const ResultsCheckBoard: HTMLElement = this.bindElementByClass(INNER_MODAL_STATS_ELEMENT)

        let flag: boolean = true

        StatsElement.addEventListener("click", async () => {
            this.changeVisbilityOfGivenElement(ModalElementStats, flag)
            flag = !flag

            const fetchData: Promise<string[]> = this.fetcher.FetchData<string[]>("http://localhost:8081/stats")

            ResultsCheckBoard.children[0].textContent = "ładuje"
            const stats: string[] = await fetchData
            ResultsCheckBoard.children[1].textContent = ""
            ResultsCheckBoard.children[0].textContent = "Najlepsze Statystyki Graczy"

            stats.map((value: string) => {
                const element: HTMLLIElement = document.createElement("li")
                element.textContent = value
                ResultsCheckBoard.children[1].appendChild(element)
            })

        })
    }
    private SendUserDataToBackend(): void {
        const validator: Validator = new Validator(PASSWORD_INPUT_ELEMENT)
        validator.DisplayBadPassword()
        this.fetcher.SendData();
    }

    private StartGame(): void {
        const isLogged: null | string = localStorage.getItem("game")
        const startGamePanel: HTMLElement = this.bindElementByClass(START_THE_GAME)
        const BackToMenuPanel: HTMLElement = this.bindElementByClass(BACK_TO_MENU)
        const StartGameButton: HTMLElement = this.bindElementByClass(START_GAME)
        const LevelSelect: HTMLElement = this.bindElementByClass(MAIN_MENU_LEVEL_SELECT)


        if (isLogged) {
            this.makeLoginPanelInvisible()
            this.changeVisbilityOfGivenElement(startGamePanel, true)
        }

        StartGameButton.addEventListener("click", () => {
            this.changeVisbilityOfGivenElement(LevelSelect, true)
            this.changeVisbilityOfGivenElement(startGamePanel, false)
            levelSelect.handleOnClickLevel()
        })
        BackToMenuPanel.addEventListener("click", () => {
            this.changeVisbilityOfGivenElement(LevelSelect, false)
            this.changeVisbilityOfGivenElement(startGamePanel, true)
        })
    }

    private openSettings(): void {
        const OpenSettings: HTMLElement | null = this.bindElementByClass(OPEN_SETTINGS)
        const OpenedSettingsPage: HTMLElement | null = this.bindElementByClass(OPENED_SETTINGS_PAGE)
        const CloseSettings: HTMLElement | null = this.bindElementByClass(CLOSE_SETTINGS)
        const increaseVolume: HTMLElement | null = this.bindElementByClass(MUSIC_RANGE)
        const resetInputsSettings: HTMLElement | null = this.bindElementByClass(RESET_INPUT_SETTINGS)


        const backgroundAudio: HTMLAudioElement = loader.loadSound("https://media.w3.org/2010/07/bunny/04-Death_Becomes_Fur.mp4")

        const media: Media = new Media(0.5, 0.5, true, true, backgroundAudio)

        OpenSettings.addEventListener("click", () => {
            this.changeVisbilityOfGivenElement(OpenedSettingsPage, true)
            resetInputsSettings.addEventListener("click", () => {
                media.resetValuesToDefault(increaseVolume)
            })
            media.playMusic()
            media.changeVolumeOfBackgroundMusic(increaseVolume)
        })

        CloseSettings.addEventListener("click", () => {
            this.changeVisbilityOfGivenElement(OpenedSettingsPage, false)
            media.stopMusic()
        })

    }

    public start(): void {
        this.switchBetweenRegisterAndLogin()
        this.switchStatsModalState();
        this.SendUserDataToBackend();
        this.StartGame()
        this.openSettings()
    }

}
export const menu: Menu = new Menu()
