import { BLOCKS, TILES_IN_ROW, NUMBER_OF_ROWS } from "./constants.js";

export const getRandomBlock = () => {
  const randomIndex = Math.trunc(Math.random() * Object.keys(BLOCKS).length);
  const randomBlock = Object.values(BLOCKS)[randomIndex];
  return randomBlock;
};

export const makeBlockIntoPosition = (block, positionPoint = 0) => {
  const position = [];

  for (let row = 0; row < block.length; row++) {
    for (const [index, value] of block[row].entries()) {
      if (Number.isInteger(value) || value === true) {
        position.push(index + TILES_IN_ROW * row + positionPoint);
      }
    }
  }
  return position;
};

export const makePositionIntoBlock = (block, position) => {
  const blockWithPosition = Object.assign(block),
    values = [...position];

  for (let row = 0; row < block.length; row++) {
    for (let i = 0; i < block[row].length; i++) {
      blockWithPosition[row][i] = block[row][i] ? values.shift() : block[row][i];
    }
  }
  return blockWithPosition;
};

export const getCompletedRows = fullGrid => {
  const result = [];

  for (let i = 0; i < NUMBER_OF_ROWS; i++) {
    const row = TILES_IN_ROW * i;
    const rowArray = fullGrid.slice(row, row + TILES_IN_ROW);

    if (rowArray.every(tile => tile !== null)) {
      const arr = [];
      rowArray.reduce(tile => {
        arr.push(tile);
        return ++tile;
      }, row);
      result.push(arr);
    }
  }
  return result;
};

export const getFirstTileOfBlock = (block, position) => {
  const positionBlock = makePositionIntoBlock(block, position);

  for (let row = 0; row < positionBlock.length; row++) {
    for (let i = 0; i < positionBlock[row].length; i++) {
      if (Number.isInteger(positionBlock[row][i])) {
        return positionBlock[row][i] - (i + TILES_IN_ROW * row);
      }
    }
  }
};
