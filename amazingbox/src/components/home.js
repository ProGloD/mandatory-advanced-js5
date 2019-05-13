import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
<<<<<<< HEAD
import Dropbox from "dropbox";
import fetch from "isomorphic-fetch";
import ItemList from "./itemList";
import { token$, updateToken } from "../store/authToken";
import {updateFavorite} from "../store/favoriteStore";
=======
>>>>>>> 3f50b43f6c65734e79c8a880626fe7c6d109abec

import Logout from "./Logout";
import ItemList from "./ItemList";
import { token$ } from "../store/authToken";

function Home(props) {
  const [userToken, updateUserToken] = useState(token$.value);

  useEffect(() => {
    let subscription = token$.subscribe(token => {
      updateUserToken(token);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

<<<<<<< HEAD
  function logOut() {
    let dbx = new Dropbox.Dropbox({ fetch, accessToken: userToken });
    dbx
      .authTokenRevoke()
      .then(_ => {
        updateToken(null);
        updateFavorite(null);
      })
      .catch(error => console.log(error));
  }

=======
>>>>>>> 3f50b43f6c65734e79c8a880626fe7c6d109abec
  if (!userToken) {
    return <Redirect to="/auth" />;
  }

  return (
    <>
      <Logout />
      <main>
        <ItemList location={props.location} />
      </main>
    </>
  );
}
export default Home;
