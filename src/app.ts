
/*
const piec: number = 5
const fetchVars =async() =>{
 await fetch("http://localhost:8081/handler").then((res: Response) => res.json()).then(data => console.log(data))
}
fetchVars()

*/

import {menu} from './modules/mainMenu.js'
import {ValidateInput} from './helpers/InputValidation.js'

document.querySelector(".formToRegister")?.addEventListener("submit", (e: any)=>{
	e.preventDefault();    
    const inputs: NodeListOf<any> = document.querySelectorAll(".reginp")
    inputs.forEach(item=>{
        if(ValidateInput(item.value)){
            console.log("wszystko gra")
        }
    })
})


document.querySelector(".checkIfLoginOrRegister")?.addEventListener("click", 
function(this: Element): void{
    const ValueOfEl: string = String(this.attributes[0].nodeValue)
})

menu.switchBetweenRegisterAndLogin()