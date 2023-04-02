var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { HIDDEN } from "../constants/classNames";
import { sealed } from "../decorators/seal";
import { Logger } from "../interfaces/HelperEnums";
const REGISTER_FORMS = "RegisterElement";
let Common = class Common {
    constructor(...elementId) {
        if (elementId && elementId[0]) {
            this.elementId =
                this.bindElementById(elementId[0]);
        }
        else {
            this.elementId = undefined;
        }
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
    displayMessageAtTheTopOfTheScreen(message, status) {
        if (status > 2 || status < 0)
            throw new Error("nieporawny status wiadomości, wprowadź wartości z enuma Errors");
        const messageNode = this.bindElementByClass("MESSAGE");
        if (Logger.Error == status) {
            messageNode.style.color = "red";
        }
        if (status == Logger.Message) {
            messageNode.style.color = "green";
        }
        if (status == Logger.Warn) {
            messageNode.style.color = "orange";
        }
        this.changeVisbilityOfGivenElement(messageNode, true);
        setTimeout(() => {
            this.changeVisbilityOfGivenElement(messageNode, false);
        }, 1500);
        messageNode.textContent = message;
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
