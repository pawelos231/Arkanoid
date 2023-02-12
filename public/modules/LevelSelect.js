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
const LEVEL = 1;
const POINTS_TO_GET = 24;
const LIVES = 30;
const BRICK_ROWS_COUNT = 3;
const BRICK_COLUMN_COUNT = 8;
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
            const draw = canvas.draw();
            if (!draw.end) {
                clearInterval(interval);
                const state = canvas.getGameState;
                switch (draw.status) {
                    case 1:
                        {
                            const gameOver = new GameOver(state.counter, 1, 10, state.level);
                            gameOver.ShowUserScreenOver();
                            gameOver.SendUserLevelData();
                        }
                        break;
                    case 0:
                        const gameOver = new GameOver(state.counter, 0, 10, state.level);
                        gameOver.ShowUserScreenOver();
                        console.log("przgrałeś");
                        break;
                }
            }
        }, 17);
    }
    createLevel(item, i, levelData) {
        const tempLevelsData = JSON.parse(String(levelData));
        item.addEventListener("click", async () => {
            const random = tempLevelsData[Math.floor(Math.random() * 2)];
            const isSpecialLevel = Math.floor(Math.random() * 2);
            if (isSpecialLevel == 0) {
                const randomBrick = Math.floor(Math.random() * 24);
                const image = await loader.loadImage("http://localhost:1234/Krzysiu.a065cfe0.png");
                const canvas = new Canvas(random.level, POINTS_TO_GET, random.lives, image, random.numberOfRows, random.numberOfColumns);
                canvas.configureCanvas(tabOfBrickData(), isSpecialLevel == 0, { randomBrick, Position: { brick_x: -10, brick_y: -10 } });
                canvas.addEventOnResize();
                canvas.setListenerMovePaddle();
                this.DrawOnCanvas(canvas);
            }
            else {
                const random = tempLevelsData[Math.floor(Math.random() * 2)];
                console.log(random.numberOfColumns);
                const canvas = new Canvas(random.level, POINTS_TO_GET, random.lives, null, random.numberOfRows, random.numberOfColumns);
                canvas.configureCanvas(tabOfBrickData(), false, { randomBrick: null, Position: null });
                canvas.addEventOnResize();
                console.log(canvas.getGameState);
                this.DrawOnCanvas(canvas);
                canvas.setListenerMovePaddle();
            }
        });
    }
    handleOnClickLevel(levelData) {
        const levelSelect = this.bindElementByClass(MAIN_LEVEL_SELECT_MENU);
        Array.from(levelSelect.children).forEach((item, i) => this.createLevel(item, i, levelData));
    }
}
export const levelSelect = new LevelSelect();
