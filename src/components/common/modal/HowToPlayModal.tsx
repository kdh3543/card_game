import { modalSliceAction } from "@/feature/modal/modalSlice";
import styles from "@/styles/HowToPlay.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
function HowToPlayModal() {
  const status = useSelector((state: any) => state.modal.show);
  console.log(status);
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(modalSliceAction.setIsOpenHowToPlayModal(false));
  };
  return (
    status && (
      <main className={styles.modalBackground}>
        <div className={styles.modalContainer}>
          <button className={styles.closeButton} onClick={closeModal}>
            {"x"}
          </button>
          <div className={styles.modalDescription}>
            <div className={styles.modalTitle}>{"게임 방법"}</div>
            <div className={styles.modalContent}>
              {
                "난이도를 선택한 다음\n 시간 안에 짝이 맞는 카드를 다 맞추면 된다."
              }
            </div>
          </div>
        </div>
      </main>
    )
  );
}

export default HowToPlayModal;
