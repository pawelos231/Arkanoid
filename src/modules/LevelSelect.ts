import { Common } from "./Common";
import { Canvas } from "./Canvas";
import { tabOfBrickData } from "../data/tabOfBrickData";
import { loader } from "./Loader";
import { Fetcher } from "../helpers/Fetcher";
import { GameOver } from "./GameOver";
import { FETCH_LEVELS } from "../constants/api/Urls";
import { LevelData } from "../interfaces/level";
const MAIN_LEVEL_SELECT_MENU = "mainLevelSelectMenu"
const LEVEL_SELECT = "levelSelect"
//temporary data for levels
const POINTS_TO_GET = 24

class LevelSelect extends Common {
  constructor() {
    super(LEVEL_SELECT)
  }
  public async fetchLevels() {
    const fetcher = new Fetcher(null)
    return fetcher.FetchData<string>(FETCH_LEVELS)
  }

  private DrawOnCanvas<T>(canvas: Canvas<T>) {
    const interval = setInterval(() => {
      const {end, status,points,level } = canvas.draw()
      if (!end) {
        clearInterval(interval)
        switch (status) {
          case 1: {
            const gameOver: GameOver = new GameOver(points, status, 10, level)
            gameOver.ShowUserScreenOver()
            gameOver.SendUserLevelData()
          }
            break;
          case 0:
            const gameOver: GameOver = new GameOver(points, status, 10, level)
            gameOver.ShowUserScreenOver()
            console.log("przgrałeś")
            break;
        }
      }
    }, 17)
  }

  private createLevel(item: Element, i: number, levelData: string) {
  const tempLevelsData: LevelData[] = JSON.parse(String(levelData))
    item.addEventListener("click", async () => {
      const randomLevel = Math.floor(Math.random()*tempLevelsData.length)
      console.log(randomLevel)
      const random: LevelData = tempLevelsData[randomLevel]
      const isSpecialLevel: number = Math.floor(Math.random() * 1)

      if (isSpecialLevel == 0) {

        const randomBrick: number = Math.floor(Math.random() * 24)

        const image: HTMLImageElement = await loader.loadImage("http://localhost:1234/Krzysiu.a065cfe0.png")

        const canvas: Canvas<HTMLImageElement> = new Canvas<HTMLImageElement>(random.level, POINTS_TO_GET, random.lives, image, random.numberOfRows, random.numberOfColumns)

        canvas.configureCanvas(tabOfBrickData(), isSpecialLevel == 0, { randomBrick, Position: { brick_x: -10, brick_y: -10 } })

        canvas.addEventOnResize()
        canvas.setListenerMovePaddle()

        this.DrawOnCanvas<HTMLImageElement>(canvas)
      }


      else {
        const random: LevelData = tempLevelsData[Math.floor(Math.random()*2)]

        const canvas: Canvas<null> = new Canvas<null>(random.level, POINTS_TO_GET, random.lives, null, random.numberOfRows, random.numberOfColumns)

        canvas.configureCanvas(tabOfBrickData(), false, { randomBrick: null, Position: null })

        canvas.addEventOnResize()

        console.log(canvas.getGameState)
        this.DrawOnCanvas<null>(canvas)

        canvas.setListenerMovePaddle()
      }

    })
  }

  public async handleOnClickLevel(): Promise<void> {
    const levelData: string = await this.fetchLevels()
    const levelSelect: HTMLElement = this.bindElementByClass(MAIN_LEVEL_SELECT_MENU)

    Array.from(levelSelect.children).forEach((item: Element, i: number) => this.createLevel(item, i, levelData))
  }

}
export const levelSelect: LevelSelect = new LevelSelect()