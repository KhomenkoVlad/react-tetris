export const NUMBER_OF_ROWS = 20;
export const TILES_IN_ROW = 10;
export const NUMBER_OF_TILES = NUMBER_OF_ROWS * TILES_IN_ROW;

const _ = false;
const $ = true;
export const BLOCKS = {
  I: {
    0: [[$, $, $, $]],
    90: [
      [_, _, $, _],
      [_, _, $, _],
      [_, _, $, _],
      [_, _, $, _],
    ],
    180: [[$, $, $, $]],
    270: [
      [_, _, $, _],
      [_, _, $, _],
      [_, _, $, _],
      [_, _, $, _],
    ],
    color: "cyan",
  },
  T: {
    0: [
      [_, $, _],
      [$, $, $],
      [_, _, _],
    ],
    90: [
      [_, $, _],
      [$, $, _],
      [_, $, _],
    ],
    180: [
      [_, _, _],
      [$, $, $],
      [_, $, _],
    ],
    270: [
      [_, $, _],
      [_, $, $],
      [_, $, _],
    ],
    color: "purple",
  },
  J: {
    0: [
      [$, _, _],
      [$, $, $],
      [_, _, _],
    ],
    90: [
      [_, $, $],
      [_, $, _],
      [_, $, _],
    ],
    180: [
      [_, _, _],
      [$, $, $],
      [_, _, $],
    ],
    270: [
      [_, $, _],
      [_, $, _],
      [$, $, _],
    ],
    color: "blue",
  },
  L: {
    0: [
      [_, _, $],
      [$, $, $],
      [_, _, _],
    ],
    90: [
      [$, $, _],
      [_, $, _],
      [_, $, _],
    ],
    180: [
      [_, _, _],
      [$, $, $],
      [$, _, _],
    ],
    270: [
      [_, $, _],
      [_, $, _],
      [_, $, $],
    ],
    color: "orange",
  },
  S: {
    0: [
      [_, $, $],
      [$, $, _],
    ],
    90: [
      [$, _],
      [$, $],
      [_, $],
    ],
    180: [
      [_, $, $],
      [$, $, _],
    ],
    270: [
      [$, _],
      [$, $],
      [_, $],
    ],
    color: "green",
  },
  Z: {
    0: [
      [$, $, _],
      [_, $, $],
    ],
    90: [
      [_, $],
      [$, $],
      [$, _],
    ],
    180: [
      [$, $, _],
      [_, $, $],
    ],
    270: [
      [_, $],
      [$, $],
      [$, _],
    ],
    color: "red",
  },
  O: {
    0: [
      [$, $],
      [$, $],
    ],
    90: [
      [$, $],
      [$, $],
    ],
    180: [
      [$, $],
      [$, $],
    ],
    270: [
      [$, $],
      [$, $],
    ],
    color: "yellow",
  },
};
