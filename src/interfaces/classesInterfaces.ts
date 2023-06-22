import { GameState } from "../modules/gameState";

export interface GameOverInterface {
  SendUserLevelData: () => void;
  ShowUserScreenOver: () => void;
}

export interface PaginatorInterface<T> {
  PaginateResults: () => void;
}

export interface BuffsInterface {
  WrapperIfBuffIsActive: <T extends Function>(arg0: T) => void;
  applyBuffEffects: () => void;
  drawBuff: () => void;
}

export interface ICanvas {
  getGameState: GameState;
  configureCanvas: (isSpecialLevel: boolean, randomBrickIndex?: number) => void;
  addEventOnResize: () => void;
  setListenerMovePaddle: () => void;
}
