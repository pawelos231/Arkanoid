export const LEFT_ARROW = 65;
export const LEFT_NORMAL = 37;
export const RIGHT_ARROW = 68;
export const RIGHT_NORMAL = 39;
export const ESCAPE = 27;
export const PADDLE_WIDTH = 200;
export const PADDLE_HEIGHT = 25;
export const INIT_PADDLE_POS = {
    paddle_y: window.innerHeight - 40,
    paddle_x: window.innerWidth / 2 - 100,
};
export const INIT_BALL_POS = {
    ball_x: window.innerWidth / 2 + 12.5,
    ball_y: window.innerHeight - 100,
};
export const DEFAULT_BRICK_HEIGHT = 0;
export const DEFAULT_BRICK_WIDTH = 0;
export const DEFAULT_BALL_MOVEMENT_Y_SPEED = -12;
export const DEFAULT_BALL_MOVEMENT_X_SPEED = -12;
export const NO_SPECIAL_BRICK_INDEX = -100;
export const DEFAULT_PADDLE_MOVEMENT_X = 15;
export const BUFF_EXPIRATION = 5000;
export const DEFAULT_BALL_SPEED_MULTIPLIER = 1.5;
export const DEFAULT_PADDLE_SPEED_MULTIPLIER = 2;
export let BRICK_HEIGHT = window.innerHeight / 18;
export let BRICK_WIDTH = window.innerWidth / 8;
export const REFRESH_RATE_MS = 17;
export const DESTROYER_BUFF_SOUND = "http://localhost:1234/destroyer.mp3";
export const ADD_LIVE_BUFF_SOUND = "http://localhost:1234/addLive.mp3";
export const PADDLE_SPEED_BUFF_SOUND = "http://localhost:1234/paddleSpeed.mp3";
export const SPEED_BUFF_SOUND = "http://localhost:1234/speedBuff.mp3";
export const INVINCIBILITY_BUFF_SOUND = "http://localhost:1234/Invincibility.mp3";
export const SPECIAL_BRICK_1 = "http://localhost:1234/cotomabyc.mp3";
