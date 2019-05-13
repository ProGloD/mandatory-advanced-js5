import React, { useEffect, useState } from "react";
import Dropbox from "dropbox";
import fetch from "isomorphic-fetch";
import Item from "./Item";
import AddFileButton from "./addFileAndFolder"; //component för att lägga till filer och mappar
import { token$, updateToken } from "../store/authToken";
import { favorite$, updateFavorite } from "../store/favoriteStore";
import Favorites from "../components/favorites";
import Path from "./Path";
import Search from "./Search";

function ItemList(props) {
  const [userToken, updateUserToken] = useState(token$.value);
  const [favorites, updateFavorite] = useState(favorite$.value);  
  const [files, updateFiles] = useState([]);

  const path =
    props.location.pathname === "/" ? "" : props.location.pathname.slice(5);

  useEffect(() => {
    let subscription = token$.subscribe(token => {
      updateUserToken(token);
    });

    let interval = setInterval(getFiles, 5000);

    return () => {
      clearInterval(interval);
      subscription.unsubscribe();
    };
  }, [props.location.pathname]);

  function getFiles() {
    let dbx = new Dropbox.Dropbox({ fetch, accessToken: userToken });
    dbx
      .filesListFolder({ path })
      .then(function(response) {
        let files = response.entries;
        updateFiles(files);
      })
      .catch(_ => updateToken(null));
  }

  function remove(path) {
    console.log(path);
    let dbx = new Dropbox.Dropbox({ fetch, accessToken: userToken });
    dbx
      .filesDelete({ path })
      .then(_ => getFiles())
      .catch(error => console.log(error));
  }

  return (
    <div className="ItemList">
      <Search updateFiles={updateFiles} getFiles={getFiles} />
      <Path path={path} />
      <table className="item-table" cellSpacing="0" cellPadding="0">
        <thead>
          <tr className="head-row">
            <th className="th-type">Type</th>
            <th className="th-name">Name</th>
            <th className="th-lastUpdate">Last Updated</th>
            <th className="th-size">Size</th>
          </tr>
        </thead>
        <tbody>
          {files.map(file => (
            <tr className="file-row" key={file.path_lower}>
<<<<<<< HEAD
              {favorites ? <Item file={file} path={path} updateFiles={getFiles} remove={() => remove(file.path_lower)} /> : <Favorites file={file} />}
=======
              <Item
                file={file}
                path={path}
                updateFiles={getFiles}
                remove={() => remove(file.path_lower)}
              />
>>>>>>> 3f50b43f6c65734e79c8a880626fe7c6d109abec
            </tr>
          ))}
        </tbody>
      </table>
      <AddFileButton updateFiles={getFiles} path={path} />
    </div>
  );
}

export default ItemList;
