import React, { useState, useEffect } from "react";
import Dropbox from "dropbox";
import fetch from "isomorphic-fetch";
import { useDebounce } from "use-debounce";

import { token$ } from "../store/authToken";

function Search(props) {
  const [query, updateQuery] = useState("");
  const [value] = useDebounce(query, 500);

  useEffect(() => {
    if (value) {
      let dbx = new Dropbox.Dropbox({ fetch, accessToken: token$.value });
      dbx.filesSearch({ path: "", query }).then(response => {
        const result = [];

        response.matches.map(element => result.push(element.metadata));
        console.log(result);
        props.updateFiles(result);
      });
    } else {
      props.getFiles();
    }
  }, [value]);

  function handleChange(event) {
    updateQuery(event.target.value);
  }

  function cleanQuery() {
    updateQuery("");
  }

  return (
    <div>
      <input onChange={handleChange} placeholder="Search" value={query} />
      <button onClick={cleanQuery}>&times;</button>
    </div>
  );
}

export default Search;
