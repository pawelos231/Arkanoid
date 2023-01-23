import { Common } from "./Common";
import { Canvas } from "./Canvas";
import { colorRandomizer } from "../helpers/colorRandomizer";

const MAIN_LEVEL_SELECT_MENU = "mainLevelSelectMenu"
const LEVEL_SELECT = "levelSelect"
class LevelSelect extends Common {
  constructor() {
    super(LEVEL_SELECT)
  }
  fetchLevels() {

  }
  handleOnClickLevel(): void {
    const levelSelect: HTMLElement = this.bindElementByClass(MAIN_LEVEL_SELECT_MENU)
    Array.from(levelSelect.children).forEach((item: Element) => {
      item.addEventListener("click", () => {
        const canvas: Canvas = new Canvas(1, 24, 3)
        const tabOfColors: Array<string> = []
        for (let i = 0; i < 3; i++) {
          tabOfColors.push(colorRandomizer())
        }
        setInterval(() => { canvas.draw(tabOfColors) }, 20)
        canvas.setListenerMovePaddle()
      })
    })
  }
}
export const levelSelect: LevelSelect = new LevelSelect()