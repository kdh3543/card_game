import styles from "@/styles/Game.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface StylePropsType {
  backgroundColor?: string;
  cursor?: string;
  visibility?: string;
}

const Main = styled.main`
  min-height: 100vh;
  align-items: center;
  background-color: white;
  perspective: 300px;
`;

const Count = styled.div`
  margin: auto;
  text-align: center;
  padding-top: 50px;
  font-size: 20px;
  font-weight: bold;
  font-family: "Manrope";
  color: black;
`;

const Result = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 10px;
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.color};
  position: absolute;
`;

const Container = styled.div`
  width: 70%;
  display: flex;
  margin: auto;
  margin-top: 50px;
  min-height: 700px;
  justify-content: space-around;
  flex-wrap: wrap;
  font-size: 30px;
  position: relative;
`;

const Back = styled.button`
  right: 10px;
  top: -20px;
  width: 100px;
  margin: auto;
  position: absolute;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-weight: bold;
`;

const Level = styled.div`
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

// const Content = styled.div<StylePropsType>`
//   width: 200px;
//   height: 200px;
//   background-color: gray;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: ${(props) => props.cursor};
//   border-radius: 15px;
//   position: relative;
// `;

// const Card = styled.div<StylePropsType>`
//   visibility: ${(props) => props.visibility};
// `;

const CardContainer = styled.div<{ flipped: boolean }>`
  position: relative;
  width: 200px;
  height: 200px;

  transition: all 0.5s;
  transform-style: preserve-3d;
  & > div {
    backface-visibility: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    border-radius: 15px;
  }
  transform: ${({ flipped }) =>
    flipped ? "rotateY(180deg)" : "rotateY(0deg)"};
`;

const CardFront = styled.div<{ flipped: boolean }>`
  background-color: gray;
  color: white;
  cursor: pointer;
`;

const CardBack = styled.div<{ flipped: boolean }>`
  color: black;
  background-color: gray;
  cursor: not-allowed;
  transform: rotateY(180deg);
`;
function Game() {
  const [cardArray, setCardArray] = useState<number[]>([]);
  const [answerArray, setAnswerArray] = useState<number[]>([]);
  const [boolArray, setBoolArray] = useState<number[]>([]);
  const [flip, setFlip] = useState<boolean[]>([]);
  const [cardCount, setCardCount] = useState(0);
  const [choice, setChoice] = useState<number[]>([]);
  const [answerCount, setAnswerCount] = useState(0);
  const [time, setTime] = useState(6000);
  const [success, setSuccess] = useState("");

  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped(!flipped);
  };
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
          console.log(flip);
          let tempArr = flip;
          for (let i = 0; i < boolArray.length; i++) {
            if (boolArray[i] === -1) {
              tempArr[i] = false;
            } else {
              tempArr[i] = true;
            }

            setFlip([...tempArr]);
          }
        }, 500);
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
      <Main>
        <Count>
          {"REMAIN TIME:"} {time}
        </Count>
        <Result
          color={
            time === 0 && answerArray.length !== parseInt(initNum) / 2
              ? "red"
              : "blue"
          }
        >
          {success}
        </Result>
        <Container>
          <Back onClick={() => router.push("/")}>{"GO BACK"}</Back>

          {cardArray.map((value: number, index: number) => (
            <Level key={index}>
              <CardContainer flipped={flip[index]} onClick={handleClick}>
                <CardFront
                  onClick={
                    flip[index]
                      ? (e) => e.preventDefault()
                      : () => choiceCard(index, value)
                  }
                  flipped={flip[index]}
                >
                  front
                </CardFront>
                <CardBack flipped={flip[index]}>{value}</CardBack>
              </CardContainer>
              {/* <Content
                cursor={flip[index] ? "not-allowed" : "pointer"}
                onClick={
                  flip[index]
                    ? (e) => e.preventDefault()
                    : () => choiceCard(index, value)
                }
              >
                <Card visibility={flip[index] ? "visible" : "hidden"}>
                  {value}
                </Card>
              </Content> */}
            </Level>
          ))}
        </Container>
      </Main>
    </>
  );
}

export default Game;
