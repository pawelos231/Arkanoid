import { Common } from './Common.js';
const REGISTER_FORMS = "RegisterElement";
const FORM_TO_REGISTER = ".formToRegister";
const CHECK_IF_LOGIN_OR_REGISTER = ".checkIfLoginOrRegister";
const FORM_TO_LOGIN = ".formToLogin";
const STATS_ELELEMENT = ".Stats";
const MODAL_STATS_ELEMENT = ".modal";
class Menu extends Common {
    constructor(data) {
        super(REGISTER_FORMS);
        this.data = data;
    }
    switchBetweenRegisterAndLogin() {
        const formElementRegister = this.bindElementByClass(FORM_TO_REGISTER);
        const changeValueOfMenuToLogin = this.bindElementByClass(CHECK_IF_LOGIN_OR_REGISTER);
        const formElementLogin = this.bindElementByClass(FORM_TO_LOGIN);
        let flag = false;
        changeValueOfMenuToLogin.addEventListener("click", () => {
            this.changeVisbilityOfGivenElement(formElementRegister, flag);
            flag = !flag;
            changeValueOfMenuToLogin.textContent = "Chce się zarejestrować";
            this.changeVisbilityOfGivenElement(formElementLogin, flag);
        });
    }
    switchStatsModalState() {
        const StatsElement = this.bindElementByClass(STATS_ELELEMENT);
        const ModalElementStats = this.bindElementByClass(MODAL_STATS_ELEMENT);
        let flag = false;
        StatsElement.addEventListener("click", () => {
            this.changeVisbilityOfGivenElement(ModalElementStats, flag);
            flag = !flag;
        });
    }
}
export const menu = new Menu('siema');
