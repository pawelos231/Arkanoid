import { Common } from './Common.js';
import { Validator } from '../helpers/InputValidation.js';
import { Fetcher } from '../helpers/Fetcher.js';
const REGISTER_FORMS = "RegisterElement";
const FORM_TO_REGISTER = "formToRegister";
const CHECK_IF_LOGIN_OR_REGISTER = "checkIfLoginOrRegister";
const FORM_TO_LOGIN = "formToLogin";
const STATS_ELELEMENT = "Stats";
const MODAL_STATS_ELEMENT = "modal";
const PASSWORD_INPUT_ELEMENT = "password";
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
            changeValueOfMenuToLogin.textContent = "Chce się zarejestrować";
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
        const fetcher = new Fetcher(this.formElementRegister);
        validator.checkPasswordValidation();
        fetcher.SendData();
    }
}
export const menu = new Menu('siema');
