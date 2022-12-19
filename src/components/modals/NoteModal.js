import { useState } from "react";
import Modal from "react-modal";

import useDeepEffect from "../../hooks/useDeepEffect";
import asyncAPICall from "../../util/apiWrapper";

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
  const [footerElements, setFooterElements] = useState([]);

  const {
    modalOpen,
    setModalOpen,
    currentNote,
    setCurrentNote,
    currentNoteTitle,
    setCurrentNoteTitle,
    currentNoteBody,
    setCurrentNoteBody,
    setCurrentNoteFooter,
    setData,
  } = props;

  const handleTitleChange = (e) => {
    setCurrentNoteTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setCurrentNoteBody(e.target.value);
  };

  const handleClose = () => {
    setModalOpen((mO) => {
      asyncAPICall(
        "/note/update",
        "POST",
        {
          note_id: currentNote.note_id,
          title: currentNoteTitle,
          body: currentNoteBody,
        },
        null,
        (data) => {
          asyncAPICall(
            "/note/get",
            "GET",
            null,
            null,
            (data) => {
              setData(data);
              setCurrentNote({});
              setCurrentNoteTitle("");
              setCurrentNoteBody("");
              setCurrentNoteFooter([]);
              return false;
            },
            (err) => {
              console.warn("Note Get Error: ", err);
            },
            null,
            true
          );
        },
        (err) => {
          console.warn("Note Update Error: ", err);
        },
        null,
        true
      );
    });
  };

  useDeepEffect(() => {
    if (currentNote?.note_id) {
      asyncAPICall(
        `/note/get/${currentNote.note_id}`,
        "GET",
        null,
        null,
        (data) => {
          let elements = data.users.map((user, idx) => {
            if (idx + 1 !== data.users.length) {
              return (
                <div key={`${user.user_id}`} className="authors">
                  {user.first_name} {user.last_name}
                  {","}
                </div>
              );
            } else {
              return (
                <div key={`${user.user_id}`} className="authors">
                  {user.first_name} {user.last_name}
                  {"."}
                </div>
              );
            }
          });
          setFooterElements(elements);
        },
        (err) => err,
        null,
        true
      );
    }
  }, [currentNote]);

  return (
    <>
      <Modal
        isOpen={modalOpen}
        className="note-modal"
        onRequestClose={() => handleClose()}
        style={styles}
      >
        <div className="note-modal">
          <div className="note-title">
            <input
              type="text"
              value={currentNoteTitle}
              onChange={(e) => handleTitleChange(e)}
            />
          </div>
          <div className="note-body">
            <textarea
              value={currentNoteBody}
              onChange={(e) => handleBodyChange(e)}
            />
          </div>
          <div className="note-footer">Authors: {footerElements}</div>
        </div>
      </Modal>
    </>
  );
};

export default NoteModal;
