import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Dropbox from "dropbox";
import fetch from "isomorphic-fetch";

import { token$, updateToken } from "../store/authToken";

const Home = () => {
  const [userToken, updateUserToken] = useState(token$.value);
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

        console.log(files);

        for (let file of files) {
          if (file[".tag"] === "folder") {
            getFiles(file.path_lower);
          }
        }
      })
      .catch(function(error) {
        console.error(error);
        updateToken(null);
      });
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
      <main>
        <p>Home</p>
      </main>
    </>
  );
};
export default Home;
