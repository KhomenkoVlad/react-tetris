import React, { createContext, useReducer, useEffect } from "react";
import { TILES_IN_ROW, NUMBER_OF_TILES } from "../utils/constants.js";
import {
  getRandomBlock,
  makeBlockIntoPosition,
  getCompletedRows,
  getFirstTileOfBlock,
} from "../utils/functions";

export const TetrisContext = createContext();

const initialState = {
  grid: new Array(NUMBER_OF_TILES).fill(null),
  block: undefined,
  nextBlock: getRandomBlock(),
  position: null,
  direction: 0,
  score: 0,
  speed: 1,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "startGame": {
      return {
        ...initialState,
      };
    }
    case "newBlock": {
      return {
        ...state,
        block: state.nextBlock,
        nextBlock: action.nextBlock,
        position: action.position,
        direction: 0,
        speed: Math.trunc((-1 + Math.sqrt((8 * state.score) / 100 + 1)) / 2) + 1,
      };
    }
    case "nextLinePosition": {
      return {
        ...state,
        position: state.position.map(index => index + TILES_IN_ROW),
      };
    }
    case "sideMoving": {
      return {
        ...state,
        position: action.position,
      };
    }
    case "rotate": {
      return {
        ...state,
        position: action.position,
        direction: action.direction,
      };
    }
    case "leaveBlock": {
      return {
        ...state,
        grid: action.grid,
        block: null,
        position: null,
        direction: 0,
        score: state.score + action.score,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

export function TetrisProvider({ children }) {
  const [{ grid, block, nextBlock, position, direction, score, speed }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const isBottomOfBoard = () => position.at(-1) >= NUMBER_OF_TILES - TILES_IN_ROW;

  const hasPositiveIndexes = newPosition => newPosition.every(tile => tile >= 0);

  const isNewPositionFree = newPosition => {
    for (const tile of newPosition) {
      if (grid[tile]) return false;
    }
    return true;
  };

  const isCrossedBorder = newPosition => {
    const startOfRows = tile => tile % TILES_IN_ROW === 0;
    const endOfRows = tile => tile % TILES_IN_ROW === TILES_IN_ROW - 1;

    const fromRightToLeft = position.find(endOfRows) && newPosition.find(startOfRows);
    const fromLeftToRight = position.find(startOfRows) && newPosition.find(endOfRows);

    return fromRightToLeft || fromLeftToRight ? true : false;
  };

  const isAbleToMove = newPosition => {
    if (
      hasPositiveIndexes(newPosition) &&
      isNewPositionFree(newPosition) &&
      !isBottomOfBoard() &&
      !isCrossedBorder(newPosition)
    ) {
      return true;
    } else return false;
  };

  const isGameOver = startPosition => {
    for (let tile of startPosition) {
      if (grid[tile]) {
        return true;
      }
    }
    return false;
  };

  const getGridWithPosition = () => {
    const fullGrid = [...grid];
    if (position) {
      for (const tile of position) {
        fullGrid[tile] = block.color;
      }
    }
    return fullGrid;
  };

  const createBlock = () => {
    const middleOfBoard = Math.trunc(TILES_IN_ROW / 2 - nextBlock[direction][0].length / 2);
    const startPosition = makeBlockIntoPosition(nextBlock[direction], middleOfBoard);
    const newBlock = getRandomBlock();

    if (!isGameOver(startPosition)) {
      dispatch({ type: "newBlock", nextBlock: newBlock, position: startPosition });
    } else console.log("Game Over");
  };

  const cleanCompletedRows = completedRows => {
    const fullGrid = getGridWithPosition();
    for (const row of completedRows) {
      const newGrid = [...fullGrid];

      for (let i = 0; i < row[0]; i++) {
        fullGrid[i + row.length] = newGrid[i];
      }
    }
    return fullGrid;
  };

  const moveBlockDown = () => {
    const newPosition = position.map(tile => tile + TILES_IN_ROW);
    if (isAbleToMove(newPosition)) {
      dispatch({ type: "nextLinePosition" });
    } else {
      leaveBlock();
    }
  };

  const leaveBlock = () => {
    const newPosition = position.map(tile => tile + TILES_IN_ROW);
    if (!isAbleToMove(newPosition)) {
      const completedRows = getCompletedRows(getGridWithPosition());
      const newGrid = cleanCompletedRows(completedRows);
      const newScore = completedRows.flat().length * speed;
      dispatch({ type: "leaveBlock", grid: newGrid, score: newScore });
    }
  };

  const moveBlockSide = move => {
    const newPosition = position.map(tile => tile + move);
    if (
      hasPositiveIndexes(newPosition) &&
      isNewPositionFree(newPosition) &&
      !isCrossedBorder(newPosition)
    ) {
      dispatch({ type: "sideMoving", position: newPosition });
    }
  };

  const rotateBlock = () => {
    const newDirection = (direction + 90) % 360;
    const rotatePoint = getFirstTileOfBlock(block[direction], position);
    const newPosition = makeBlockIntoPosition(block[newDirection], rotatePoint);

    if (isAbleToMove(newPosition)) {
      dispatch({ type: "rotate", position: newPosition, direction: newDirection });
    }
  };

  useEffect(() => {
    if (block) {
      const timer = setInterval(
        () => document.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" })),
        1000 / speed
      );
      return () => clearInterval(timer);
    } else {
      createBlock();
    }
  }, [block]);

  useEffect(() => {
    const handleKeyDown = event => {
      if (block) {
        switch (event.key) {
          case "ArrowRight": {
            moveBlockSide(1);
            break;
          }
          case "ArrowUp": {
            rotateBlock();
            break;
          }
          case "ArrowLeft": {
            moveBlockSide(-1);
            break;
          }
          case "ArrowDown": {
            moveBlockDown();
            break;
          }
          default: {
            break;
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <TetrisContext.Provider
      value={{
        grid: getGridWithPosition(),
        nextBlock,
        score,
        speed,
        startGame: () => dispatch({ type: "startGame" }),
      }}
    >
      {children}
    </TetrisContext.Provider>
  );
}
