import { LEFT_ARROW, LEFT_NORMAL, RIGHT_ARROW, RIGHT_NORMAL } from "../constants/gameState";

export enum Logger {
    Message = 0,
    LoginError = 1,
    Error = 2,
}

export enum MediaEnum {
    Sounds = "sounds",
    Music = "music"
}

export enum Directions {
    LeftArrows = LEFT_ARROW,
    LeftNormal = LEFT_NORMAL,
    RigthArrows = RIGHT_ARROW,
    RigthNormal = RIGHT_NORMAL,
}