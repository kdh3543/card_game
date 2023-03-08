import styles from "@/styles/Game.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Game() {
  const [cardArray, setCardArray] = useState<number[]>([]);
  const [answerArray, setAnswerArray] = useState<number[]>([]);
  const [boolArray, setBoolArray] = useState<number[]>([]);
  const [flip, setFlip] = useState<boolean[]>([]);
  const [cardCount, setCardCount] = useState(0);
  const [choice, setChoice] = useState<number[]>([]);
  const [answerCount, setAnswerCount] = useState(0);
  const [time, setTime] = useState(60);
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const initNum: any = router.query.level;
  const choiceCard = (index: number, value: number) => {
    setChoice([...choice, value]);

    let tempArr = flip;
    tempArr[index] = true;
    setCardCount(cardCount + 1);
    setFlip([...tempArr]);
  };
  useEffect(() => {
    if (cardCount === 2) {
      if (choice[choice.length - 1] === choice[choice.length - 2]) {
        setAnswerArray([...answerArray, choice[choice.length - 1]]);
        setAnswerCount(answerCount + 1);
      } else {
        setChoice([]);
        setTimeout(() => {
          if (boolArray.length === 0) {
            setFlip(Array.from({ length: initNum }, () => false));
          }
          let tempArr = flip;
          for (let i = 0; i < boolArray.length; i++) {
            if (boolArray[i] === -1) {
              tempArr[i] = false;
            } else {
              tempArr[i] = true;
            }

            setFlip([...tempArr]);
          }
        }, 100);
      }
      setCardCount(0);
    }
  }, [cardCount]);

  useEffect(() => {
    const num = cardArray.map((value, index) => {
      if (answerArray.includes(value)) return index;
      return -1;
    });

    setBoolArray(num);
  }, [answerArray]);

  useEffect(() => {
    if (!router.query.level) return;
    setFlip(Array.from({ length: initNum }, () => true));
    setTimeout(() => {
      setFlip(Array.from({ length: initNum }, () => false));
    }, 1000);
    setCardArray(
      Array.from({ length: initNum }, (_, i) => Math.ceil((i + 1) / 2)).sort(
        () => Math.random() - 0.5
      )
    );
  }, [router?.query?.level]);

  // 시간 초과
  useEffect(() => {
    if (time <= 0) {
      setSuccess("FAILED!!");
      return;
    }
    const remainTime = setTimeout(() => {
      setTime(time - 1);
    }, 1000);
    if (boolArray.every((value) => value !== -1) && boolArray.length != 0) {
      setSuccess("SUCCESS!!");
      clearTimeout(remainTime);
      return;
    }
  }, [time]);
  useEffect(() => {}, [boolArray]);
  return (
    <>
      <Head>
        <title>카드 맞추기</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.answerCount}>
          {"REMAIN TIME:"} {time}
        </div>
        {time === 0 && answerArray.length !== parseInt(initNum) / 2 ? (
          <div className={styles.fail}>{success}</div>
        ) : (
          <div className={styles.success}>{success}</div>
        )}

        <div className={styles.cardContainer}>
          {cardArray.map((value: number, index: number) => (
            <div
              className={
                initNum === "8"
                  ? styles.easy
                  : initNum === "12"
                  ? styles.middle
                  : styles.hard
              }
              key={index}
            >
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
