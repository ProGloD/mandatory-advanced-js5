import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import ItemList from "./itemList";
import Logout from "./Logout";
import Search from "./Search";
import Path from "./Path";
import AddFileButton from "./addFileAndFolder";

import {getFiles} from "../utils";
import { updatePath } from "../store/path";
import { token$ } from "../store/authToken";

function Home(props) {
  const [userToken, updateUserToken] = useState(token$.value);
  const [files, updateFiles] = useState([]); //antingen måste vi skicka ner denna staten som prop eller store. Alla api-anrop behöver state

  function cb(newFiles){ //måste använda en callback för att uppdatera filerna. annars får vi fel pga updatefiles körs innan den fått en response från api:et
    updateFiles(newFiles);
  }

  useEffect(() => { // håller koll på om url:n har bytt adress, uppdaterar isåfall med nya filer för just den andressen 
    let subscriptionToken = token$.subscribe(token => {
      updateUserToken(token);
    });
    
    const path =
    props.location.pathname === "/" ? "" : props.location.pathname.slice(5);
    updatePath(path);

    getFiles(cb);
    
  
    return () => {
      subscriptionToken.unsubscribe();
    };
  }, [props.location.pathname]); //vad useEffect håller koll på

  if (!userToken) {
    return <Redirect to="/auth" />; //om usertoken är false returneras vi till home.
  }

  return (
    <>
      <Logout />
      <main>
        {/* <Search cb={cb} /> */}
        <Path />
        <ItemList files={files} updateFiles={updateFiles} />
        {/* <AddFileButton updateFiles={getFiles} path={path} /> */}
      </main>
    </>
  );
}
export default Home;
