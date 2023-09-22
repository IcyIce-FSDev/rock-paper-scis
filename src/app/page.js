import Game from "../../components/game";
import styles from "./page.module.css";

export const metadata = {
  title: "Rock, Paper, Scissors",
  description: "Old school game with graphics",
};

export default function Home() {
  return (
    <main className={styles.main}>
      <Game />
    </main>
  );
}
