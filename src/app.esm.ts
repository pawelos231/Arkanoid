const piec: number = 5
const fetchVars =async() =>{
 await fetch("http://localhost:8081/handler").then((res: Response) => res.json()).then(data => console.log(data))
}
fetchVars()

import {menu} from './modules/mainMenu.esm.js'
menu.turnOnAndOffEl()
console.log(menu)