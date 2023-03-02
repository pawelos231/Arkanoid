export interface Paddle_Pos {
    paddle_y: number,
    paddle_x: number
}

export interface BrickState {
    brick_x: number
    brick_y: number
    status: number
    specialBrick: boolean
}

export interface BrickPoints {
    color: string
    timesToHit: number
    points: number
}

export interface Ball_Pos {
    ball_x: number
    ball_y: number
}

export interface GameOverStatus {
    level: number
    points: number
    end: boolean
    status: number 
}
