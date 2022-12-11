import { Common } from "../modules/Common";
const INVALID = "Invalid";
export class Validator extends Common {
    constructor(input) {
        super("RegisterElement");
        this.input = input;
    }
    checkPasswordValidation() {
        const element = this.bindElementByClass(this.input);
        element.addEventListener("click", () => {
            console.log("siema");
        });
    }
}
