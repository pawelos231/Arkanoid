import { Common } from "./Common";
import { Canvas } from "./Canvas";
import { tabOfBrickData } from "../data/tabOfBrickData";
import { loader } from "./Loader";
import { Fetcher } from "../helpers/Fetcher";
import { GameOver } from "./GameOver";
import { GET_LEVELS_URL, GET_MOD_LEVELS_URL } from "../constants/api/Urls";
import { Level } from "../interfaces/level";
import { REFRESH_RATE_MS } from "../constants/gameState";
import { GameEndStatus } from "../interfaces/HelperEnums";
import { KRZYSIU_SPECIAL_IMAGE } from "../data/SpecialImages";

const MAIN_LEVEL_SELECT_MENU = "mainLevelSelectMenu";
const POINTS_TO_GET = 10000000;

class LevelSelect extends Common {
  constructor() {
    super();
  }

  public async fetchLevels(): Promise<Level[]> {
    return Fetcher.FetchData<Level[]>(GET_MOD_LEVELS_URL);
  }

  private DrawOnCanvas(canvas: Canvas): void {
    const interval = setInterval(() => {
      const endLevel = canvas.draw();
      if (!endLevel) return;
      const { end, status, points, level, elapsedTime, reason } = endLevel;
      if (end) {
        clearInterval(interval);
        switch (status) {
          case GameEndStatus.Win: {
            const gameOver: GameOver = new GameOver(
              points,
              status,
              elapsedTime,
              level,
              reason
            );
            gameOver.ShowUserScreenOver();
            gameOver.SendUserLevelData();
            break;
          }
          case GameEndStatus.Loss: {
            const gameOver: GameOver = new GameOver(
              points,
              status,
              elapsedTime,
              level,
              reason
            );
            gameOver.ShowUserScreenOver();
            console.log("przegrałeś");
            break;
          }
        }
      }
    }, REFRESH_RATE_MS);
  }

  private createLevel(item: Element, levelData: Level): void {
    item.addEventListener("click", async () => {
      const MenuCanvas = this.bindElementByClass("webgl");
      this.changeVisbilityOfGivenElement(MenuCanvas, false);

      const isSpecialLevel: number = Math.floor(Math.random() * 1);

      const randomBrick: number = Math.floor(
        Math.random() *
          ((levelData.numberOfColumns - 1) * (levelData.numberOfRows - 1))
      );

      const image: HTMLImageElement | null =
        isSpecialLevel === 0
          ? await loader.loadImage(KRZYSIU_SPECIAL_IMAGE.src)
          : null;

      const canvas: Canvas = new Canvas(image, levelData);

      canvas.configureCanvas(true, randomBrick);
      canvas.addEventOnResize();
      canvas.setListenerMovePaddle();
      this.DrawOnCanvas(canvas);
    });
  }

  private createLevelDescription(info: HTMLElement, levelData: Level): void {
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
        if (Array.isArray(value)) return;
        const infoEl = document.createElement("div");
        infoEl.textContent = `${key}: ${value}`;
        modal.appendChild(infoEl);
      }
    });
  }

  private createViewForLevels(levelData: Level, parentNode: HTMLElement): void {
    const divChild: HTMLDivElement = document.createElement("div");
    const divParent: HTMLDivElement = document.createElement("div");
    const p: HTMLParagraphElement = document.createElement("p");

    divChild.textContent = String(levelData.level);
    p.textContent = "Level info";

    parentNode.appendChild(divParent);
    divParent.appendChild(p);
    divParent.appendChild(divChild);

    this.createLevel(divChild, levelData);
    this.createLevelDescription(p, levelData);
  }

  public async handleOnClickLevel(): Promise<void> {
    const levelData: Level[] = (await this.fetchLevels()) as Level[];
    console.log(levelData);

    const levelSelect: HTMLElement = this.bindElementByClass(
      MAIN_LEVEL_SELECT_MENU
    );

    levelSelect.textContent = "";

    levelData.forEach((item: Level, i: number) => {
      this.createViewForLevels(item, levelSelect);
    });
  }
}

export const levelSelect: LevelSelect = new LevelSelect();
