import { useState } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { awaitAPICall } from "../../util/apiWrapper";
import asyncAPICall from "../../util/apiWrapper";
import logout from "../../util/logout";

Modal.setAppElement("#root");

const styles = {
  overlay: {
    backdropFilter: "blur(2px)",
    backgroundColor: "rgb(49, 53, 62, 0.5)",
  },
  content: {
    positon: "absolute",
    width: "max(calc(26.247vw * 1.2), 500px)",
    height: "max(calc(34.121vw * 1.2), 650px)",
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

const NoteModal = (props) => {
  const {
    modalOpen,
    setModalOpen,
    currentNote,
    setCurrentNote,
    currentNoteBody,
    setCurrentNoteBody,
  } = props;

  const handleChange = (e) => {
    setCurrentNoteBody(e.target.value);
  };

  const handleClose = () => {
    setModalOpen((mO) => {
      asyncAPICall(
        "/note/update",
        "POST",
        {
          body: currentNoteBody,
        },
        null,
        (data) => {
          return false;
        },
        (err) => {
          console.warn("Note Update Error: ", err);
        },
        null,
        true
      );
    });
  };

  // function handleDelete() {
  //   let auth_ok = awaitAPICall(
  //     `/${props.objectType}/delete/${props.id}`,
  //     "DELETE",
  //     null,
  //     null,
  //     (data) => {
  //       console.log(`${props.objectType} deleted`);
  //       setModalOpen(false);
  //       props.redirectTo(`/${props.objectType}s`);
  //     },
  //     null
  //   );
  //   if (!auth_ok) {
  //     logout(props);
  //   }
  // }

  return (
    <>
      <Modal
        isOpen={modalOpen}
        className="note-modal"
        onRequestClose={() => handleClose()}
        style={styles}
      >
        <div className="note-modal">
          <div className="note-title">Title</div>
          <div className="note-body">
            <textarea
              value={currentNoteBody}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="note-footer">Hi</div>
        </div>
      </Modal>
    </>
  );
};

export default NoteModal;
