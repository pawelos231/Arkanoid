import { Common } from "./Common";
import { Canvas } from "./Canvas";
import { colorRandomizer } from "../helpers/colorRandomizer";
import { loader } from "./Loader";

const MAIN_LEVEL_SELECT_MENU = "mainLevelSelectMenu"
const LEVEL_SELECT = "levelSelect"
class LevelSelect extends Common {
  constructor() {
    super(LEVEL_SELECT)
  }
  fetchLevels() {

  }

  public handleOnClickLevel(): void {
    const levelSelect: HTMLElement = this.bindElementByClass(MAIN_LEVEL_SELECT_MENU)
    Array.from(levelSelect.children).forEach((item: Element) => {
      item.addEventListener("click", async () => {
        const canvas: Canvas = new Canvas(1, 24, 3)
        const tabOfColors: Array<string> = []
        for (let i = 0; i < 3; i++) {
          tabOfColors.push(colorRandomizer())
        }
        const images: HTMLImageElement = await loader.loadImage("https://cdn2.thecatapi.com/images/4vg.jpg")
        const isSpecial = Math.floor(Math.random() * 1)
        const randomBrick = Math.floor(Math.random() * 24)
        setInterval(() => {
          canvas.draw(tabOfColors, { isSpecial: isSpecial == 0, randomBrick })
        }, 20)
        canvas.setListenerMovePaddle()
      })
    })
  }
}
export const levelSelect: LevelSelect = new LevelSelect()