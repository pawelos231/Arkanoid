import { Common } from "../modules/Common";
import { INVALID } from "../constants/classNames";
export class Validator extends Common {
    constructor(input, value) {
        super("RegisterElement");
        this.input = input;
        this.value = value;
    }
    DisplayBadPassword() {
        const elements = this.bindMultipleElements(this.input);
        elements.forEach((item) => {
            item.addEventListener("keyup", (e) => {
                const value = e.target.value;
                const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
                const checked = value.match(regex);
                if (checked == null) {
                    item.classList.add(INVALID);
                }
                else {
                    item.classList.remove(INVALID);
                }
            });
        });
    }
    CheckPass() {
        if (this.value) {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
            const checked = this.value.match(regex);
            if (checked !== null) {
                return true;
            }
            return false;
        }
        return false;
    }
}
