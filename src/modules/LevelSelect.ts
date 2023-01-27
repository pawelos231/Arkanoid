import { Common } from "./Common";
import { Canvas } from "./Canvas";
import { colorRandomizer } from "../helpers/colorRandomizer";
import { loader } from "./Loader";
import { media } from "./Media";
const MAIN_LEVEL_SELECT_MENU = "mainLevelSelectMenu"
const LEVEL_SELECT = "levelSelect"
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

  delay(ms: number) {
    return new Promise((res, rej) => setTimeout(res, ms))
  }

  public handleOnClickLevel(): void {
    const levelSelect: HTMLElement = this.bindElementByClass(MAIN_LEVEL_SELECT_MENU)

    Array.from(levelSelect.children).forEach((item: Element) => {
      item.addEventListener("click", async () => {
        const tabOfColors: string[] = []

        for (let i = 0; i < BRICK_ROWS_COUNT; i++) {
          tabOfColors.push(colorRandomizer())
        }
        const isSpecialLevel: number = Math.floor(Math.random() * 1)
        if (isSpecialLevel == 0) {
          const randomBrick: number = Math.floor(Math.random() * 24)
          const image: HTMLImageElement = await loader.loadImage("http://localhost:1234/Krzysiu.a065cfe0.png")

          const canvas: Canvas<HTMLImageElement> = new Canvas<HTMLImageElement>(LEVEL, POINTS_TO_GET, LIVES, image, BRICK_ROWS_COUNT, BRICK_COLUMN_COUNT)
          canvas.configureCanvas()
          canvas.addEventOnResize()
          setInterval(() => {
            canvas.draw(tabOfColors, isSpecialLevel == 0, { randomBrick, Position: { brick_x: -10, brick_y: -10 } })
          }, 20)
          canvas.setListenerMovePaddle()

        }

        else {
          const canvas: Canvas<null> = new Canvas<null>(LEVEL, POINTS_TO_GET, LIVES, null, BRICK_ROWS_COUNT, BRICK_COLUMN_COUNT)
          canvas.configureCanvas()
          canvas.addEventOnResize()
          setInterval(() => {
            canvas.draw(tabOfColors, false, { randomBrick: null, Position: null })
          }, 20)

          canvas.setListenerMovePaddle()
        }

      })
    })
  }
}
export const levelSelect: LevelSelect = new LevelSelect()