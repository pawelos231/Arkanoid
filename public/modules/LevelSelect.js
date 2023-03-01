import { Common } from "./Common";
import { Canvas } from "./Canvas";
import { tabOfBrickData } from "../data/tabOfBrickData";
import { loader } from "./Loader";
import { Fetcher } from "../helpers/Fetcher";
import { GameOver } from "./GameOver";
import { FETCH_LEVELS } from "../constants/api/Urls";
const MAIN_LEVEL_SELECT_MENU = "mainLevelSelectMenu";
const LEVEL_SELECT = "levelSelect";
//temporary data for levels
const POINTS_TO_GET = 24;
const TEMP_SPECIAL_IMG = "http://localhost:1234/Krzysiu.a065cfe0.png";
class LevelSelect extends Common {
    constructor() {
        super(LEVEL_SELECT);
    }
    async fetchLevels() {
        const fetcher = new Fetcher(null);
        return fetcher.FetchData(FETCH_LEVELS);
    }
    DrawOnCanvas(canvas) {
        const interval = setInterval(() => {
            const { end, status, points, level } = canvas.draw();
            if (!end) {
                clearInterval(interval);
                switch (status) {
                    case 1:
                        {
                            const gameOver = new GameOver(points, status, 10, level);
                            gameOver.ShowUserScreenOver();
                            gameOver.SendUserLevelData();
                        }
                        break;
                    case 0:
                        const gameOver = new GameOver(points, status, 10, level);
                        gameOver.ShowUserScreenOver();
                        console.log("przgrałeś");
                        break;
                }
            }
        }, 17);
    }
    createLevel(item, levelData) {
        item.addEventListener("click", async () => {
            const isSpecialLevel = Math.floor(Math.random() * 1);
            const { level, lives, numberOfColumns, numberOfRows, timer } = levelData;
            if (isSpecialLevel == 0) {
                const randomBrick = Math.floor(Math.random() * 24);
                const image = await loader.loadImage(TEMP_SPECIAL_IMG);
                const canvas = new Canvas(level, POINTS_TO_GET, lives, image, numberOfRows, numberOfColumns);
                canvas.configureCanvas(tabOfBrickData(), isSpecialLevel == 0, { randomBrick, Position: { brick_x: -10, brick_y: -10 } });
                canvas.addEventOnResize();
                canvas.setListenerMovePaddle();
                this.DrawOnCanvas(canvas);
            }
            else {
                const canvas = new Canvas(level, POINTS_TO_GET, lives, null, numberOfRows, numberOfColumns);
                canvas.configureCanvas(tabOfBrickData(), false, { randomBrick: null, Position: null });
                canvas.addEventOnResize();
                this.DrawOnCanvas(canvas);
                canvas.setListenerMovePaddle();
            }
        });
    }
    createViewForLevels(levelData, parentNode) {
        let div = document.createElement("div");
        div.textContent = String(levelData.level);
        parentNode.appendChild(div);
        this.createLevel(div, levelData);
    }
    async handleOnClickLevel() {
        const levelData = JSON.parse(await this.fetchLevels());
        const levelSelect = this.bindElementByClass(MAIN_LEVEL_SELECT_MENU);
        levelSelect.textContent = "";
        levelData.forEach((item, i) => {
            this.createViewForLevels(item, levelSelect);
        });
    }
}
export const levelSelect = new LevelSelect();
