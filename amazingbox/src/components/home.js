import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Dropbox from "dropbox";
import fetch from "isomorphic-fetch";
import ItemList from "./itemList";

import { token$, updateToken } from "../store/authToken";

const Home = () => {
  const [userToken, updateUserToken] = useState(token$.value);
  const [files, updateFiles] = useState([]);

  let dbx = new Dropbox.Dropbox({ fetch, accessToken: userToken });

  useEffect(() => {
    let subscription = token$.subscribe(token => {
      updateUserToken(token);
    });

    getFiles();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  function getFiles(path = "") {
    dbx
      .filesListFolder({ path })
      .then(function(response) {
        console.log(response);

        let files = response.entries;
        
        updateFiles(files);
      })
      .catch(_ => updateToken(null));
  }

  function logOut() {
    dbx
      .authTokenRevoke()
      .then(_ => updateToken(null))
      .catch(error => console.log(error));
  }

  if (!userToken) {
    return <Redirect to="/auth" />;
  }

  return (
    <>
      <nav>
        <ul>
          <li>
            <button onClick={logOut}>Log out</button>
          </li>
        </ul>
      </nav>
      <p>Home</p>
      <ItemList files={files}/>
    </>
  );
};
export default Home;
