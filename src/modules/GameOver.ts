import { Common } from "./Common";
import { GameOverInterface } from "../interfaces/classesInterfaces";
import { Fetcher } from "../helpers/Fetcher";
import { SEND_STATS_ABOUT_GAME } from "../constants/api/Urls";
import { IFinishedGame } from "../interfaces/gameStateInterface";
import { normalClock } from "../helpers/Clock";
import { calculateOverallPoints } from "../helpers/calculateOverallLevelPoints";

const INNER_GAME_OVER = "innerGameOver";

type IFinishedOmit = Omit<IFinishedGame, "end">;

export class GameOver extends Common<true> implements GameOverInterface {
  LevelInfo: IFinishedOmit;

  constructor(
    points: number,
    status: number,
    elapsedTime: number,
    level: number,
    reason: string
  ) {
    super("GameOver");
    Object.freeze(
      (this.LevelInfo = { points, status, elapsedTime, level, reason })
    );
  }

  public async SendUserLevelData(): Promise<void> {
    Fetcher.sendDataToBackend<IFinishedOmit>(
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
      innerElement.innerHTML += `<h2 class="info">You Won !</h2>`;
    } else if (this.LevelInfo.status == 0) {
      innerElement.innerHTML += `<h2 class="info">You Lost !</h2>`;
    }

    innerElement.innerHTML += `<p class="statsInfo">Your Stats</p>`;
    innerElement.innerHTML += `
      <ul>
        <li>Level: ${this.LevelInfo.level}</li>
        <li>Points for destroyed bricks: ${this.LevelInfo.points}</li>
        <li>game time: ${normalClock(this.LevelInfo.elapsedTime)}</li>
        <li>reason: ${this.LevelInfo.reason}</li>
        <li>earned Points for overall performance: ${calculateOverallPoints(
          this.LevelInfo.points,
          this.LevelInfo.elapsedTime,
          this.LevelInfo.level
        )}</li>
      </ul>
    `;

    innerElement.style.border =
      this.LevelInfo.status == 1 ? "2px solid green" : "2px solid red";

    this.LevelInfo.status === 1
      ? this.elementId.setAttribute("data-status", "1")
      : this.elementId.setAttribute("data-status", "0");
  }
}
