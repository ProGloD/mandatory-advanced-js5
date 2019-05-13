import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import Logout from "./Logout";
import ItemList from "./itemList";
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
