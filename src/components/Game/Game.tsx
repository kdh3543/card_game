import styles from "@/styles/Game.module.css";
import { useState } from "react";

function Game() {
  const [show, setShow] = useState(Array.from({ length: 6 }, () => false));
  const [test, setTest] = useState<any>();
  console.log({ ...show });
  const showCard = (e: any) => {
    // setTest(index);
    console.log(e.target);
    // console.log(index);
    // setShow(!show[index]);
  };

  const arr = Array.from({ length: 6 }, (_, i) => i);
  return (
    <>
      <main className={styles.main}>
        <div className={styles.cardContainer}>
          {arr.map((value, index) => (
            <div className={styles.card} key={value}>
              <div className={styles.cardContent} onClick={(e) => showCard(e)}>
                <text className={show ? styles.cardShow : styles.cardHide}>
                  {value}
                </text>
              </div>
            </div>
          ))}
          {/* <div className={styles.card}>
            <div className={styles.cardContent} onClick={showCard}>
              <text className={show ? styles.cardShow : styles.cardHide}>
                1
              </text>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardContent}>2</div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardContent}>3</div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardContent}>4</div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardContent}>5</div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardContent}>6</div>
          </div> */}
        </div>
      </main>
    </>
  );
}

export default Game;
