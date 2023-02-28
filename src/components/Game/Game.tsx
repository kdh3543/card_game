import styles from "@/styles/Game.module.css";

function Game() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <div className={styles.cardContent}>1</div>
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
          </div>
        </div>
      </main>
    </>
  );
}

export default Game;
