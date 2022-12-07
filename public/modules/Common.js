const HIDDEN = "hidden";
export class Common {
    constructor(elementId) {
        this.elementId = this.bindElementById(elementId);
        if (typeof elementId === "undefined") {
            return;
        }
    }
    bindElementById(elementToFindById) {
        const element = document.getElementById(elementToFindById);
        console.log(element);
        if (!element) {
            throw new Error(`nie znaleziono elementu ${elementToFindById}`);
        }
        return element;
    }
    bindElementByClass(elementToFindByClass) {
        const element = document.documentElement.querySelector(elementToFindByClass);
        console.log(element);
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
}
