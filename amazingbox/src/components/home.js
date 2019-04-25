import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Dropbox from "dropbox";

import { token$, updateToken } from "../store/authToken";

const Home = () => {
  const [userToken, updateUserToken] = useState(token$.value);

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
    let dbx = new Dropbox.Dropbox({ accessToken: userToken });

    dbx
      .filesListFolder({ path })
      .then(function(response) {
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
      });
  }

  function logOut() {
    let dbx = new Dropbox.Dropbox({ accessToken: userToken });
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
    </>
  );
};
export default Home;
