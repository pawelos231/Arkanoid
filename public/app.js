/*
const piec: number = 5
const fetchVars =async() =>{
 await fetch("http://localhost:8081/handler").then((res: Response) => res.json()).then(data => console.log(data))
}
fetchVars()

*/
var _a;
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
menu.turnOnAndOffEl();
