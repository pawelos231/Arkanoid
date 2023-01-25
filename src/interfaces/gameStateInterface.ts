export interface Paddle_Pos {
    paddle_y: number,
    paddle_x: number
}
export interface BrickState {
    brick_x: number
    brick_y: number
    status: number
    special: Specialbrick | null
}
export interface Ball_Pos {
    ball_x: number
    ball_y: number
}
export interface Specialbrick {
    randomBrick: number | null
    Position: Pick<BrickState, "brick_x" | "brick_y"> | null
}