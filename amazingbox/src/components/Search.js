import React, { useState, useEffect } from "react";
import {Redirect} from "react-router-dom";
import { useDebounce } from "use-debounce";

import { getFiles, search } from "../utils";
import "../css/Search.css";

function Search(props) {
  const [query, updateQuery] = useState("");
  const [value] = useDebounce(query, 500);
  const { cb } = props;

  useEffect(() => {
    search(cb, value);
  }, [value]);

  function handleChange(event) {
    updateQuery(event.target.value);
  }

  return (
    <div className="search-bar">
      <input
        className="search-bar__text-input"
        onChange={handleChange}
        placeholder="Search"
        value={query}
      />
      <button className="search-bar__clear-button" onClick={() => <Redirect to="/" />}>
        &times;
      </button>
    </div>
  );
}

export default Search;
