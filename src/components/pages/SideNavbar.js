// import { useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NotesLogo from "../../static/images/notes-logo.svg";

// import { MeContext } from "../navigation/DefaultContainer";

const SideNavbar = (props) => {
  // const { searchTerm, setSearchTerm, history } = props;

  const {
    addNoteDebounce,
    setAddNote,
    deleteNoteDebounce,
    setDeleteNote,
    shareNoteDebounce,
    setShareNote,
    openShareModal,
    setOpenShareModal,
  } = props;

  // const redirectTo = (path) => {
  //   history.push(path);
  // };

  // const getSearchResults = (e) => {
  //   e.preventDefault();

  //   redirectTo(`/universal-search/${searchTerm}`);
  // };

  return (
    <div className="side-navbar-container">
      <Link className="logo-wrapper nav-item" to="/home">
        <img src={NotesLogo} alt="logo" />
      </Link>

      <div
        className="side-navbar-btn add-note"
        onClick={() => setAddNote(true)}
      >
        <FontAwesomeIcon icon="fa-solid fa-file-circle-plus" />
      </div>

      <div
        className="side-navbar-btn share-note"
        onClick={() => setOpenShareModal(true)}
      >
        <FontAwesomeIcon icon="fa-solid fa-share-nodes" />
      </div>

      <div
        className="side-navbar-btn delete-notes"
        onClick={() => setDeleteNote(true)}
      >
        <FontAwesomeIcon icon="fa-solid fa-trash" />
      </div>
    </div>
  );
};

export default SideNavbar;
