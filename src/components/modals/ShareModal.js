import { useState, useEffect } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { awaitAPICall } from "../../util/apiWrapper";
import asyncAPICall from "../../util/apiWrapper";
import logout from "../../util/logout";
import useDeepEffect from "../../hooks/useDeepEffect";

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

const ShareModal = (props) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState();

  const {
    modalOpen,
    setModalOpen,
    currentNote,
    setCurrentNote,
    currentNoteTitle,
    setCurrentNoteTitle,
    currentNoteBody,
    setCurrentNoteBody,
    currentNoteFooter,
    setCurrentNoteFooter,
    data,
    setData,
    shareArray,
    setShareArray,
    userData,
    setUserData,
  } = props;

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleClose = () => {
    console.log("share_id: ", selectedOption);
    console.log("notes: ", shareArray);
    setModalOpen((mO) => {
      asyncAPICall(
        "/note/share",
        "POST",
        {
          share_id: selectedOption,
          notes: shareArray,
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
              setUserData([]);
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
          console.warn("Note Share Error: ", err);
        },
        null,
        true
      );
    });
  };

  useEffect(() => {
    asyncAPICall(
      "/user/get",
      "GET",
      null,
      null,
      (data) => {
        setUserData(data);
      },
      (err) => {
        console.warn("Users Get Error: ", err);
      },
      null,
      true
    );
  }, []);

  useDeepEffect(() => {
    const options = userData.map((option) => {
      return (
        <option key={`${option.user_id}`} value={`${option.user_id}`}>
          {option.first_name} {option.last_name}
        </option>
      );
    });

    setOptions(options);
  }, [userData]);

  useEffect(() => {
    console.log("selectedOption: ", selectedOption);
  }, [selectedOption]);

  return (
    <>
      <Modal
        isOpen={modalOpen}
        className="share-modal"
        onRequestClose={() => setModalOpen(false)}
        style={styles}
      >
        <div className="share-modal">
          <select
            name="users"
            id="user-select"
            value={selectedOption}
            onChange={(e) => handleChange(e)}
          >
            <option value="">--Please choose an option--</option>
            {options}
          </select>
          <div className="confirm-share-btn" onClick={() => handleClose()}>
            Share
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ShareModal;
