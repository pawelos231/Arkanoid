import {Common} from './Common.js'
class Menu extends Common{
    data: string
    constructor(data: string){
        super("MenuElement")
        this.data = data;
    }
    turnOnAndOffEl(){
        const element: HTMLElement | null = this.bindElement("MenuElement")
        element.addEventListener("click", () =>{
            this.changeVisbilityOfGivenElement(element, false)
        })
    }
}
export const menu: Menu = new Menu('siema')
