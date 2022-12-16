import { Common } from "../modules/Common";
import { Validator } from "./InputValidation";
import { HIDDEN } from "../constants/classNames";
const PASSWORD_INPUT_ELEMENT = "password";
export class Fetcher extends Common {
    constructor(formElement) {
        super("form");
        this.formElement = formElement;
    }
    SendData() {
        let newForm = this.elementId;
        if (this.formElement !== null) {
            this.formElement.addEventListener("submit", async (e) => {
                e.preventDefault();
                const formData = new FormData(newForm);
                for (const [key, value] of formData) {
                    if (key === "haslo") {
                        const elements = this.bindMultipleElements(PASSWORD_INPUT_ELEMENT);
                        console.log(elements);
                        elements.forEach((item) => {
                            //check if parent element contains hidden class if yes then proceed to validate further
                            const change = item.parentElement.classList.contains(HIDDEN);
                            if (!change) {
                                const validator = new Validator(PASSWORD_INPUT_ELEMENT, item.value);
                                const value = validator.CheckPassword();
                                console.log(value);
                            }
                        });
                    }
                    if (value === "") {
                        throw new Error("Musisz wprowadzić wartości !");
                    }
                }
            });
        }
    }
    FetchData(url) {
    }
}
