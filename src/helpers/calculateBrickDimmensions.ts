interface ReturnTypeCB {
  WIDTH: number;
  HEIGHT: number;
}

export const calculateBrickDimmenssions = (
  rowsCount: number,
  columnsCount: number
): ReturnTypeCB => {
  console.log(rowsCount, columnsCount);
  let HEIGHT = 0;
  const WIDTH = window.innerWidth / columnsCount;
  if (rowsCount > 7 && rowsCount <= 10) {
    const maxBrickHeight = Math.floor(window.innerHeight / 3.5);
    const calculatedBrickHeight = Math.floor(maxBrickHeight / rowsCount);
    HEIGHT = calculatedBrickHeight;
    return { WIDTH, HEIGHT };
  }

  if (rowsCount > 5 && rowsCount <= 7) {
    const maxBrickHeight = Math.floor(window.innerHeight / 4);
    const calculatedBrickHeight = Math.floor(maxBrickHeight / rowsCount);
    HEIGHT = calculatedBrickHeight;
    return { WIDTH, HEIGHT };
  } else {
    const maxBrickHeight = Math.floor(window.innerHeight / 5);
    const calculatedBrickHeight = Math.floor(maxBrickHeight / rowsCount);
    console.log(window.innerHeight);
    HEIGHT = calculatedBrickHeight;
    return { WIDTH, HEIGHT };
  }
};
