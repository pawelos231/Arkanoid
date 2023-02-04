import { Common } from "./Common";
import { Canvas } from "./Canvas";
import { tabOfBrickData } from "../helpers/tabOfBrickData";
import { loader } from "./Loader";
import { GameOver } from "./GameOver";
const MAIN_LEVEL_SELECT_MENU = "mainLevelSelectMenu"
const LEVEL_SELECT = "levelSelect"
//temporary data for levels
const LEVEL = 1;
const POINTS_TO_GET = 24
const LIVES = 3
const BRICK_ROWS_COUNT = 3
const BRICK_COLUMN_COUNT = 8

class LevelSelect extends Common {
  constructor() {
    super(LEVEL_SELECT)
  }
  fetchLevels() {

  }

  private DrawOnCanvas<T>(canvas: Canvas<T>) {
    const interval = setInterval(() => {
      const draw = canvas.draw()
      if (!draw.end) {
        clearInterval(interval)
        const state = canvas.getGameState
        switch (draw.status) {
          case 1: {
            const gameOver: GameOver = new GameOver(state.counter, 1, 10, state.level)
            gameOver.ShowUserScreenOver()
            gameOver.SendUserLevelData()
          }
            break;
          case 0:
            const gameOver: GameOver = new GameOver(state.counter, 0, 10, state.level)
            gameOver.ShowUserScreenOver()
            console.log("przgrałeś")
            break;
        }
      }
    }, 17)
  }

  private createLevel(item: Element, i: number) {
    item.addEventListener("click", async () => {
      const isSpecialLevel: number = Math.floor(Math.random() * 2)

      if (isSpecialLevel == 0) {
        const randomBrick: number = Math.floor(Math.random() * 24)
        const image: HTMLImageElement = await loader.loadImage("http://localhost:1234/Krzysiu.a065cfe0.png")

        const canvas: Canvas<HTMLImageElement> = new Canvas<HTMLImageElement>(LEVEL, POINTS_TO_GET, LIVES, image, BRICK_ROWS_COUNT, BRICK_COLUMN_COUNT)
        canvas.configureCanvas(tabOfBrickData(), isSpecialLevel == 0, { randomBrick, Position: { brick_x: -10, brick_y: -10 } })
        canvas.addEventOnResize()
        canvas.setListenerMovePaddle()

        this.DrawOnCanvas<HTMLImageElement>(canvas)


      }

      else {
        const canvas: Canvas<null> = new Canvas<null>(LEVEL, POINTS_TO_GET, LIVES, null, BRICK_ROWS_COUNT, BRICK_COLUMN_COUNT)
        canvas.configureCanvas(tabOfBrickData(), false, { randomBrick: null, Position: null })
        canvas.addEventOnResize()
        this.DrawOnCanvas<null>(canvas)
        canvas.setListenerMovePaddle()
      }

    })
  }

  public handleOnClickLevel(): void {
    const levelSelect: HTMLElement = this.bindElementByClass(MAIN_LEVEL_SELECT_MENU)

    Array.from(levelSelect.children).forEach((item: Element, i: number) => this.createLevel(item, i)
    )
  }

}
export const levelSelect: LevelSelect = new LevelSelect()