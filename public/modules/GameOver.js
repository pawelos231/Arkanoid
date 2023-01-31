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
        this.createView();
    }
    hideScreen() {
        this.changeVisbilityOfGivenElement(this.elementId, false);
    }
    createView() {
        const innerElement = this.bindElementByClass(INNER_GAME_OVER);
        innerElement.innerHTML += "<h2>Wygrałeś !</h2>";
        innerElement.innerHTML += "</br>";
        innerElement.innerHTML += "<p>Statystyki gry: </p>";
        innerElement.innerHTML += `<ul> <li>Zdobyte punkty: ${this.LevelInfo.points}</li><li>czas gry: ${this.LevelInfo.elapsedTime}</li></ul>`;
        innerElement.innerHTML += "<button>Powrót do menu</button>";
        this.LevelInfo.status == 1 ? innerElement.style.border = "2px solid green" : innerElement.style.border = "2px solid red";
    }
}