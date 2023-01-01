import { Common } from './Common.js';
import { Validator } from '../helpers/InputValidation.js';
import { Fetcher } from '../helpers/Fetcher.js';
import { Media } from './Media.js';
const I_WANT_TO_REGISTER = "Chce się zarejestrować";
const I_WANT_TO_LOGIN = "Chce się zalogować";
const REGISTER_FORMS = "RegisterElement";
const FORM_TO_REGISTER = "formToRegister";
const FORM_TO_LOGIN = "formToLogin";
const CHECK_IF_LOGIN_OR_REGISTER = "checkIfLoginOrRegister";
const STATS_ELELEMENT = "Stats";
const MODAL_STATS_ELEMENT = "modal";
const PASSWORD_INPUT_ELEMENT = "password";
const START_GAME = "Start";
const MAIN_MENU_LEVEL_SELECT = "mainLevelSelect";
const START_THE_GAME = "startTheGame";
const BACK_TO_MENU = "backToMenu";
const OPEN_SETTINGS = "Ustawienia";
const OPENED_SETTINGS_PAGE = "OpenedSettings";
const CLOSE_SETTINGS = "closeSettings";
const MUSIC_RANGE = "musicRange";
const SOUND_RANGE = "soundRange";
class Menu extends Common {
    constructor() {
        super(REGISTER_FORMS);
        this.formElementRegister = this.bindElementByClass(FORM_TO_REGISTER);
    }
    switchBetweenRegisterAndLogin() {
        const changeValueOfMenuToLogin = this.bindElementByClass(CHECK_IF_LOGIN_OR_REGISTER);
        const formElementLogin = this.bindElementByClass(FORM_TO_LOGIN);
        let flag = false;
        changeValueOfMenuToLogin.addEventListener("click", () => {
            this.changeVisbilityOfGivenElement(this.formElementRegister, flag);
            flag = !flag;
            flag == true ? changeValueOfMenuToLogin.textContent = I_WANT_TO_REGISTER : changeValueOfMenuToLogin.textContent = I_WANT_TO_LOGIN;
            this.changeVisbilityOfGivenElement(formElementLogin, flag);
        });
    }
    switchStatsModalState() {
        const StatsElement = this.bindElementByClass(STATS_ELELEMENT);
        const ModalElementStats = this.bindElementByClass(MODAL_STATS_ELEMENT);
        let flag = true;
        StatsElement.addEventListener("click", () => {
            this.changeVisbilityOfGivenElement(ModalElementStats, flag);
            flag = !flag;
        });
    }
    SendUserDataToBackend() {
        const validator = new Validator(PASSWORD_INPUT_ELEMENT);
        const fetcher = new Fetcher(this.elementId);
        validator.DisplayBadPassword();
        fetcher.SendData();
    }
    StartGame() {
        const isLogged = localStorage.getItem("game");
        const startGamePanel = this.bindElementByClass(START_THE_GAME);
        const BackToMenuPanel = this.bindElementByClass(BACK_TO_MENU);
        const StartGameButton = this.bindElementByClass(START_GAME);
        const LevelSelect = this.bindElementByClass(MAIN_MENU_LEVEL_SELECT);
        if (isLogged) {
            this.makeLoginPanelInvisible();
            this.changeVisbilityOfGivenElement(startGamePanel, true);
        }
        StartGameButton.addEventListener("click", () => {
            this.changeVisbilityOfGivenElement(LevelSelect, true);
            this.changeVisbilityOfGivenElement(startGamePanel, false);
        });
        BackToMenuPanel.addEventListener("click", () => {
            this.changeVisbilityOfGivenElement(LevelSelect, false);
            this.changeVisbilityOfGivenElement(startGamePanel, true);
        });
    }
    openSettings() {
        const OpenSettings = this.bindElementByClass(OPEN_SETTINGS);
        const OpenedSettingsPage = this.bindElementByClass(OPENED_SETTINGS_PAGE);
        const CloseSettings = this.bindElementByClass(CLOSE_SETTINGS);
        const increaseVolume = this.bindElementByClass(MUSIC_RANGE);
        const media = new Media(0.3, 0.4, true, true);
        OpenSettings.addEventListener("click", () => {
            this.changeVisbilityOfGivenElement(OpenedSettingsPage, true);
            media.playMusic();
            media.changeVolumeOfBackgroundMusic(increaseVolume);
        });
        CloseSettings.addEventListener("click", () => {
            this.changeVisbilityOfGivenElement(OpenedSettingsPage, false);
            media.stopMusic();
        });
    }
    start() {
        this.switchBetweenRegisterAndLogin();
        this.switchStatsModalState();
        this.SendUserDataToBackend();
        this.StartGame();
        this.openSettings();
    }
}
export const menu = new Menu();
