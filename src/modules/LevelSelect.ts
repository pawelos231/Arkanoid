import { Common } from "./Common";
import { Canvas } from "./Canvas";
import { tabOfBrickData } from "../data/tabOfBrickData";
import { loader } from "./Loader";
import { Fetcher } from "../helpers/Fetcher";
import { GameOver } from "./GameOver";
import { GET_LEVELS_URL, GET_MOD_LEVELS_URL } from "../constants/api/Urls";
import { LevelData } from "../interfaces/level";
import { REFRESH_RATE_MS } from "../constants/gameState";
import { GameEndStatus } from "../interfaces/HelperEnums";
import { KRZYSIU_SPECIAL_IMAGE } from "../data/SpecialImages";

const MAIN_LEVEL_SELECT_MENU = "mainLevelSelectMenu"
const POINTS_TO_GET = 10000000

class LevelSelect extends Common {
  constructor() {
    super()
  }

  public async fetchLevels() {
    console.log(await Fetcher.FetchData<string>(GET_MOD_LEVELS_URL))
    return Fetcher.FetchData<string>(GET_LEVELS_URL)
  }


  private DrawOnCanvas(canvas: Canvas) {

    const interval = setInterval(() => {
      const {end, status,points,level } = canvas.draw()
      if (end) {
        clearInterval(interval)
        switch (status) {
          case GameEndStatus.Win: {

            const gameOver: GameOver = new GameOver(points, status, 10, level)
            gameOver.ShowUserScreenOver()
            gameOver.SendUserLevelData()
            break;

          }

          case GameEndStatus.Loss: {

            const gameOver: GameOver = new GameOver(points, status, 10, level)
            gameOver.ShowUserScreenOver()
            console.log("przegrałeś")
            break;
            
          }
  
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

        const image: HTMLImageElement = await loader.loadImage(KRZYSIU_SPECIAL_IMAGE.src)

        const canvas: Canvas = 
        new Canvas(level, 
          POINTS_TO_GET, 
          lives, 
          image, 
          numberOfRows, 
          numberOfColumns)

        canvas.configureCanvas(tabOfBrickData(), true, randomBrick)

        canvas.addEventOnResize()
        canvas.setListenerMovePaddle()

        this.DrawOnCanvas(canvas)
      }


      else {
        const canvas: Canvas = 
        new Canvas(level, 
          POINTS_TO_GET, 
          lives, 
          null, 
          numberOfRows, 
          numberOfColumns)

        canvas.configureCanvas(tabOfBrickData(), false)

        canvas.addEventOnResize()
        
        this.DrawOnCanvas(canvas)

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