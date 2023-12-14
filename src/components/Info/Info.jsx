import styles from "./Info.module.css";
import React, { useContext, useEffect } from "react";
import { TetrisContext } from "../../context/TetrisContext.jsx";

const customBlock = block => {
  return block[0].filter(row => row.some(tile => tile)).flat();
};

export default function Info() {
  const { nextBlock, score, speed, startGame } = useContext(TetrisContext);

  useEffect(() => {
    const current = localStorage.getItem("tetrisRecord");
    if (!current) {
      localStorage.setItem("tetrisRecord", 0);
    } else if (current < score) {
      localStorage.setItem("tetrisRecord", score);
    }
  }, [score]);

  return (
    <div className={styles.info}>
      <div className={styles.status}>
        <div>Speed: {speed}</div>
        <div>Score: {score}</div>
        <div>Record: {localStorage.getItem("tetrisRecord")}</div>
        <button onClick={startGame}>Start</button>
      </div>
      <div className={styles.nextBlock}>
        <div className={styles.nextGrid} style={{ width: `${25 * nextBlock[0][0].length - 10}%` }}>
          {customBlock(nextBlock).map((tile, index) => (
            <div
              key={index}
              className={styles.tile}
              style={{
                backgroundColor: tile ? nextBlock.color : "white",
                border: tile ? "1px solid black" : "none",
                flex: `1 1 ${100 / nextBlock[0][0].length}%`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
