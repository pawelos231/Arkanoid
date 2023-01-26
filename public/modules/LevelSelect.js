import { Common } from "./Common";
import { Canvas } from "./Canvas";
import { colorRandomizer } from "../helpers/colorRandomizer";
import { loader } from "./Loader";
const MAIN_LEVEL_SELECT_MENU = "mainLevelSelectMenu";
const LEVEL_SELECT = "levelSelect";
const LEVEL = 1;
const POINTS_TO_GET = 24;
const LIVES = 3;
const BRICK_ROWS_COUNT = 3;
const BRICK_COLUMN_COUNT = 8;
class LevelSelect extends Common {
    constructor() {
        super(LEVEL_SELECT);
    }
    fetchLevels() {
    }
    delay(ms) {
        return new Promise((res, rej) => setTimeout(res, ms));
    }
    handleOnClickLevel() {
        const levelSelect = this.bindElementByClass(MAIN_LEVEL_SELECT_MENU);
        Array.from(levelSelect.children).forEach((item) => {
            item.addEventListener("click", async () => {
                const tabOfColors = [];
                for (let i = 0; i < 3; i++) {
                    tabOfColors.push(colorRandomizer());
                }
                const isSpecialLevel = Math.floor(Math.random() * 1);
                if (isSpecialLevel == 0) {
                    const randomBrick = Math.floor(Math.random() * 24);
                    const image = await loader.loadImage("http://localhost:1234/Krzysiu.a065cfe0.png");
                    const canvas = new Canvas(LEVEL, POINTS_TO_GET, LIVES, image, BRICK_ROWS_COUNT, BRICK_COLUMN_COUNT);
                    canvas.configureCanvas();
                    canvas.addEventOnResize();
                    setInterval(() => {
                        canvas.draw(tabOfColors, isSpecialLevel == 0, { randomBrick, Position: { brick_x: -10, brick_y: -10 } });
                    }, 20);
                    canvas.setListenerMovePaddle();
                }
                else {
                    const canvas = new Canvas(LEVEL, POINTS_TO_GET, LIVES, null, BRICK_ROWS_COUNT, BRICK_COLUMN_COUNT);
                    canvas.configureCanvas();
                    canvas.addEventOnResize();
                    setInterval(() => {
                        canvas.draw(tabOfColors, false, { randomBrick: null, Position: null });
                    }, 20);
                    canvas.setListenerMovePaddle();
                }
            });
        });
    }
}
export const levelSelect = new LevelSelect();
