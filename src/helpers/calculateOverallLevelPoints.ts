export const calculateOverallPoints = (
  pointsForBricks: number,
  elapsedTime: number,
  level: number
): number => {
  const basePoints: number = pointsForBricks * level;
  const timePoints: number = Math.floor((3600 - elapsedTime) / 5);
  const overallPoints: number = basePoints + timePoints;

  return overallPoints;
};
