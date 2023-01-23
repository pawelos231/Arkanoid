import { Common } from "./Common";
import { Canvas } from "./Canvas";
import { colorRandomizer } from "../helpers/colorRandomizer";
import { loader } from "./Loader";
const MAIN_LEVEL_SELECT_MENU = "mainLevelSelectMenu";
const LEVEL_SELECT = "levelSelect";
const LEVEL = 1;
const POINTS_TO_GET = 24;
const LIVES = 3;
class LevelSelect extends Common {
    constructor() {
        super(LEVEL_SELECT);
    }
    fetchLevels() {
    }
    handleOnClickLevel() {
        const levelSelect = this.bindElementByClass(MAIN_LEVEL_SELECT_MENU);
        Array.from(levelSelect.children).forEach((item) => {
            item.addEventListener("click", async () => {
                const canvas = new Canvas(LEVEL, POINTS_TO_GET, LIVES);
                const tabOfColors = [];
                for (let i = 0; i < 3; i++) {
                    tabOfColors.push(colorRandomizer());
                }
                const images = await loader.loadImage("https://cdn2.thecatapi.com/images/4vg.jpg");
                const isSpecial = Math.floor(Math.random() * 1);
                const randomBrick = Math.floor(Math.random() * 24);
                setInterval(() => {
                    canvas.draw(tabOfColors, { isSpecial: isSpecial == 0, randomBrick });
                }, 20);
                canvas.setListenerMovePaddle();
            });
        });
    }
}
export const levelSelect = new LevelSelect();
