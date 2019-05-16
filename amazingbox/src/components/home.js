import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import ItemList from "./ItemList";
import Path from "./Path";
import AddItem from "./AddItem";
import { getFiles } from "../utils";
import { updatePath } from "../store/path";
import { token$ } from "../store/authToken";

function Home(props) {
  const [userToken, updateUserToken] = useState(token$.value);
  const [files, updateFiles] = useState([]); //antingen måste vi skicka ner denna staten som prop eller store. Alla api-anrop behöver state

  function callback(files) {  //måste använda en callback för att uppdatera filerna. annars får vi fel pga updatefiles körs innan den fått en response från api:et
    updateFiles(files);
  }

  useEffect(() => { // håller koll på om url:n har bytt adress, uppdaterar isåfall med nya filer för just den andressen 
    let subscriptionToken = token$.subscribe(token => {
      updateUserToken(token);
    });

    const path =
      props.location.pathname === "/" ? "" : props.location.pathname.slice(5);
        updatePath(path);

    getFiles(callback);
    let interval = setInterval(()=>getFiles(callback), 5000);
    
    return () => {
      clearInterval(interval);
      subscriptionToken.unsubscribe();
    };
  }, [props.location.pathname]); //vad useEffect håller koll på

  if (!userToken) {
    return <Redirect to="/auth" />; //om usertoken är false redirectas vi till inlognings sida.
  }

  return (
    <>
      <main>
        <Path />
        <ItemList files={files} cb={callback} />
        <AddItem cb={callback} />
      </main>
    </>
  );



}
export default Home;