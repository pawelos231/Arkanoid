var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { HIDDEN } from "../constants/classNames";
import { sealed } from "../decorators/seal";
const REGISTER_FORMS = "RegisterElement";
let Common = class Common {
    constructor(elementId) {
        this.elementId = this.bindElementById(elementId);
        if (typeof elementId === "undefined" || elementId === null)
            return;
    }
    bindElementById(elementToFindById) {
        const element = document.getElementById(elementToFindById);
        if (!element)
            throw new Error(`nie znaleziono elementu ${elementToFindById}`);
        return element;
    }
    bindElementByClass(elementToFindByClass) {
        const element = document.documentElement.querySelector("." + elementToFindByClass);
        if (!element)
            throw new Error(`nie znaleziono elementu ${elementToFindByClass}`);
        return element;
    }
    changeVisbilityOfGivenElement(element, flag) {
        flag ?
            element === null || element === void 0 ? void 0 : element.classList.remove(HIDDEN) :
            element === null || element === void 0 ? void 0 : element.classList.add(HIDDEN);
    }
    bindMultipleElements(elementsTobBind) {
        const elements = document.querySelectorAll("." + elementsTobBind);
        if (!elements)
            throw new Error(`nie znaleziono elementu ${elementsTobBind}`);
        return elements;
    }
    static displayMessageAtTheTopOfTheScreen(message) {
        console.log(message);
    }
    makeLoginPanelInvisible() {
        const RegisterElemement = this.bindElementById(REGISTER_FORMS);
        this.changeVisbilityOfGivenElement(RegisterElemement, false);
    }
};
Common = __decorate([
    sealed
], Common);
export { Common };
