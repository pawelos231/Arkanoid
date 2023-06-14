export interface Paddle_Pos {
  paddle_y: number;
  paddle_x: number;
}

export interface BrickState {
  brick_x: number;
  brick_y: number;
  status: number;
  specialBrick: boolean;
}

export interface BrickPoints {
  color: string;
  timesToHit: number;
  points: number;
  buffDropRate: number;
}

export interface Ball_Pos {
  ball_x: number;
  ball_y: number;
}

export interface GameOverStatus {
  level: number;
  points: number;
  end: boolean;
  status: number;
}

export interface IFinishedGame {
  points: number;
  status: number;
  elapsedTime: number;
  level: number;
}

export interface Buff_Pos {
  buff_x: number;
  buff_y: number;
}

export interface Particle {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  size: number;
  color: string;
  lifespan: number;
  createdAt: number;
}
