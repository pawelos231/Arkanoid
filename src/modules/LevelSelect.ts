import { Common } from "./Common";
const LEVEL_SELECT = "levelSelect"
const MAIN_LEVEL_SELECT_MENU = "mainLevelSelectMenu"
class LevelSelect extends Common {
    constructor(){
        super(LEVEL_SELECT)
    }
    handleOnClickLevel(){
       const levelSelect: HTMLElement = this.bindElementByClass(MAIN_LEVEL_SELECT_MENU)
       const ArrayOfLevels: Element[] = Array.from(levelSelect.children)
       ArrayOfLevels.forEach((item: Element) => {
         item.addEventListener("click", () =>{
            console.log(item)
         })
       })
    }
}
export const levelSelect: LevelSelect = new LevelSelect()