import React, { useState } from "react";
import Dropbox from "dropbox";
import fetch from "isomorphic-fetch";

import { token$ } from "../store/authToken";

function Search(props) {
  const [query, updateQuery] = useState("");

  function handleChange(event) {
    updateQuery(event.target.value);
  }

  function cleanQuery() {
    updateQuery("");
  }

  function search(event) {
    event.preventDefault();

    let dbx = new Dropbox.Dropbox({ fetch, accessToken: token$.value });
    dbx.filesSearch({ path: "", query }).then(response => {
      const result = [];

      response.matches.map(element => result.push(element.metadata));
      console.log(result);
      props.updateFiles(result);
    });
  }

  return (
    <div>
      <form onSubmit={search}>
        <input onChange={handleChange} placeholder="Search" value={query} />
      </form>
      <button onClick={cleanQuery}>&times;</button>
    </div>
  );
}

export default Search;