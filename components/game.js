"use client";

import styles from "./game.module.css";
import Regular from "./regular";
import React from "react";

import { useSelector } from "react-redux";
import Results from "./results";

export default function Game() {
  return <GameMode />;
}

function GameMode() {
  const { userChoice, gameChoice, gameMode } = useSelector(
    (state) => state.game
  );

  if (gameMode == "regular") {
    if (!userChoice) {
      return (
        <div className={styles.regular}>
          <Regular />
        </div>
      );
    } else {
      return <Results />;
    }
  }

  return null;
}
