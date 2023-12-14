import React from "react";
import { TetrisProvider } from "./context/TetrisContext";
import Board from "./components/Board/Board";
import Buttons from "./components/Buttons/Buttons";
import Info from "./components/Info/Info";

export default function App() {
  return (
    <div className="app">
      <TetrisProvider>
        <Info />
        <Board />
      </TetrisProvider>
      <Buttons />
    </div>
  );
}
