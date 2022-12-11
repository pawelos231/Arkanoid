/*
const piec: number = 5
const fetchVars =async() =>{
 await fetch("http://localhost:8081/handler").then((res: Response) => res.json()).then(data => console.log(data))
}
fetchVars()

*/
var _a;
import { menu } from './modules/mainMenu.js';
(_a = document.querySelector(".checkIfLoginOrRegister")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    const ValueOfEl = String(this.attributes[0].nodeValue);
});
menu.switchBetweenRegisterAndLogin();
menu.switchStatsModalState();
menu.SendUserDataToBackend();
