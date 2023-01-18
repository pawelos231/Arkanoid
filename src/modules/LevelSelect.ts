import { Common } from "./Common";
import { Canvas } from "./Canvas";
const LEVEL_SELECT = "levelSelect"
const MAIN_LEVEL_SELECT_MENU = "mainLevelSelectMenu"
class LevelSelect extends Common {
  constructor() {
    super(LEVEL_SELECT)
  }
  fetchLevels() {

  }
  handleOnClickLevel(): void {
    const levelSelect: HTMLElement = this.bindElementByClass(MAIN_LEVEL_SELECT_MENU)
    const ArrayOfLevels: Element[] = Array.from(levelSelect.children)
    ArrayOfLevels.forEach((item: Element) => {
      item.addEventListener("click", () => {
        const canvas: Canvas = new Canvas()
        canvas.draw()
      })
    })
  }
}
export const levelSelect: LevelSelect = new LevelSelect()