export const LEFT_ARROW = 65
export const LEFT_NORMAL = 37
export const RIGHT_ARROW = 68
export const RIGHT_NORMAL = 39
export const PADDLE_WIDTH = 200
export const PADDLE_HEIGHT = 40

export const INIT_PADDLE_POS = { paddle_y: window.innerHeight - 40, paddle_x: window.innerWidth / 2 - 100 }
export const INIT_BALL_POS = {
    ball_x: window.innerWidth / 2, ball_y: window.innerHeight - 150
}

export let BRICK_HEIGHT: number = window.innerHeight / 18
export let BRICK_WIDTH: number = window.innerWidth / 8