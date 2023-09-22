"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./results.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserChoice,
  updateGameChoice,
  updateScore,
} from "../lib/gameSlice";

export default function Results() {
  const dispatch = useDispatch();
  const { userChoice, gameChoice } = useSelector((state) => state.game);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <p className={styles.selection}>YOU PICKED</p>
        <PlayerChoice />
      </div>
      {gameChoice ? <CompareChoices /> : ""}
      <div className={styles.card}>
        <p className={styles.selection}>THE HOUSE PICKED</p>
        <HouseChoice />
      </div>
    </div>
  );
}

function CompareChoices() {
  const dispatch = useDispatch();
  const { userChoice, gameChoice, score } = useSelector((state) => state.game);
  const [results, setResults] = useState(false);

  function handleReset() {
    dispatch(updateUserChoice(Boolean(false)));
    dispatch(updateGameChoice(Boolean(false)));
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // User choose paper
      if (userChoice === "paper") {
        if (gameChoice === "scissors") {
          setResults("YOU LOSE");
          selectWinner(gameChoice);
          dispatch(updateScore(Number(score - 1)));
        }

        if (gameChoice === "rock") {
          setResults("YOU WIN");
          selectWinner(userChoice);
          dispatch(updateScore(Number(score + 1)));
        }
      }

      // User choose scissors
      if (userChoice === "scissors") {
        if (gameChoice === "rock") {
          setResults("YOU LOSE");
          selectWinner(gameChoice);
          dispatch(updateScore(Number(score - 1)));
        }

        if (gameChoice === "paper") {
          setResults("YOU WIN");
          selectWinner(userChoice);
          dispatch(updateScore(Number(score + 1)));
        }
      }

      // User choose rock
      if (userChoice === "rock") {
        if (gameChoice === "paper") {
          setResults("YOU LOSE");
          selectWinner(gameChoice);
          dispatch(updateScore(Number(score - 1)));
        }

        if (gameChoice === "scissors") {
          setResults("YOU WIN");
          selectWinner(userChoice);
          dispatch(updateScore(Number(score + 1)));
        }
      }
    }, 750);

    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameChoice, userChoice]);

  if (results) {
    return (
      <div className={styles.resultsCon}>
        <p className={styles.resultsDet}>{results}</p>
        <button onClick={handleReset} className={styles.resetBut}>
          PLAY AGAIN
        </button>
      </div>
    );
  }
}

function HouseChoice() {
  const dispatch = useDispatch();
  const { userChoice, gameChoice } = useSelector((state) => state.game);
  const choices = ["paper", "scissors", "rock"];
  const compChoices = choices.filter((word) => word !== userChoice);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const randNum = Math.floor(Math.random() * compChoices.length);
      const compChoice = compChoices[randNum];

      dispatch(updateGameChoice(String(compChoice)));
    }, 500);

    // Return a cleanup function to clear the timeout when the component unmounts.
    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userChoice]);

  if (gameChoice === "paper") {
    return <Paper />;
  }

  if (gameChoice === "scissors") {
    return <Scissors />;
  }

  if (gameChoice === "rock") {
    return <Rock />;
  }
}

function PlayerChoice() {
  const { userChoice } = useSelector((state) => state.game);

  if (userChoice === "paper") {
    return <Paper />;
  }

  if (userChoice === "scissors") {
    return <Scissors />;
  }

  if (userChoice === "rock") {
    return <Rock />;
  }
}

function Paper() {
  return (
    <div className={styles.paper} value="paper" id="paper">
      <Image
        src="icon-paper.svg"
        alt="paper"
        width="99"
        height="109"
        value="paper"
        priority
      />
    </div>
  );
}

function Scissors() {
  return (
    <div className={styles.scissors} value="scissors" id="scissors">
      <Image
        src="icon-scissors.svg"
        alt="scissors"
        width="111"
        height="118"
        value="scissors"
        priority
      />
    </div>
  );
}

function Rock() {
  return (
    <div className={styles.rock} value="rock" id="rock">
      <Image
        src="icon-rock.svg"
        alt="rock"
        width="108"
        height="108"
        value="rock"
        priority
      />
    </div>
  );
}

function selectWinner(winner) {
  const elem = document.getElementById(winner);
  elem.style.boxShadow = "0px 0px 100px 19px rgba(255,255,255,1)";
}
