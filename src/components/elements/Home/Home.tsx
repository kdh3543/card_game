import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import { modalSliceAction } from "@/feature/modal/modalSlice";
import HowToPlayModal from "@/components/common/modal/HowToPlayModal";
import styled from "styled-components";

interface StylePropsType {
  backgroundColor?: string;
  cursor?: string;
}

const Main = styled.main`
  text-align: center;
  padding-top: 300px;
  min-height: 100vh;
  background-color: antiquewhite;
`;

const PlayButton = styled.button<StylePropsType>`
  padding: 10px;
  font-size: 25px;
  margin: auto;
  cursor: ${(props) => props.cursor};
  font-weight: bold;
  border-radius: 15px;
  background-color: ${(props) => props.backgroundColor};
  color: white;
  border-color: aliceblue;
  margin-top: 10px;
  disabled: true;
`;

export default function Home() {
  const [choice, setChoice] = useState("");
  const [modalState, setModalState] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const gameStart = () => {
    if (!choice) return;
    router.push(`/game?level=${parseInt(choice)}`);
  };
  const selectLevel = (e: any) => {
    setChoice(e.target.value);
  };

  const openModal = () => {
    setModalState(true);
    // dispatch(modalSliceAction.setIsOpenHowToPlayModal(true));
  };
  const closeModal = () => {
    setModalState(false);
  };
  return (
    <>
      <Head>
        <title>미니 게임</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Main>
        <div>
          <select onChange={(e) => selectLevel(e)}>
            <option value="">{"단계"}</option>
            <option value="8">{"1"}</option>
            <option value="12">{"2"}</option>
            <option value="20">{"3"}</option>
          </select>
        </div>

        <div>
          <PlayButton
            onClick={gameStart}
            cursor={choice ? "pointer" : "not-allowed"}
            backgroundColor={choice ? "gray" : "#80808080"}
            disabled={choice ? false : true}
          >
            {/* <button
            className={choice ? styles.playBtn : styles.forbiddenBtn}
            onClick={gameStart}
            disabled={choice ? false : true}
          > */}
            {"PLAY THE GAME"}
          </PlayButton>
        </div>
        <div>
          <PlayButton
            cursor="pointer"
            backgroundColor="gray"
            onClick={openModal}
          >
            {"HOW TO PLAY"}
          </PlayButton>
        </div>
      </Main>
      {modalState && <HowToPlayModal state={modalState} onClose={closeModal} />}
    </>
  );
}
