import { Common } from "./Common";
import { Fetcher } from "../helpers/Fetcher";
import { SEND_STATS_ABOUT_GAME } from "../constants/api/Urls";
const INNER_GAME_OVER = "innerGameOver";
export class GameOver extends Common {
    constructor(points, status, elapsedTime, level) {
        super("GameOver");
        Object.freeze((this.LevelInfo = { points, status, elapsedTime, level }));
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
        <li>Ilość punktów</li>
        <li>Poziom: ${this.LevelInfo.level}</li>
        <li>Zdobyte punkty: ${this.LevelInfo.points}</li>
        <li>czas gry: ${this.LevelInfo.elapsedTime}</li>
      </ul>
    `;
        innerElement.style.border = this.LevelInfo.status == 1 ? "2px solid green" : "2px solid red";
    }
}
