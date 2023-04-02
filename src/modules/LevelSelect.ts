import { Common } from "./Common";
import { Canvas } from "./Canvas";
import { tabOfBrickData } from "../data/tabOfBrickData";
import { loader } from "./Loader";
import { Fetcher } from "../helpers/Fetcher";
import { GameOver } from "./GameOver";
import { FETCH_LEVELS } from "../constants/api/Urls";
import { LevelData } from "../interfaces/level";
import { REFRESH_RATE_MS } from "../constants/gameState";


const MAIN_LEVEL_SELECT_MENU = "mainLevelSelectMenu"
const POINTS_TO_GET = 10000000
const TEMP_SPECIAL_IMG = "http://localhost:1234/Krzysiu.a065cfe0.png"

class LevelSelect extends Common {
  constructor() {
    super()
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
            console.log("przegrałeś")
            break;
        }
      }
    }, REFRESH_RATE_MS)
    
  }


  private createLevel(item: Element, levelData: LevelData): void {
    
    item.addEventListener("click", async () => {

      const MenuCanvas = this.bindElementByClass("webgl")

      this.changeVisbilityOfGivenElement(MenuCanvas, false)
      
      const isSpecialLevel: number = Math.floor(Math.random() * 1)

      const {level, lives, numberOfColumns, numberOfRows, timer } = levelData

      if (isSpecialLevel == 0) {

        const randomBrick: number = 
        Math.floor(Math.random() * ((numberOfColumns-1) * (numberOfRows - 1)))

        const image: HTMLImageElement = await loader.loadImage(TEMP_SPECIAL_IMG)

        const canvas: Canvas<HTMLImageElement> = 
        new Canvas<HTMLImageElement>(level, 
          POINTS_TO_GET, 
          lives, 
          image, 
          numberOfRows, 
          numberOfColumns)

        canvas.configureCanvas(tabOfBrickData(), true, randomBrick)

        canvas.addEventOnResize()
        canvas.setListenerMovePaddle()

        this.DrawOnCanvas<HTMLImageElement>(canvas)
      }


      else {
        const canvas: Canvas<null> = 
        new Canvas<null>(level, 
          POINTS_TO_GET, 
          lives, 
          null, 
          numberOfRows, 
          numberOfColumns)

        canvas.configureCanvas(tabOfBrickData(), false)

        canvas.addEventOnResize()
        
        this.DrawOnCanvas<null>(canvas)

        canvas.setListenerMovePaddle()
      }

    })
  }

  private createViewForLevels(
    levelData: LevelData, 
    parentNode: HTMLElement): void {

    let div: HTMLDivElement = document.createElement("div")

    div.textContent = String(levelData.level)

    parentNode.appendChild(div)

    this.createLevel(div as Element, levelData)

  }
  
  public async handleOnClickLevel(): Promise<void> {

    const levelData: LevelData[] = JSON.parse(await this.fetchLevels())

    const levelSelect: HTMLElement = 
    this.bindElementByClass(MAIN_LEVEL_SELECT_MENU)
    
    levelSelect.textContent = ""

    levelData.forEach((item: LevelData, i: number) => {
        this.createViewForLevels(item, levelSelect)
    })
    
  }

}
export const levelSelect: LevelSelect = new LevelSelect()