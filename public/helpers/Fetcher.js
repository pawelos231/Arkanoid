import { Common } from "../modules/Common";
import { Validator } from "./InputValidation";
import { HIDDEN } from "../constants/classNames";
const PASSWORD_INPUT_ELEMENT = "password";
const PASS_KEY_IN_FORM = "haslo";
const ELEMENT_DOES_NOT_EXIST = "element nie istnieje";
const YOU_MUST_PASS_CORRECT_PASSWORD = "Musisz wprowadzić poprawne hasło !";
const MUST_PASS_COR_VAL = "Musisz wprowadzić wartości !";
export class Fetcher extends Common {
    constructor(formElement) {
        super("form");
        this.formElement = formElement;
    }
    sendDataToBackend(form) {
        for (const [key, value] of form) {
            console.log(value);
        }
    }
    SendData() {
        //create a newform and cast it via as keyword to proper type for FormData constructor parameter
        let newForm = this.elementId;
        if (this.formElement == null)
            throw new Error(ELEMENT_DOES_NOT_EXIST);
        this.formElement.addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = new FormData(newForm);
            for (const [key, value] of formData) {
                //if the current input is not password then return
                if (key !== PASS_KEY_IN_FORM)
                    return;
                const elements = this.bindMultipleElements(PASSWORD_INPUT_ELEMENT);
                elements.forEach((item) => {
                    //check if parent element contains hidden class if yes then proceed to validate further
                    const change = item.parentElement.classList.contains(HIDDEN);
                    //if yes then return, there is no need to validate
                    if (change)
                        return;
                    //create new instance of validator
                    const validator = new Validator(PASSWORD_INPUT_ELEMENT, item.value);
                    //check current if the password that user is trying to send is ok
                    const returnValue = validator.CheckPass();
                    //if yes then pass formdata to a function where it will be passed to backend
                    if (returnValue)
                        this.sendDataToBackend(formData);
                    else
                        throw new Error(YOU_MUST_PASS_CORRECT_PASSWORD);
                });
                if (value === "")
                    throw new Error(MUST_PASS_COR_VAL);
            }
        });
    }
    FetchData(url) {
    }
}
