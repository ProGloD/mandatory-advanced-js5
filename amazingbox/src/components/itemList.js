import React, { useEffect, useState } from "react";
import Dropbox from "dropbox";
import fetch from "isomorphic-fetch";

import Item from "./Item";
import Path from "./Path";
import { token$, updateToken } from "../store/authToken";

function ItemList(props) {
  const [userToken, updateUserToken] = useState(token$.value);
  const [files, updateFiles] = useState([]);

  const path =
    props.location.pathname === "/" ? "" : props.location.pathname.slice(5);

  useEffect(() => {
    let subscription = token$.subscribe(token => {
      updateUserToken(token);
    });

    getFiles();

    return () => {
      subscription.unsubscribe();
    };
  }, [props.location.pathname]);

  function getFiles() {
    let dbx = new Dropbox.Dropbox({ fetch, accessToken: userToken });
    dbx
      .filesListFolder({ path })
      .then(function(response) {
        console.log(response);

        let files = response.entries;

        updateFiles(files);
      })
      .catch(_ => updateToken(null));
  }

  return (
    <div className="ItemList">
      <Path path={path} />
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Name</th>
            <th>Last Updated</th>
            <th>Size</th>
          </tr>
        </thead>
        <tbody>
          {files.map(file => (
            <tr key={file.path_lower}>
              <Item file={file} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ItemList;
