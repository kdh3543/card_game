import styles from "@/styles/Game.module.css";
import { useEffect, useState } from "react";

function Game() {
  const [cardArray, setCardArray] = useState<number[]>([]);
  const [answerArray, setAnswerArray] = useState<number[]>([]);
  const [flip, setFlip] = useState<boolean[]>([]);
  const [cardCount, setCardCount] = useState(0);
  const [answer, setAnswer] = useState<number[]>([]);
  const [answerCount, setAnswerCount] = useState(0);
  const [time, setTime] = useState(3600);

  useEffect(() => {
    const date = new Date(3600);
    console.log(date);
    setTimeout(() => {}, 1);
  }, [time]);

  const choiceCard = (index: number, value: number) => {
    setAnswer([...answer, value]);

    let tempArr = flip;
    tempArr[index] = true;
    setCardCount(cardCount + 1);
    setFlip([...tempArr]);
    console.log(answer);
  };

  useEffect(() => {
    if (cardCount === 2) {
      console.log(answer);
      // setAnswer([]);
      if (answer[answer.length - 1] === answer[answer.length - 2]) {
        setAnswerCount(answerCount + 1);
      } else {
        console.log(flip);
        setTimeout(() => {
          setFlip(Array.from({ length: 6 }, () => false));
        }, 100);
      }
      setCardCount(0);
    }
  }, [cardCount]);

  console.log(flip);
  useEffect(() => {
    setFlip(Array.from({ length: 6 }, () => true));
    setTimeout(() => {
      setFlip(Array.from({ length: 6 }, () => false));
    }, 1000);
    setCardArray(
      Array.from({ length: 6 }, (_, i) => Math.ceil((i + 1) / 2)).sort(
        () => Math.random() - 0.5
      )
    );

    console.log(cardArray);
  }, []);

  return (
    <>
      <main className={styles.main}>
        <div className={styles.answerCount}>
          {"ANSWER COUNT:"} {time}
        </div>
        <div className={styles.cardContainer}>
          {cardArray.map((value: number, index: number) => (
            <div className={styles.card} key={index}>
              <div
                className={
                  flip[index] ? styles.cardContent : styles.cardCheckedContent
                }
                onClick={
                  flip[index]
                    ? (e) => e.preventDefault()
                    : () => choiceCard(index, value)
                }
              >
                <div
                  className={flip[index] ? styles.cardShow : styles.cardHide}
                >
                  {value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default Game;
