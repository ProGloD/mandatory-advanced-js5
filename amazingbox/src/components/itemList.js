import React, {useEffect, useState}from "react";
import Dropbox from "dropbox";
import fetch from "isomorphic-fetch";

import Item from "./Item";
import {token$, updateToken} from "../store/authToken";

function ItemList(props) {
  const [userToken, updateUserToken] = useState(token$.value);
  const [files, updateFiles] = useState([]);

  

  useEffect(() => {
    let subscription = token$.subscribe(token => {
      updateUserToken(token);
    });

    getFiles();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  function getFiles() {
    const path = !props.match ? "" : props.match.params.path;
    console.log(path);
    

    let dbx = new Dropbox.Dropbox({ fetch, accessToken: userToken });
    dbx
      .filesListFolder({ path })
      .then(function (response) {
        console.log(response);

        let files = response.entries;
        
        updateFiles(files);
      })
      .catch(_ => updateToken(null));
  }




  return (
      <div className="ItemList">
          <table className='item-table' cellSpacing='0' cellPadding='0'>
            <thead>
            <tr className='head-row'>
                <th className='th-type'>Type</th>
                <th className='th-name'>Name</th>
                <th className='th-lastUpdate'>Last Updated</th>
                <th className='th-size'>Size</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => 
              <tr className='file-row' key={file.path_lower} > 
                <Item file={file} />
              </tr>
              )}
              </tbody>
          </table>
      </div>
  );
}

export default ItemList;