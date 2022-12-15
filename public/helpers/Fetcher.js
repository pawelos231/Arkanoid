const REGISTER_FORMS = "RegisterElement";
export class Fetcher {
    constructor(formElement) {
        this.formElement = formElement;
    }
    SendData() {
        if (this.formElement !== null) {
            this.formElement.addEventListener("submit", (e) => {
                e.preventDefault();
                console.log("used");
            });
        }
    }
}
