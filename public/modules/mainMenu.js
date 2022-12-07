const FORM_TO_REGISTER = ".formToRegister";
const CHECK_IF_LOGIN_OR_REGISTER = ".checkIfLoginOrRegister";
const FORM_TO_LOGIN = ".formToLogin";
import { Common } from './Common.js';
class Menu extends Common {
    constructor(data) {
        super("MenuElement");
        this.data = data;
    }
    switchBetweenRegisterAndLogin() {
        const formElementRegister = this.bindElementByClass(FORM_TO_REGISTER);
        const elementP = this.bindElementByClass(CHECK_IF_LOGIN_OR_REGISTER);
        const formElementLogin = this.bindElementByClass(FORM_TO_LOGIN);
        let flag = false;
        elementP.addEventListener("click", () => {
            console.log("siema");
            this.changeVisbilityOfGivenElement(formElementRegister, flag);
            flag = true;
            this.changeVisbilityOfGivenElement(formElementLogin, flag);
        });
    }
}
export const menu = new Menu('siema');
