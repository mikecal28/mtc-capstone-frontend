import Modal from "react-modal";

Modal.setAppElement("#root");

const styles = {
  overlay: {
    backdropFilter: "blur(2px)",
    backgroundColor: "rgb(49, 53, 62, 0.5)",
  },
  content: {
    positon: "absolute",
    width: "350px",
    height: "150px",
    top: "54%",
    left: "56%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    border: "none",
    borderRadius: "0px",
    backgroundColor: "transparent",
    filter: "brightness(90%)",
    zIndex: "16",
  },
};

const NoneSelected = (props) => {
  const { modalOpen, setModalOpen } = props;

  return (
    <>
      <Modal
        isOpen={modalOpen}
        className="none-selected-modal"
        onRequestClose={() => setModalOpen(false)}
        style={styles}
      >
        <div className="none-selected-modal">
          <div className="modal-text">Please select a note</div>
          <div
            className="confirm-share-btn"
            onClick={() => setModalOpen(false)}
          >
            Close
          </div>
        </div>
      </Modal>
    </>
  );
};

export default NoneSelected;
