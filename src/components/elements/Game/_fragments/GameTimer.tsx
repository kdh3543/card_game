import { useEffect, useState } from "react";
import styled from "styled-components";

const Clock = styled.div`
  width: 300px;
  height: 300px;
  margin: auto;
  background-color: gray;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
`;
function GameTimer() {
  const [sec, setSec] = useState(10);
  const [microSec, setMicroSec] = useState(0);
  const onTimer = () => {
    setTimeout(() => {
      setMicroSec(microSec - 1);
    }, 10);
  };

  const start = () => {
    setSec(10);
    setMicroSec(0);
    onTimer();
  };
  useEffect(() => {
    if (sec === 0 && microSec === 0) {
      return;
    }
    if (microSec === 0) {
      setMicroSec(99);
      setSec(sec - 1);
    }
    if (microSec < 0) {
      setMicroSec(99);
    }
    onTimer();
  }, [microSec]);

  return (
    <>
      <button onClick={start}>시작</button>
      <Clock>
        {sec}.{microSec}
      </Clock>
    </>
  );
}

export default GameTimer;
