import styles from "./Board.module.css";
import React, { useContext } from "react";
import { TILES_IN_ROW, NUMBER_OF_ROWS } from "../../utils/constants.js";
import { TetrisContext } from "../../context/TetrisContext.jsx";

export default function Board() {
  const { grid } = useContext(TetrisContext);

  return (
    <>
      <div className={styles.board} style={{ aspectRatio: TILES_IN_ROW / NUMBER_OF_ROWS }}>
        {grid.map((tile, index) => (
          <div
            key={index}
            className={styles.tile}
            style={{
              flex: `1 1 ${100 / TILES_IN_ROW}%`,
              backgroundColor: tile === null ? "" : tile,
            }}
          ></div>
        ))}
      </div>
    </>
  );
}
