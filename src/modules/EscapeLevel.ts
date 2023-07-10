import { Common } from "./Common";
import { EcapeViewInterface } from "../interfaces/classesInterfaces";

const INNER_GAME_OVER = "innerEscape";

export class EscapeView extends Common<true> implements EcapeViewInterface {
  constructor() {
    super("EscapeLevel");
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

    innerElement.innerHTML = "";
    innerElement.innerHTML += `<h2 class="info">Leave Level</h2>`;
  }
}
