import { EventListener } from "./EventListener";
import { Directions } from "../../interfaces/HelperEnums";

export class InputController {
  keyPressedLeft: boolean;
  keyPressedRight: boolean;
  eventListener: EventListener;

  constructor(eventListener: EventListener) {
    this.keyPressedLeft = false;
    this.keyPressedRight = false;
    this.eventListener = eventListener;
  }

  public addKeyPressEvents(): void {
    this.eventListener.add(window, "keydown", (event: KeyboardEvent) => {
      const keyCode: number = event.keyCode;
      if (
        keyCode == Directions.LeftArrows ||
        keyCode == Directions.LeftNormal
      ) {
        this.keyPressedLeft = true;
      }
      if (
        keyCode == Directions.RigthArrows ||
        keyCode == Directions.RigthNormal
      ) {
        this.keyPressedRight = true;
      }
    });
    this.eventListener.add(window, "keyup", (event: KeyboardEvent) => {
      const keyCode: number = event.keyCode;

      if (
        keyCode == Directions.LeftArrows ||
        keyCode == Directions.LeftNormal
      ) {
        this.keyPressedLeft = false;
      }
      if (
        keyCode == Directions.RigthArrows ||
        keyCode == Directions.RigthNormal
      ) {
        this.keyPressedRight = false;
      }
    });
  }
}
