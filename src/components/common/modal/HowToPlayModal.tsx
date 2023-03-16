// import { modalSliceAction } from "@/feature/modal/modalSlice";
import styles from "@/styles/HowToPlay.module.css";
// import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Background = styled.main`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-color: #80808070;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 600px;
  height: 600px;
  background-color: burlywood;
  position: relative;
  border-radius: 20px;
`;

const CloseButton = styled.button`
  width: 50px;
  height: 50px;
  position: absolute;
  top: 0;
  right: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 25px;
`;

const Description = styled.div`
  width: 70%;
  margin: auto;
  height: 50%;
  text-align: center;
  background-color: gray;
  border-radius: 15px;
`;

const Title = styled.div`
  margin-top: 150px;
  padding-top: 10px;
  font-size: 30px;
  font-weight: bold;
`;

const Content = styled.div`
  margin-top: 50px;
  white-space: pre-line;
  line-height: 1.5;
  font-size: 20px;
  padding-bottom: 10px;
`;

function HowToPlayModal({ state, onClose }: any) {
  // const status = useSelector((state: any) => state.modal.show);
  // const dispatch = useDispatch();

  return (
    state && (
      <Background>
        <Container>
          <CloseButton onClick={onClose}>{"x"}</CloseButton>
          <Description>
            <Title>{"게임 방법"}</Title>
            <Content>
              {
                "난이도를 선택한 다음\n 시간 안에 짝이 맞는 카드를 다 맞추면 된다."
              }
            </Content>
          </Description>
        </Container>
      </Background>
    )
  );
}

export default HowToPlayModal;
