import styles from "./regular.module.css";
import Image from "next/image";
import { updateUserChoice } from "../lib/gameSlice";
import { useDispatch } from "react-redux";

export default function Regular() {
  const dispatch = useDispatch();

  function handleClick(e) {
    if (!e.target.value) {
      dispatch(updateUserChoice(String(e.target.alt)));
      return;
    }
    dispatch(updateUserChoice(String(e.target.value)));

    return;
  }

  return (
    <div className={styles.main}>
      <button className={styles.button} value="paper" onClick={handleClick}>
        <Image
          src="icon-paper.svg"
          alt="paper"
          width="69"
          height="79"
          value="paper"
          priority
          className={styles.margin}
        />
      </button>
      <button className={styles.button} value="scissors" onClick={handleClick}>
        <Image
          src="icon-scissors.svg"
          alt="scissors"
          width="81"
          height="88"
          value="scissors"
          priority
          className={styles.margin}
        />
      </button>
      <button className={styles.button} value="rock" onClick={handleClick}>
        <Image
          src="icon-rock.svg"
          alt="rock"
          width="78"
          height="78"
          value="rock"
          priority
          className={styles.margin}
        />
      </button>
    </div>
  );
}
