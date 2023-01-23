export interface Paddle_Pos {
    paddle_y: number,
    paddle_x: number
}
export interface brickState {
    x: number
    y: number
    status: number
    special: Specialbrick
}
export interface Ball_Pos {
    ball_x: number
    ball_y: number
}
export interface Specialbrick {
    isSpecial: boolean
    randomBrick: number
}