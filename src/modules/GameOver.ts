import { Common } from "./Common";
import { GameOverInterface } from "../interfaces/classesInterfaces";
import { Fetcher } from "../helpers/Fetcher";
import { SEND_STATS_ABOUT_GAME } from "../constants/api/Urls";
import { IFinishedGame } from "../interfaces/gameStateInterface";

const INNER_GAME_OVER = "innerGameOver";

export class GameOver extends Common<true> implements GameOverInterface {
  LevelInfo: IFinishedGame;

  constructor(
    points: number,
    status: number,
    elapsedTime: number,
    level: number
  ) {
    super("GameOver");
    Object.freeze((this.LevelInfo = { points, status, elapsedTime, level }));
  }

  public async SendUserLevelData(): Promise<void> {
    Fetcher.sendDataToBackend<IFinishedGame>(
      SEND_STATS_ABOUT_GAME,
      this.LevelInfo
    );
  }

  public ShowUserScreenOver(): void {
    this.changeVisbilityOfGivenElement(this.elementId, true);
    this.createView();
  }

  public hideScreen(): void {
    this.changeVisbilityOfGivenElement(this.elementId, false);
  }

  private createView(): void {
    const innerElement: HTMLElement = this.bindElementByClass(INNER_GAME_OVER);
    if (this.LevelInfo.status == 1) {
      innerElement.innerHTML += `<h2 class="info">Wygrałeś !</h2>`;
    } else if (this.LevelInfo.status == 0) {
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

    innerElement.style.border =
      this.LevelInfo.status == 1 ? "2px solid green" : "2px solid red";
  }
}
