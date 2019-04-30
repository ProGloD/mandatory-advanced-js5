import React, { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import Dropbox from "dropbox";
import fetch from "isomorphic-fetch";
import ItemList from "./itemList";

<<<<<<< HEAD

=======
>>>>>>> e59f383e986adce512429464102e36ba371070d1
import { token$, updateToken } from "../store/authToken";
import AddFileButton from "../components/addFileAndFolder"; //component för att lägga till filer och mappar

const Home = () => {
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
        <ItemList />
      </main>
      <AddFileButton></AddFileButton>
    </>
  );
};
export default Home;
