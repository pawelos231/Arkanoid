import { PADDLE_HEIGHT } from "../constants/gameState";

interface ReturnTypeCB {
  WIDTHP: number;
  HEIGHTP: number;
}

export const calculatePaddleDimmensions = (): ReturnTypeCB => {
  let paddleHeight = PADDLE_HEIGHT;
  if (window.innerHeight > 600 && window.innerHeight < 800) {
    paddleHeight = 20;
  }
  if (window.innerHeight < 600) {
    paddleHeight = 15;
  }

  return { WIDTHP: window.innerWidth / 8, HEIGHTP: paddleHeight / 1.6 };
};
