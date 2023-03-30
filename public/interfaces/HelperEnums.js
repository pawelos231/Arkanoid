import { LEFT_ARROW, LEFT_NORMAL, RIGHT_ARROW, RIGHT_NORMAL } from "../constants/gameState";
export var Logger;
(function (Logger) {
    Logger[Logger["Message"] = 0] = "Message";
    Logger[Logger["LoginError"] = 1] = "LoginError";
    Logger[Logger["Error"] = 2] = "Error";
})(Logger || (Logger = {}));
export var MediaEnum;
(function (MediaEnum) {
    MediaEnum["Sounds"] = "sounds";
    MediaEnum["Music"] = "music";
})(MediaEnum || (MediaEnum = {}));
export var Directions;
(function (Directions) {
    Directions[Directions["LeftArrows"] = LEFT_ARROW] = "LeftArrows";
    Directions[Directions["LeftNormal"] = LEFT_NORMAL] = "LeftNormal";
    Directions[Directions["RigthArrows"] = RIGHT_ARROW] = "RigthArrows";
    Directions[Directions["RigthNormal"] = RIGHT_NORMAL] = "RigthNormal";
})(Directions || (Directions = {}));
export var BuffTypes;
(function (BuffTypes) {
    BuffTypes[BuffTypes["PaddleSpeed"] = 0] = "PaddleSpeed";
    BuffTypes[BuffTypes["AddLive"] = 1] = "AddLive";
    BuffTypes[BuffTypes["SpeedBuff"] = 2] = "SpeedBuff";
    BuffTypes[BuffTypes["InvincibilityBuff"] = 3] = "InvincibilityBuff";
    BuffTypes[BuffTypes["DestroyerBuff"] = 4] = "DestroyerBuff";
})(BuffTypes || (BuffTypes = {}));
