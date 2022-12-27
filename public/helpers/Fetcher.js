import { Common } from "../modules/Common";
import { Validator } from "./InputValidation";
import { HIDDEN } from "../constants/classNames";
import { DEVELEPOMENT_URL, POST } from '../constants/Fetchers';
const PASSWORD_INPUT_ELEMENT = "password";
const ELEMENT_DOES_NOT_EXIST = "element nie istnieje";
const PASSWORD = "haslo";
const MUST_PUT_VALID_PASS = "Musisz wprowadzić poprawne hasło !";
const MUST_PUT_VALID_VAL = "Musisz wprowadzić wartości !";
const REGISTER_FORMS = "RegisterElement";
const LOGIN_STATUS_MESSAGE = "LoginStatus";
const START_THE_GAME = "startTheGame";
export class Fetcher extends Common {
    constructor(formElement) {
        super("form");
        this.formElement = formElement;
    }
    makeLoginPanelInvisible() {
        const RegisterElemement = this.bindElementById(REGISTER_FORMS);
        this.changeVisbilityOfGivenElement(RegisterElemement, false);
    }
    async sendDataToBackend(form, parentName) {
        const LoginStatus = this.bindElementByClass(LOGIN_STATUS_MESSAGE);
        const startGamePanel = this.bindElementByClass(START_THE_GAME);
        let obj = {};
        for (const [key, value] of form) {
            obj[key] = value;
        }
        await fetch(`${DEVELEPOMENT_URL}/${parentName}`, {
            method: POST,
            body: JSON.stringify(obj)
        })
            .then((res) => res.json())
            .then((data) => {
            LoginStatus.textContent = data.message;
            if (data.status === 0) {
                LoginStatus.style.color = "red";
            }
            if (data.status === 1) {
                LoginStatus.style.color = "green";
                setTimeout(() => {
                    LoginStatus.textContent = "";
                    this.makeLoginPanelInvisible();
                    this.changeVisbilityOfGivenElement(startGamePanel, true);
                }, 1000);
            }
        });
    }
    SendData() {
        var _a;
        let newForm = this.elementId;
        if (this.formElement == null)
            throw new Error(ELEMENT_DOES_NOT_EXIST);
        const items = (_a = this === null || this === void 0 ? void 0 : this.formElement) === null || _a === void 0 ? void 0 : _a.children;
        let arr = [];
        if (items) {
            for (let item of items) {
                if (item.nodeName === "FORM") {
                    arr.push(item);
                }
            }
        }
        arr.forEach((item) => {
            item.addEventListener("submit", (e) => {
                e.preventDefault();
                let newForm2 = item;
                const newFormData = new FormData(newForm2);
                for (const [key, value] of newFormData) {
                    if (key !== PASSWORD)
                        continue;
                    const contains = item.classList.contains(HIDDEN);
                    if (contains)
                        return;
                    const validator = new Validator(PASSWORD_INPUT_ELEMENT, value);
                    const returnValue = validator.CheckPass();
                    if (returnValue)
                        this.sendDataToBackend(newFormData, item.name);
                    else {
                        console.log("podaj poprawne hasło");
                    }
                    if (value === "")
                        throw new Error(MUST_PUT_VALID_VAL);
                }
            });
        });
    }
    FetchData(url) {
    }
}
