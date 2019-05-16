import React, {useState, useEffect} from "react";
import {Redirect} from "react-router-dom";
import Search from "./Search";
import ItemList from "./ItemList";
import { token$ } from "../store/authToken";

function SearchView(){
    const [userToken, updateUserToken] = useState(token$.value);
    const[files, updateFiles]=useState([]);

    useEffect(() => {
        let subscriptionToken = token$.subscribe(token => {
            updateUserToken(token);
        });

        return () => {
            subscriptionToken.unsubscribe();
        };
    }, [])
    
    if (!userToken) {
        return <Redirect to="/auth" />; //om usertoken är false redirectas vi till inlognings sida.
    }
    return<>
        <Search cb={updateFiles} />
        <ItemList files={files} />
    </>;
}

export default SearchView;