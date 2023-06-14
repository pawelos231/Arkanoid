import { IFinishedGame } from "../interfaces/gameStateInterface";

export const gameOverStatus = (
  level: number,
  playerPoints: number,
  WIN: boolean,
  lives: number,
  elapsedTime: number,
  timer: number
): IFinishedGame => {
  if (lives == 0 || timer <= 0) {
    return {
      end: true,
      status: 0,
      level: level,
      points: playerPoints,
      elapsedTime: elapsedTime,
      reason:
        Boolean(timer) && !Boolean(lives) ? `out of lives` : `out of time`,
    };
  }

  if (WIN) {
    return {
      end: true,
      status: 1,
      level: level,
      points: playerPoints,
      elapsedTime: elapsedTime,
      reason: "YOU WON",
    };
  }

  return {
    end: false,
    status: 0,
    level: level,
    points: playerPoints,
    elapsedTime: elapsedTime,
    reason: "nothing",
  };
};
