import { Common } from "../modules/Common";
const INVALID = "invalid";
export class Validator extends Common {
    constructor(input) {
        super("RegisterElement");
        this.input = input;
    }
    checkPasswordValidation() {
        const elements = this.bindMultipleElements(this.input);
        elements.forEach((item) => {
            item.addEventListener("keyup", (e) => {
                const value = e.target.value;
                const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
                const checked = value.match(regex);
                console.log(checked);
                if (checked == null) {
                    item.classList.add(INVALID);
                }
                else {
                    item.classList.remove(INVALID);
                }
            });
        });
    }
}
