import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ProfileMenu from "../navigation/ProfileMenu";

import { MeContext } from "../navigation/DefaultContainer";
import asyncAPICall from "../../util/apiWrapper";

const TopNavbar = (props) => {
  const me = useContext(MeContext);
  const { searchTerm, setSearchTerm, searchResults, setSearchResults } = props;
  const [menuOpen, setMenuOpen] = useState(false);

  const getSearchResults = (e) => {
    try {
      e.preventDefault();
    } catch {}

    if (searchTerm) {
      asyncAPICall(
        `/note/search/${searchTerm}`,
        "GET",
        null,
        null,
        (data) => setSearchResults(data),
        (err) => console.warn("Search Error: ", err),
        null,
        true
      );
    }
  };

  const handleSubmit = () => {
    if (searchResults?.length === 0) {
      if (searchTerm) {
        getSearchResults();
      }
    } else {
      setSearchResults([]);
      setSearchTerm("");
    }
  };

  return (
    <div className="top-navbar-container">
      <form onSubmit={getSearchResults}>
        <div className="search-bar-wrapper">
          <input
            type="text"
            placeholder="Search Notes"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              lineHeight: "normal",
            }}
          />

          <div className="reset-btn" onClick={() => handleSubmit()}>
            {searchResults?.length === 0 ? "Search" : "Reset"}
          </div>
        </div>
      </form>

      <div onClick={() => setMenuOpen(!menuOpen)} className="users_name">
        {me.first_name}&nbsp;&nbsp;
        <FontAwesomeIcon icon={`fas fa-chevron-${menuOpen ? "up" : "down"}`} />
      </div>

      {menuOpen ? (
        <ProfileMenu
          {...props}
          userFullName={me.first_name + " " + me.last_name}
          orgName={me.organization?.name}
          orgId={me.org_id}
          userID={me.user_id}
          setMenuOpen={setMenuOpen}
          menuOpen={menuOpen}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default TopNavbar;
