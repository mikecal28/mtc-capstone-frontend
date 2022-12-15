import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useDeepEffect from "../../hooks/useDeepEffect";
import useAbortEffect from "../../hooks/useAbortEffect";
import asyncAPICall from "../../util/apiWrapper";

import Cookies from "js-cookie";
import DataTable from "react-data-table-component";

const Home = (props) => {
  // const [data, setData] = useState([]);
  // const [columns, setColumns] = useState([]);

  const columns = [
    {
      name: "Note Title",
      selector: (row) => row.noteTitle,
    },
    {
      name: "Snippet",
      selector: (row) => row.snippet,
    },
  ];

  const data = [
    {
      id: 1,
      noteTitle: "Beetlejuice",
      snippet: "1988",
    },
    {
      id: 2,
      noteTitle: "Ghostbusters",
      snippet: "1984",
    },
  ];

  useAbortEffect((signal) => {
    asyncAPICall(
      "/get-notes",
      "GET",
      null,
      null,
      (data) => data,
      (err) => err,
      signal,
      true
    );
  }, []);

  useDeepEffect(() => {
    let auth_token = Cookies.get("auth_token");

    if (!auth_token) {
      props.history.push("/login");
    }
  }, [props.history]);

  return (
    <div className="home-wrapper">
      <DataTable columns={columns} data={data} pagination />
    </div>
  );
};

export default Home;
