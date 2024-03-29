export type BrickData = {
  rowNumber: number;
  columnNumber: number;
  color: string;
  timesToHit: number;
  points: number;
  buffDropRate: number;
};

export interface Level {
  level: number;
  levelName: string;
  numberOfRows: number;
  numberOfColumns: number;
  lives: number;
  timer: number;
  bossLevel: boolean;
  brickArray: BrickData[];
  description: string;
  highScore: number;
  requiredScore: number;
}

export interface levelError {
  error: string;
}
