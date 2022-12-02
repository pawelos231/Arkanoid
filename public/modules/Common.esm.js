const HIDDEN = "hidden";
export class Common {
    constructor(elementId) {
        this.elementId = this.bindElement(elementId);
        if (typeof elementId === "undefined") {
            return;
        }
    }
    bindElement(elementToFindById) {
        const element = document.getElementById(elementToFindById);
        console.log(element);
        if (!element) {
            throw new Error(`nie znaleziono elementu ${elementToFindById}`);
        }
        return element;
    }
    changeVisbilityOfGivenElement(element, flag) {
        flag ?
            element === null || element === void 0 ? void 0 : element.classList.remove(HIDDEN) :
            element === null || element === void 0 ? void 0 : element.classList.add(HIDDEN);
    }
}
