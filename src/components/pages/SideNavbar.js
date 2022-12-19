import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NotesLogo from "../../static/images/notes-logo.svg";
import NoneSelected from "../modals/NoneSelected";

const SideNavbar = (props) => {
  const [noneSelectedModalOpen, setNoneSelectedModalOpen] = useState(false);

  const {
    setAddNote,
    setDeleteNote,
    setOpenShareModal,
    deleteArray,
    shareArray,
  } = props;

  const handleClick = useCallback(
    (value) => {
      if (value === "add") {
        setAddNote(true);
      } else if (value === "share") {
        if (shareArray?.length > 0) {
          setOpenShareModal(true);
        } else {
          setNoneSelectedModalOpen(true);
        }
      } else if (value === "delete") {
        if (deleteArray?.length) {
          setDeleteNote(true);
        } else {
          setNoneSelectedModalOpen(true);
        }
      }
    },
    //eslint-disable-next-line
    [shareArray?.length, deleteArray?.length]
  );

  return (
    <div className="side-navbar-container">
      <Link className="logo-wrapper nav-item" to="/home">
        <img src={NotesLogo} alt="logo" />
      </Link>

      <div
        className="side-navbar-btn add-note"
        onClick={() => handleClick("add")}
      >
        <FontAwesomeIcon icon="fa-solid fa-file-circle-plus" />
      </div>

      <div
        className="side-navbar-btn share-note"
        onClick={() => handleClick("share")}
      >
        <FontAwesomeIcon icon="fa-solid fa-share-nodes" />
      </div>

      <div
        className="side-navbar-btn delete-notes"
        onClick={() => handleClick("delete")}
      >
        <FontAwesomeIcon icon="fa-solid fa-trash" />
      </div>
      {noneSelectedModalOpen && (
        <NoneSelected
          modalOpen={noneSelectedModalOpen}
          setModalOpen={setNoneSelectedModalOpen}
        />
      )}
    </div>
  );
};

export default SideNavbar;
