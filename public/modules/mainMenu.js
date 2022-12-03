import { Common } from './Common.js';
class Menu extends Common {
    constructor(data) {
        super("MenuElement");
        this.data = data;
    }
    turnOnAndOffEl() {
        const element = this.bindElement("MenuElement");
        element.addEventListener("click", () => {
            this.changeVisbilityOfGivenElement(element, false);
        });
    }
}
export const menu = new Menu('siema');
