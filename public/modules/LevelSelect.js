import { Common } from "./Common";
import { Canvas } from "./Canvas";
const LEVEL_SELECT = "levelSelect";
const MAIN_LEVEL_SELECT_MENU = "mainLevelSelectMenu";
class LevelSelect extends Common {
    constructor() {
        super(LEVEL_SELECT);
    }
    fetchLevels() {
    }
    handleOnClickLevel() {
        const levelSelect = this.bindElementByClass(MAIN_LEVEL_SELECT_MENU);
        const ArrayOfLevels = Array.from(levelSelect.children);
        ArrayOfLevels.forEach((item) => {
            item.addEventListener("click", () => {
                const canvas = new Canvas();
                //setInterval(() => {canvas.draw()}, 50)
                canvas.draw();
            });
        });
    }
}
export const levelSelect = new LevelSelect();
