import { Common } from "./Common";
import { Canvas } from "./Canvas";
import { tabOfBrickData } from "../data/tabOfBrickData";
import { loader } from "./Loader";
import { Fetcher } from "../helpers/Fetcher";
import { GameOver } from "./GameOver";
import { GET_MOD_LEVELS_URL } from "../constants/api/Urls";
import { REFRESH_RATE_MS } from "../constants/gameState";
import { GameEndStatus } from "../interfaces/HelperEnums";
import { KRZYSIU_SPECIAL_IMAGE } from "../data/SpecialImages";
const MAIN_LEVEL_SELECT_MENU = "mainLevelSelectMenu";
const POINTS_TO_GET = 10000000;
class LevelSelect extends Common {
    constructor() {
        super();
    }
    async fetchLevels() {
        return Fetcher.FetchData(GET_MOD_LEVELS_URL);
    }
    DrawOnCanvas(canvas) {
        const interval = setInterval(() => {
            const { end, status, points, level } = canvas.draw();
            if (end) {
                clearInterval(interval);
                switch (status) {
                    case GameEndStatus.Win: {
                        const gameOver = new GameOver(points, status, 10, level);
                        gameOver.ShowUserScreenOver();
                        gameOver.SendUserLevelData();
                        break;
                    }
                    case GameEndStatus.Loss: {
                        const gameOver = new GameOver(points, status, 10, level);
                        gameOver.ShowUserScreenOver();
                        console.log("przegrałeś");
                        break;
                    }
                }
            }
        }, REFRESH_RATE_MS);
    }
    createLevel(item, levelData) {
        item.addEventListener("click", async () => {
            const MenuCanvas = this.bindElementByClass("webgl");
            this.changeVisbilityOfGivenElement(MenuCanvas, false);
            const isSpecialLevel = Math.floor(Math.random() * 1);
            const { level, levelName, lives, bossLevel, brickArray, numberOfRows, numberOfColumns, timer, requiredScore, description, highScore, } = levelData;
            const randomBrick = Math.floor(Math.random() * ((numberOfColumns - 1) * (numberOfRows - 1)));
            const image = isSpecialLevel === 0
                ? await loader.loadImage(KRZYSIU_SPECIAL_IMAGE.src)
                : null;
            const canvas = new Canvas(level, POINTS_TO_GET, lives, image, numberOfRows, numberOfColumns);
            canvas.configureCanvas(tabOfBrickData(), true, randomBrick);
            canvas.addEventOnResize();
            canvas.setListenerMovePaddle();
            this.DrawOnCanvas(canvas);
        });
    }
    createLevelDescription(info, levelData) {
        info.addEventListener("click", () => {
            const modal = this.bindElementByClass("modalLevelInfo");
            this.changeVisbilityOfGivenElement(modal, true);
            modal.textContent = "";
            const close = document.createElement("div");
            close.className = "close";
            close.textContent = "X";
            modal.appendChild(close);
            close.addEventListener("click", () => {
                this.changeVisbilityOfGivenElement(modal, false);
            });
            for (const [key, value] of Object.entries(levelData)) {
                if (Array.isArray(value))
                    return;
                const infoEl = document.createElement("div");
                infoEl.textContent = `${key}: ${value}`;
                modal.appendChild(infoEl);
            }
        });
    }
    createViewForLevels(levelData, parentNode) {
        const divChild = document.createElement("div");
        const divParent = document.createElement("div");
        const p = document.createElement("p");
        divChild.textContent = String(levelData.level);
        p.textContent = "Level info";
        parentNode.appendChild(divParent);
        divParent.appendChild(p);
        divParent.appendChild(divChild);
        this.createLevel(divChild, levelData);
        this.createLevelDescription(p, levelData);
    }
    async handleOnClickLevel() {
        const levelData = (await this.fetchLevels());
        console.log(levelData);
        const levelSelect = this.bindElementByClass(MAIN_LEVEL_SELECT_MENU);
        levelSelect.textContent = "";
        levelData.forEach((item, i) => {
            this.createViewForLevels(item, levelSelect);
        });
    }
}
export const levelSelect = new LevelSelect();
