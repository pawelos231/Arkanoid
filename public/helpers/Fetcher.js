import { Common } from "../modules/Common";
import { Validator } from "./InputValidation";
import { HIDDEN } from "../constants/classNames";
import { DEVELEPOMENT_URL, POST } from '../constants/Fetchers';
const PASSWORD_INPUT_ELEMENT = "password";
const ELEMENT_DOES_NOT_EXIST = "element nie istnieje";
const PASSWORD = "haslo";
const MUST_PUT_VALID_PASS = "Musisz wprowadzić poprawne hasło !";
const MUST_PUT_VALID_VAL = "Musisz wprowadzić wartości !";
export class Fetcher extends Common {
    constructor(formElement) {
        super("form");
        this.formElement = formElement;
    }
    async sendDataToBackend(form) {
        let obj = {};
        for (const [key, value] of form) {
            obj[key] = value;
        }
        await fetch(`${DEVELEPOMENT_URL}/register`, {
            method: POST,
            body: JSON.stringify(obj)
        })
            .then(res => res.json())
            .then(data => console.log(data));
    }
    SendData() {
        let newForm = this.elementId;
        if (this.formElement == null)
            throw new Error(ELEMENT_DOES_NOT_EXIST);
        this.formElement.addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = new FormData(newForm);
            for (const [key, value] of formData) {
                if (key !== PASSWORD)
                    continue;
                const elements = this.bindMultipleElements(PASSWORD_INPUT_ELEMENT);
                elements.forEach((item) => {
                    //check if parent element contains hidden class if yes then proceed to validate further
                    const change = item.parentElement.classList.contains(HIDDEN);
                    //if yes then return, there is no need to validate
                    if (change)
                        return;
                    const validator = new Validator(PASSWORD_INPUT_ELEMENT, item.value);
                    const returnValue = validator.CheckPass();
                    if (returnValue)
                        this.sendDataToBackend(formData);
                    else
                        throw new Error(MUST_PUT_VALID_PASS);
                });
                if (value === "")
                    throw new Error(MUST_PUT_VALID_VAL);
            }
        });
    }
    FetchData(url) {
    }
}
