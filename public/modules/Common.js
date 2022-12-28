import { HIDDEN } from "../constants/classNames";
export class Common {
    constructor(elementId) {
        this.elementId = this.bindElementById(elementId);
        if (typeof elementId === "undefined") {
            return;
        }
    }
    bindElementById(elementToFindById) {
        const element = document.getElementById(elementToFindById);
        if (!element) {
            throw new Error(`nie znaleziono elementu ${elementToFindById}`);
        }
        return element;
    }
    bindElementByClass(elementToFindByClass) {
        const element = document.documentElement.querySelector("." + elementToFindByClass);
        if (!element) {
            throw new Error(`nie znaleziono elementu ${elementToFindByClass}`);
        }
        return element;
    }
    changeVisbilityOfGivenElement(element, flag) {
        flag ?
            element === null || element === void 0 ? void 0 : element.classList.remove(HIDDEN) :
            element === null || element === void 0 ? void 0 : element.classList.add(HIDDEN);
    }
    bindMultipleElements(elementsTobBind) {
        const element = document.querySelectorAll("." + elementsTobBind);
        if (!element) {
            throw new Error(`nie znaleziono elementu ${elementsTobBind}`);
        }
        return element;
    }
    displayMessageAtTheTopOfTheScreen(message) {
        console.log(message);
    }
}
