import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import ItemList from "./itemList";
import Logout from "./Logout";
import {getFiles} from "../utils";
import { updatePath } from "../store/path";
import { token$ } from "../store/authToken";

function Home(props) {
  const [userToken, updateUserToken] = useState(token$.value);
  const [files, updateFiles] = useState([]);

  useEffect(() => {
    let subscriptionToken = token$.subscribe(token => {
      updateUserToken(token);
    });
    
    const path =
    props.location.pathname === "/" ? "" : props.location.pathname.slice(5);
    updatePath(path);

    getFiles(files => updateFiles(files));
    
  
    return () => {
      subscriptionToken.unsubscribe();
    };
  }, [props.location.pathname]);

  if (!userToken) {
    return <Redirect to="/auth" />;
  }

  return (
    <>
      <Logout />
      <main>
        <ItemList files={files} />
      </main>
    </>
  );
}
export default Home;
