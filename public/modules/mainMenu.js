import { Common } from './Common.js';
import { Validator } from '../helpers/InputValidation.js';
import { Fetcher } from '../helpers/Fetcher.js';
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
class Menu extends Common {
    constructor(data) {
        super(REGISTER_FORMS);
        this.formElementRegister = this.bindElementByClass(FORM_TO_REGISTER);
        this.data = data;
    }
    switchBetweenRegisterAndLogin() {
        const changeValueOfMenuToLogin = this.bindElementByClass(CHECK_IF_LOGIN_OR_REGISTER);
        const formElementLogin = this.bindElementByClass(FORM_TO_LOGIN);
        let flag = false;
        changeValueOfMenuToLogin.addEventListener("click", () => {
            this.changeVisbilityOfGivenElement(this.formElementRegister, flag);
            flag = !flag;
            flag == true ? changeValueOfMenuToLogin.textContent = "Chce się zarejestrować" : changeValueOfMenuToLogin.textContent = "Chce się zalogować";
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
        const niewiem = localStorage.getItem("game");
        const startGamePanel = this.bindElementByClass(START_THE_GAME);
        const BackToMenuPanel = this.bindElementByClass(BACK_TO_MENU);
        if (niewiem) {
            this.makeLoginPanelInvisible();
            this.changeVisbilityOfGivenElement(startGamePanel, true);
        }
        const StartGameButton = this.bindElementByClass(START_GAME);
        const LevelSelect = this.bindElementByClass(MAIN_MENU_LEVEL_SELECT);
        StartGameButton.addEventListener("click", () => {
            this.changeVisbilityOfGivenElement(LevelSelect, true);
            this.changeVisbilityOfGivenElement(startGamePanel, false);
        });
        BackToMenuPanel.addEventListener("click", () => {
            this.changeVisbilityOfGivenElement(LevelSelect, false);
            this.changeVisbilityOfGivenElement(startGamePanel, true);
        });
    }
    start() {
        this.switchBetweenRegisterAndLogin();
        this.switchStatsModalState();
        this.SendUserDataToBackend();
        this.StartGame();
    }
}
export const menu = new Menu('siema');
