import { PADDLE_WIDTH, PADDLE_HEIGHT } from "../constants/gameState";

interface ReturnTypeCB {
  WIDTH: number;
  HEIGHT: number;
}

export const calculatePaddleDimmensions = (): ReturnTypeCB => {
  let paddleHeight = PADDLE_HEIGHT;
  if (window.innerHeight > 600 && window.innerHeight < 800) {
    paddleHeight = 20;
  }
  if (window.innerHeight < 600) {
    paddleHeight = 15;
  }

  return { WIDTH: window.innerWidth / 8, HEIGHT: paddleHeight };
};
