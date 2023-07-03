export const calculateBallSize = (): number => {
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  const defaultBallSize = 25;

  const widthRatio = windowWidth / 1920;
  const heightRatio = windowHeight / 1080;
  const ratio = Math.min(widthRatio, heightRatio);

  const ballSize = Math.floor(defaultBallSize * ratio);

  return ballSize;
};
