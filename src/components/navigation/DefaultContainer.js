import { useState, useEffect, createContext } from "react";
import { Route } from "react-router-dom";
import Cookies from "js-cookie";

import Home from "../pages/Home";
import Organization from "../pages/organization/OrganizationGet";
import User from "../pages/user/UserGet";
import OrganizationListPage from "../pages/organization/OrganizationListPage";
import OrganizationForm from "../pages/organization/OrganizationForm";
import UserListPage from "../pages/user/UserListPage";
import UserForm from "../pages/user/UserForm";
import Loading from "../../util/Loading";
import ProfileEditPage from "../pages/ProfileEditPage";
import UniversalSearch from "../pages/UniversalSearch";

import logout from "../../util/logout";
import awaitAPICall from "../../util/apiWrapper";
import useAbortEffect from "../../hooks/useAbortEffect";
import useDeepEffect from "../../hooks/useDeepEffect";
import TopNavbar from "../pages/TopNavbar";
import SideNavbar from "../pages/SideNavbar";
import useDebounce from "../../hooks/useDebounce";

export const MeContext = createContext();

const DefaultContainer = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [me, setMe] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [addNote, setAddNote] = useState(false);
  const [deleteNote, setDeleteNote] = useState(false);
  const [shareNote, setShareNote] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [deleteArray, setDeleteArray] = useState([]);
  const [shareArray, setShareArray] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const addNoteDebounce = useDebounce(addNote);
  const deleteNoteDebounce = useDebounce(deleteNote);
  const shareNoteDebounce = useDebounce(shareNote);

  useEffect(() => {
    let auth_token_from_cookie = Cookies.get("auth_token");
    let expiration = Cookies.get("auth_expires");
    let is_expired = Date.parse(expiration) < Date.now();
    if (!auth_token_from_cookie || is_expired) {
      logout(props);
    }
  });

  useAbortEffect(
    (signal) => {
      awaitAPICall(
        "/user/get/me",
        "GET",
        null,
        null,
        (data) => {
          if (data) {
            setMe(data);
          }
        },
        (err) => {
          if (!signal.aborted) {
            console.error("Error in Get Me Effect: ", err);
          }
        },
        signal
      );
    },
    [isLoading]
  );

  useDeepEffect(() => {
    if (me?.user_id) {
      setIsLoading(false);
    }
  }, [me]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <MeContext.Provider value={me}>
        <Route
          path="/"
          render={(props) => (
            <TopNavbar
              {...props}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              searchResults={searchResults}
              setSearchResults={setSearchResults}
            />
          )}
        />

        <Route
          path="/"
          render={(props) => (
            <SideNavbar
              {...props}
              addNoteDebounce={addNoteDebounce}
              setAddNote={setAddNote}
              deleteNoteDebounce={deleteNoteDebounce}
              setDeleteNote={setDeleteNote}
              shareNoteDebounce={shareNoteDebounce}
              setShareNote={setShareNote}
              openShareModal={openShareModal}
              setOpenShareModal={setOpenShareModal}
              deleteArray={deleteArray}
              setDeleteArray={setDeleteArray}
              shareArray={shareArray}
              setShareArray={setShareArray}
            />
          )}
        />

        <div className="body-container">
          <Route
            path="/home"
            render={(props) => (
              <Home
                {...props}
                addNoteDebounce={addNoteDebounce}
                setAddNote={setAddNote}
                deleteNoteDebounce={deleteNoteDebounce}
                setDeleteNote={setDeleteNote}
                shareNoteDebounce={shareNoteDebounce}
                setShareNote={setShareNote}
                openShareModal={openShareModal}
                setOpenShareModal={setOpenShareModal}
                deleteArray={deleteArray}
                setDeleteArray={setDeleteArray}
                shareArray={shareArray}
                setShareArray={setShareArray}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
              />
            )}
          />
          <Route exact path="/user/:user_id" component={User} />
          <Route path="/users" component={UserListPage} />
          <Route
            name="user-edit"
            path="/user/edit/:user_id"
            component={UserForm}
          />
          <Route
            name="user-add"
            exact
            path="/user-add/:org_id/:org_name"
            component={UserForm}
          />
          <Route name="user-add" exact path="/user-add/" component={UserForm} />

          <Route path="/organizations" component={OrganizationListPage} />
          <Route
            name="organization-detail"
            path="/organization/:org_id"
            component={Organization}
          />
          <Route
            name="organization-form"
            path="/organization-form/:org_id"
            component={OrganizationForm}
          />
          <Route
            name="organization-add"
            exact
            path="/organization-form/"
            component={OrganizationForm}
          />

          <Route
            name="profile-edit"
            path="/profile/edit/:user_id"
            component={ProfileEditPage}
          />

          <Route
            name="universal-search"
            path="/universal-search"
            render={(props) => {
              return (
                <UniversalSearch
                  {...props}
                  searchTerm={searchTerm}
                  authToken={props.authToken}
                />
              );
            }}
          />
        </div>
      </MeContext.Provider>
    </div>
  );
};

export default DefaultContainer;
