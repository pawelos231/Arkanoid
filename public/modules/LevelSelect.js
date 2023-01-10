import { Common } from "./Common";
import { canvas } from "./Canvas";
const LEVEL_SELECT = "levelSelect";
const MAIN_LEVEL_SELECT_MENU = "mainLevelSelectMenu";
class LevelSelect extends Common {
    constructor() {
        super(LEVEL_SELECT);
    }
    handleOnClickLevel() {
        const levelSelect = this.bindElementByClass(MAIN_LEVEL_SELECT_MENU);
        const ArrayOfLevels = Array.from(levelSelect.children);
        ArrayOfLevels.forEach((item) => {
            item.addEventListener("click", () => {
                canvas.draw();
            });
        });
    }
}
export const levelSelect = new LevelSelect();
