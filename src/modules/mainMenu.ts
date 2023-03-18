import { Common } from './Common.js'
import { Validator } from '../helpers/PasswordInputValidation.js'
import { Fetcher } from '../helpers/Fetcher.js'
import { media } from './Media.js'
import { levelSelect } from './LevelSelect.js'
import { settings } from './Settings.js'
import { Songs, tempTabOfSongs } from '../data/temporarySongsData.js'
import { Sounds, tempTabOfSounds } from '../data/temporarySoundsData.js'
import { MediaEnum } from '../interfaces/HelperEnums.js'
import { GET_STATS_URL } from '../constants/api/Urls.js'
import { ViewsCreator } from '../helpers/viewCreator.js'
import { ViewsSongFunc } from '../interfaces/PaginationInterfaces.js'

const I_WANT_TO_REGISTER = "Chce się zarejestrować"
const I_WANT_TO_LOGIN = "Chce się zalogować"

const REGISTER_FORMS = "RegisterElement"
const FORM_TO_REGISTER = "formToRegister"
const FORM_TO_LOGIN = "formToLogin"
const CHECK_IF_LOGIN_OR_REGISTER = "checkIfLoginOrRegister"
const STATS_ELELEMENT = "Stats"
const INNER_MODAL_STATS_ELEMENT = "innerModalStats"
const MODAL_STATS_ELEMENT = "modalStats"
const PASSWORD_INPUT_ELEMENT = "password"
const START_GAME = "Start"
const MAIN_MENU_LEVEL_SELECT = "mainLevelSelect"
const START_THE_GAME = "startTheGame"
const BACK_TO_MENU = "backToMenu"
const OPEN_SETTINGS = "Ustawienia"
const OPENED_SETTINGS_PAGE = "OpenedSettings"
const CLOSE_SETTINGS = "closeSettings"
const MUSIC_RANGE = "musicRange"
const SOUND_RANGE = "soundRange"
const LIST_OF_SONGS = "listOfSongs > ul"
const RESET_INPUT_SETTINGS = "resetInputsSettings"
const SOUND_VIEW_LAYER_SHOW = "Sound"
const MUSIC_VIEW_LAYER_SHOW = "Music"

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

            const fetchData: Promise<string[]> = this.fetcher.FetchData<string[]>(GET_STATS_URL)

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
        this.fetcher.SendUserAuthData();
    }

    private async StartGame(): Promise<void> {
        media.setSound()
        const isLogged: null | string = localStorage.getItem("game")
        const startGamePanel: HTMLElement = this.bindElementByClass(START_THE_GAME)
        const BackToMenuPanel: HTMLElement = this.bindElementByClass(BACK_TO_MENU)
        const StartGameButton: HTMLElement = this.bindElementByClass(START_GAME)
        const LevelSelect: HTMLElement = this.bindElementByClass(MAIN_MENU_LEVEL_SELECT)


        if (isLogged) {
            this.makeLoginPanelInvisible()
            this.changeVisbilityOfGivenElement(startGamePanel, true)
        }

        StartGameButton.addEventListener("click", async () => {
            this.changeVisbilityOfGivenElement(LevelSelect, true)
            this.changeVisbilityOfGivenElement(startGamePanel, false)
            levelSelect.handleOnClickLevel()
        })

        BackToMenuPanel.addEventListener("click", () => {
            this.changeVisbilityOfGivenElement(LevelSelect, false)
            this.changeVisbilityOfGivenElement(startGamePanel, true)
        })
    }
    private async OpenInfo(): Promise<void> {
        
    }

    private async openSettings(): Promise<void> {
        const OpenSettings: HTMLElement = this.bindElementByClass(OPEN_SETTINGS)
        const OpenedSettingsPage: HTMLElement = this.bindElementByClass(OPENED_SETTINGS_PAGE)
        const CloseSettings: HTMLElement = this.bindElementByClass(CLOSE_SETTINGS)
        const changeVolumeOfMusic: HTMLElement = this.bindElementByClass(MUSIC_RANGE)
        const changeVolumeOfSound: HTMLElement = this.bindElementByClass(SOUND_RANGE)
        const resetInputsSettings: HTMLElement = this.bindElementByClass(RESET_INPUT_SETTINGS)
        const songsList: HTMLElement = this.bindElementByClass(LIST_OF_SONGS)
        const SOUNDS: HTMLElement = this.bindElementByClass(SOUND_VIEW_LAYER_SHOW)
        const MUSIC: HTMLElement = this.bindElementByClass(MUSIC_VIEW_LAYER_SHOW)

        //TODO have those files on server to give user choice what to play in backgground
        const ITEMS_PER_PAGE = 5
        const creatorOfViews: ViewsCreator = new ViewsCreator("paginateSongs")

      

        const createViewForSongs: ViewsSongFunc = creatorOfViews.createViewForSongs.bind(creatorOfViews)


        OpenSettings.addEventListener("click", () => {
            settings.PaginateResults<Songs, ViewsSongFunc>(songsList, ITEMS_PER_PAGE, tempTabOfSongs, MediaEnum.Music, createViewForSongs, "paginateSongResults")
            SOUNDS.addEventListener("click", () => {
                settings.PaginateResults<Sounds, ViewsSongFunc>(songsList, ITEMS_PER_PAGE, tempTabOfSounds, MediaEnum.Sounds, createViewForSongs, "paginateSongResults")
            })
            MUSIC.addEventListener("click", () => {
                settings.PaginateResults<Songs, ViewsSongFunc>(songsList, ITEMS_PER_PAGE, tempTabOfSongs, MediaEnum.Music, createViewForSongs, "paginateSongResults")
            })

            this.changeVisbilityOfGivenElement(OpenedSettingsPage, true)
            resetInputsSettings.addEventListener("click", () => {
                media.resetValuesToDefault(changeVolumeOfMusic, changeVolumeOfSound)
            })
            media.changeVolumeOfBackgroundMusic(changeVolumeOfMusic)
            media.changeVolumeOfSound(changeVolumeOfSound)
        })

        CloseSettings.addEventListener("click", () => {
            this.changeVisbilityOfGivenElement(OpenedSettingsPage, false)

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
