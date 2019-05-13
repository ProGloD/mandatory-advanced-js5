import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Dropbox from "dropbox";
import fetch from "isomorphic-fetch";
import ItemList from "./itemList";
import { token$, updateToken } from "../store/authToken";
import {updateFavorite} from "../store/favoriteStore";

const Home = props => {
  const [userToken, updateUserToken] = useState(token$.value);

  useEffect(() => {
    let subscription = token$.subscribe(token => {
      updateUserToken(token);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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

  if (!userToken) {
    return <Redirect to="/auth" />;
  }

  return (
    <>
      <button className="logout-button" onClick={logOut}>
        Log out
      </button>
      <main>
        <ItemList location={props.location} />
      </main>
    </>
  );
};
export default Home;
