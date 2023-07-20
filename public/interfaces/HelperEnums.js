import { LEFT_ARROW, LEFT_NORMAL, RIGHT_ARROW, RIGHT_NORMAL, } from "../constants/gameState";
export var Logger;
(function (Logger) {
    Logger[Logger["Message"] = 0] = "Message";
    Logger[Logger["Warn"] = 1] = "Warn";
    Logger[Logger["Error"] = 2] = "Error";
})(Logger || (Logger = {}));
export var GameEndStatus;
(function (GameEndStatus) {
    GameEndStatus[GameEndStatus["Win"] = 1] = "Win";
    GameEndStatus[GameEndStatus["Loss"] = 0] = "Loss";
})(GameEndStatus || (GameEndStatus = {}));
export var MediaEnum;
(function (MediaEnum) {
    MediaEnum["Sounds"] = "sounds";
    MediaEnum["Music"] = "music";
})(MediaEnum || (MediaEnum = {}));
export var Directions;
(function (Directions) {
    Directions[Directions["LeftArrows"] = 65] = "LeftArrows";
    Directions[Directions["LeftNormal"] = 37] = "LeftNormal";
    Directions[Directions["RigthArrows"] = 68] = "RigthArrows";
    Directions[Directions["RigthNormal"] = 39] = "RigthNormal";
})(Directions || (Directions = {}));
export var BuffTypes;
(function (BuffTypes) {
    BuffTypes[BuffTypes["PaddleSpeed"] = 0] = "PaddleSpeed";
    BuffTypes[BuffTypes["AddLive"] = 1] = "AddLive";
    BuffTypes[BuffTypes["SpeedBuff"] = 2] = "SpeedBuff";
    BuffTypes[BuffTypes["InvincibilityBuff"] = 3] = "InvincibilityBuff";
    BuffTypes[BuffTypes["DestroyerBuff"] = 4] = "DestroyerBuff";
})(BuffTypes || (BuffTypes = {}));
export var StatusOfSong;
(function (StatusOfSong) {
    StatusOfSong[StatusOfSong["Succes"] = 2] = "Succes";
    StatusOfSong[StatusOfSong["AlreadyPlaying"] = 1] = "AlreadyPlaying";
    StatusOfSong[StatusOfSong["Error"] = 0] = "Error";
})(StatusOfSong || (StatusOfSong = {}));
export var PaginatorPages;
(function (PaginatorPages) {
    PaginatorPages[PaginatorPages["LastNotFullPage"] = 0] = "LastNotFullPage";
    PaginatorPages[PaginatorPages["NormalPage"] = 1] = "NormalPage";
})(PaginatorPages || (PaginatorPages = {}));
