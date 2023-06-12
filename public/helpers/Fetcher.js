import { Common } from "../modules/Common";
import { Validator } from "./PasswordInputValidation";
import { HIDDEN } from "../constants/classNames";
import { DEVELEPOMENT_URL, POST } from '../constants/Fetchers';
const PASSWORD_INPUT_ELEMENT = "password";
const ELEMENT_DOES_NOT_EXIST = "element nie istnieje";
const PASSWORD = "haslo";
const MUST_PUT_VALID_PASS = "Musisz wprowadzić poprawne hasło !";
const MUST_PUT_VALID_VAL = "Musisz wprowadzić wartości !";
const LOGIN_STATUS_MESSAGE = "LoginStatus";
const START_THE_GAME = "startTheGame";
export class Fetcher extends Common {
    constructor(formElement) {
        super();
        this.formElement = formElement;
    }
    async sendDataToBackendAuth(form, parentName) {
        const LoginStatus = this.bindElementByClass(LOGIN_STATUS_MESSAGE);
        const startGamePanel = this.bindElementByClass(START_THE_GAME);
        let FormObject = {};
        for (const [key, value] of form) {
            FormObject[key] = value;
        }
        await fetch(`${DEVELEPOMENT_URL}/${parentName}`, {
            method: POST,
            body: JSON.stringify(FormObject)
        })
            .then((res) => res.json())
            .then((data) => {
            LoginStatus.textContent = data.message;
            const statusOfMessage = data.status;
            if (statusOfMessage === 0) {
                LoginStatus.style.color = "red";
            }
            if (statusOfMessage === 1) {
                LoginStatus.style.color = "green";
                localStorage.setItem("game", "1");
                setTimeout(() => {
                    LoginStatus.textContent = "";
                    this.makeLoginPanelInvisible();
                    this.changeVisbilityOfGivenElement(startGamePanel, true);
                }, 1000);
            }
        });
    }
    SendUserAuthData() {
        var _a;
        if (this.formElement == null)
            throw new Error(ELEMENT_DOES_NOT_EXIST);
        const allRegisterElementItems = (_a = this === null || this === void 0 ? void 0 : this.formElement) === null || _a === void 0 ? void 0 : _a.children;
        const FORM = "FORM";
        const loginAndRegisterFormNodes = Array.from(allRegisterElementItems).filter((item) => item.nodeName.toUpperCase() == FORM);
        loginAndRegisterFormNodes.forEach((item) => {
            item.addEventListener("submit", (e) => {
                e.preventDefault();
                const newForm2 = item;
                const newFormData = new FormData(newForm2);
                for (const [key, value] of newFormData) {
                    //if the name of the input is not Password then continue with loop
                    if (key !== PASSWORD)
                        continue;
                    //check Password only if this is the form that is not currently hidden aka visible
                    const contains = item.classList.contains(HIDDEN);
                    if (contains)
                        return;
                    const validator = new Validator(PASSWORD_INPUT_ELEMENT, value);
                    const CorrectPassword = validator.CheckPass();
                    if (CorrectPassword) {
                        this.sendDataToBackendAuth(newFormData, item.name);
                    }
                    else
                        throw new Error(MUST_PUT_VALID_PASS);
                    if (value === "")
                        throw new Error(MUST_PUT_VALID_VAL);
                }
            });
        });
    }
    static async FetchData(url) {
        try {
            const response = await fetch(url, {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            return data;
        }
        catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
    static async sendDataToBackend(url, data) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData = await response.json();
            console.log(responseData);
        }
        catch (error) {
            console.error('Error sending data to backend:', error);
            throw error;
        }
    }
}
