import { Common } from "./Common";
import { Canvas } from "./Canvas";
const LEVEL_SELECT = "levelSelect";
import { colorRandomizer } from "../helpers/colorRandomizer";
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
                const canvas = new Canvas(1, 24);
                const tabOfColors = [];
                for (let i = 0; i < 3; i++) {
                    tabOfColors.push(colorRandomizer());
                }
                setInterval(() => { canvas.draw(tabOfColors); }, 20);
                canvas.setListenerMovePaddle();
            });
        });
    }
}
export const levelSelect = new LevelSelect();
