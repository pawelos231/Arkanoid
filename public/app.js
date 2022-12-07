/*
const piec: number = 5
const fetchVars =async() =>{
 await fetch("http://localhost:8081/handler").then((res: Response) => res.json()).then(data => console.log(data))
}
fetchVars()

*/
var _a, _b;
import { menu } from './modules/mainMenu.js';
import { ValidateInput } from './helpers/InputValidation.js';
(_a = document.querySelector(".formToRegister")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputs = document.querySelectorAll(".reginp");
    inputs.forEach(item => {
        if (ValidateInput(item.value)) {
            console.log("wszystko gra");
        }
    });
});
(_b = document.querySelector(".checkIfLoginOrRegister")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    console.log(String(this.attributes[0].nodeValue));
});
menu.turnOnAndOffEl();
