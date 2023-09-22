"use client";

import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./header.module.css";

export default function Header() {
  const { score } = useSelector((state) => state.game);

  return (
    <header>
      <Image
        src="logo.svg"
        alt="logo"
        width="144"
        height="100"
        priority
        className={styles.margin}
      />
      <div className={styles.scoreboard}>
        <p className={styles.title}>SCORE</p>
        <p className={styles.number}>{score}</p>
      </div>
    </header>
  );
}
