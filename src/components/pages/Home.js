import { useState, useEffect, useRef } from "react";

import useDeepEffect from "../../hooks/useDeepEffect";
import asyncAPICall from "../../util/apiWrapper";

import Cookies from "js-cookie";
import DataTable from "react-data-table-component";
import NoteModal from "../modals/NoteModal";
import ShareModal from "../modals/ShareModal";

const Home = (props) => {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [openNoteModal, setOpenNoteModal] = useState(false);
  const [currentNote, setCurrentNote] = useState({});
  const [currentNoteTitle, setCurrentNoteTitle] = useState("");
  const [currentNoteBody, setCurrentNoteBody] = useState("");
  const [currentNoteFooter, setCurrentNoteFooter] = useState([]);

  const {
    addNoteDebounce,
    setAddNote,
    deleteNoteDebounce,
    setDeleteNote,
    openShareModal,
    setOpenShareModal,
    deleteArray,
    setDeleteArray,
    shareArray,
    setShareArray,
    searchResults,
  } = props;

  const mountedRef = useRef([]);

  const handleSelectionChange = (rowData) => {
    const note_id_array = rowData.selectedRows.map((note) => {
      return note.note_id;
    });

    setDeleteArray(note_id_array);
    setShareArray(note_id_array);
  };

  const columns = [
    {
      name: "Note Title",
      selector: (row) => row.title,
      width: "30%",
    },
    {
      name: "Snippet",
      selector: (row) => row.body,
    },
  ];

  const handleRowClick = (rowData) => {
    setCurrentNote(rowData);
    setOpenNoteModal(true);
  };

  useDeepEffect(() => {
    if (currentNote?.body) {
      setCurrentNoteTitle(currentNote.title);
      setCurrentNoteBody(currentNote.body);
    }
  }, [currentNote]);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  useDeepEffect(() => {
    if (searchResults?.length === 0) {
      if (mountedRef.current) {
        asyncAPICall(
          "/note/get",
          "GET",
          null,
          null,
          (data) => {
            if (mountedRef.current) {
              setData(data);
            }
          },
          (err) => {
            if (mountedRef.current) {
              console.warn("Note Get Error: ", err);
            }
          },
          null,
          true
        );
      }
    }
  }, [searchResults]);

  useDeepEffect(() => {
    if (mountedRef.current) {
      if (addNoteDebounce) {
        asyncAPICall(
          "/note/add",
          "POST",
          {
            title: "Untitled Note",
            body: "Click To Edit Note",
            active: true,
          },
          null,
          (data) => {
            if (mountedRef.current) {
              setAddNote(false);
              asyncAPICall(
                "/note/get",
                "GET",
                null,
                null,
                (data) => {
                  if (mountedRef.current) {
                    setData(data);
                  }
                },
                (err) => {
                  if (mountedRef.current) {
                    console.warn("Note Get Error: ", err);
                  }
                },
                null,
                true
              );
            }
          },
          (err) => {
            if (mountedRef.current) {
              console.warn("Note Get Error: ", err);
            }
          },
          null,
          true
        );
      }
    }
  }, [addNoteDebounce, data]);

  useDeepEffect(() => {
    if (mountedRef.current) {
      if (deleteNoteDebounce) {
        asyncAPICall(
          "/note/delete",
          "POST",
          {
            note_id_array: deleteArray,
          },
          null,
          (data) => {
            if (mountedRef.current) {
              setDeleteNote(false);
              asyncAPICall(
                "/note/get",
                "GET",
                null,
                null,
                (data) => {
                  if (mountedRef.current) {
                    setData(data);
                  }
                },
                (err) => {
                  if (mountedRef.current) {
                    console.warn("Note Get Error: ", err);
                  }
                },
                null,
                true
              );
            }
          },
          (err) => {
            if (mountedRef.current) {
              console.warn("Note Get Error: ", err);
            }
          },
          null,
          true
        );
      }
    }
  }, [deleteNoteDebounce, data, deleteArray]);

  useDeepEffect(() => {
    if (searchResults?.length > 0) {
      setData(searchResults);
    } else {
      setData(data);
    }
  }, [searchResults, data]);

  useDeepEffect(() => {
    let auth_token = Cookies.get("auth_token");

    if (!auth_token) {
      props.history.push("/login");
    }
  }, [props.history]);

  return (
    <div className="home-wrapper">
      <div className="table-wrapper">
        <DataTable
          columns={columns}
          data={data}
          pagination
          paginationPerPage={15}
          paginationRowsPerPageOptions={[15, 20, 25, 30]}
          onRowClicked={(rowData) => handleRowClick(rowData)}
          highlightOnHover
          pointerOnHover
          noHeader
          fixedHeader
          fixedHeaderScrollHeight="81.5vh"
          selectableRows
          onSelectedRowsChange={handleSelectionChange}
          selectableRowsHighlight
          clearSelectedRows={deleteNoteDebounce}
        />
      </div>
      {openNoteModal && (
        <NoteModal
          modalOpen={openNoteModal}
          setModalOpen={setOpenNoteModal}
          currentNote={currentNote}
          setCurrentNote={setCurrentNote}
          currentNoteBody={currentNoteBody}
          setCurrentNoteBody={setCurrentNoteBody}
          currentNoteTitle={currentNoteTitle}
          setCurrentNoteTitle={setCurrentNoteTitle}
          currentNoteFooter={currentNoteFooter}
          setCurrentNoteFooter={setCurrentNoteFooter}
          data={data}
          setData={setData}
        />
      )}
      {openShareModal && (
        <ShareModal
          modalOpen={openShareModal}
          setModalOpen={setOpenShareModal}
          currentNote={currentNote}
          setCurrentNote={setCurrentNote}
          currentNoteBody={currentNoteBody}
          setCurrentNoteBody={setCurrentNoteBody}
          currentNoteTitle={currentNoteTitle}
          setCurrentNoteTitle={setCurrentNoteTitle}
          currentNoteFooter={currentNoteFooter}
          setCurrentNoteFooter={setCurrentNoteFooter}
          data={data}
          setData={setData}
          shareArray={shareArray}
          setShareArray={setShareArray}
          userData={userData}
          setUserData={setUserData}
        />
      )}
    </div>
  );
};

export default Home;
