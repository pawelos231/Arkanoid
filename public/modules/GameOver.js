import { Common } from "./Common";
import { Fetcher } from "../helpers/Fetcher";
import { SEND_STATS_ABOUT_GAME } from "../constants/api/Urls";
const INNER_GAME_OVER = "innerGameOver";
export class GameOver extends Common {
    constructor(points, status, elapsedTime, level) {
        super("GameOver");
        Object.freeze(this.LevelInfo = { points, status, elapsedTime, level });
    }
    async SendUserLevelData() {
        const fetcher = new Fetcher(null);
        fetcher.sendDataToBackend(SEND_STATS_ABOUT_GAME, this.LevelInfo);
    }
    ShowUserScreenOver() {
        this.changeVisbilityOfGivenElement(this.elementId, true);
    }
    hideScreen() {
        this.changeVisbilityOfGivenElement(this.elementId, false);
    }
    createView() {
        const innerElement = this.bindElementByClass(INNER_GAME_OVER);
        innerElement.textContent = "";
        this.LevelInfo.status == 1 ? innerElement.style.border = "2px solid green" : innerElement.style.border = "2px solid red";
    }
}
