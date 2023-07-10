import { GameState } from "../modules/gameState";

export interface GameOverInterface {
  SendUserLevelData: () => void;
  ShowUserScreenOver: () => void;
  hideScreen: () => void;
}

export interface EcapeViewInterface {
  ShowUserScreenOver: () => void;
  hideScreen: () => void;
}

export interface PaginatorInterface<T> {
  PaginateResults: () => void;
}

export interface BuffsInterface {
  ActivateBuffWrapper: <F extends Function>(arg0: F) => void;
  applyBuffEffects: () => void;
  drawBuff: () => void;
}

export interface ICanvas {
  getGameState: GameState;
  configureCanvas: (isSpecialLevel: boolean, randomBrickIndex?: number) => void;
  addEventOnResize: () => void;
  setListenerMovePaddle: () => void;
}
