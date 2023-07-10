import { Common } from "./Common";
import { Fetcher } from "../helpers/Fetcher";
import { SEND_STATS_ABOUT_GAME } from "../constants/api/Urls";
import { normalClock } from "../helpers/Clock";
import { calculateOverallPoints } from "../helpers/calculateOverallLevelPoints";
const INNER_GAME_OVER = "innerGameOver";
export class GameOver extends Common {
    constructor(points, status, elapsedTime, level, reason) {
        super("GameOver");
        Object.freeze((this.LevelInfo = { points, status, elapsedTime, level, reason }));
    }
    async SendUserLevelData() {
        Fetcher.sendDataToBackend(SEND_STATS_ABOUT_GAME, this.LevelInfo);
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
        if (this.LevelInfo.status == 1) {
            innerElement.innerHTML += `<h2 class="info">Wygrałeś !</h2>`;
        }
        else if (this.LevelInfo.status == 0) {
            innerElement.innerHTML += `<h2 class="info">Przegrałeś !</h2>`;
        }
        innerElement.innerHTML += `<p class="statsInfo">Twoje statystyki</p>`;
        innerElement.innerHTML += `
      <ul>
        <li>Poziom: ${this.LevelInfo.level}</li>
        <li>Zdobyte punkty za zbite cegły: ${this.LevelInfo.points}</li>
        <li>czas gry: ${normalClock(this.LevelInfo.elapsedTime)}</li>
        <li>powód: ${this.LevelInfo.reason}</li>
        <li>zdobyte punkty za ogólny wynik: ${calculateOverallPoints(this.LevelInfo.points, this.LevelInfo.elapsedTime, this.LevelInfo.level)}</li>
      </ul>
    `;
        innerElement.style.border =
            this.LevelInfo.status == 1 ? "2px solid green" : "2px solid red";
    }
}
