import {
  LEFT_ARROW,
  LEFT_NORMAL,
  RIGHT_ARROW,
  RIGHT_NORMAL,
} from "../constants/gameState";

export enum Logger {
  Message = 0,
  Warn = 1,
  Error = 2,
}

export enum GameEndStatus {
  Win = 1,
  Loss = 0,
}

export enum MediaEnum {
  Sounds = "sounds",
  Music = "music",
}


export enum Directions {
  LeftArrows = LEFT_ARROW,
  LeftNormal = LEFT_NORMAL,
  RigthArrows = RIGHT_ARROW,
  RigthNormal = RIGHT_NORMAL,
}

export enum BuffTypes {
  PaddleSpeed = 0,
  AddLive = 1,
  SpeedBuff = 2,
  InvincibilityBuff = 3,
  DestroyerBuff = 4,
}

export interface AppliedBuff {
  timeStart: number;
  timeEnd: number;
  appliedBuffId: BuffTypes;
}

export enum StatusOfSong {
  Succes = 2,
  AlreadyPlaying = 1,
  Error = 0,
}

export enum PaginatorPages {
  LastNotFullPage = 0,
  NormalPage = 1,
}
