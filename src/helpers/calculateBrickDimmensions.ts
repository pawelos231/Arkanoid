interface ReturnTypeCB {
  WIDTH: number;
  HEIGHT: number;
}

export const calculateBrickDimmenssions = (
  rowsCount: number,
  columnsCount: number
): ReturnTypeCB => {
  const WIDTH = window.innerWidth / columnsCount;
  if (rowsCount > 7 && rowsCount <= 10) {
    const maxBrickHeight = Math.floor(window.innerHeight / 3.5);
    return { WIDTH, HEIGHT: Math.floor(maxBrickHeight / rowsCount) };
  }

  if (rowsCount > 5 && rowsCount <= 7) {
    const maxBrickHeight = Math.floor(window.innerHeight / 4);
    return { WIDTH, HEIGHT: Math.floor(maxBrickHeight / rowsCount) };
  } else {
    const maxBrickHeight = Math.floor(window.innerHeight / 5);
    return { WIDTH, HEIGHT: Math.floor(maxBrickHeight / rowsCount) };
  }
};
