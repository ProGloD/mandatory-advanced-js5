import React, { useEffect, useState } from "react";
import { favorite$ } from "../store/favoriteStore";
import ItemList from "./ItemList";
import { Helmet } from "react-helmet";
import { token$ } from "../store/authToken";
import { Redirect } from "react-router-dom";


function Favorites(props) {    
  const [userToken, updateUserToken] = useState(token$.value);
  const [favorites, updateUserFavorite] = useState(favorite$.value);  

  useEffect(() => { //här håller useEffect koll på våra filer. Den koller vilken sorts fil det är.
    let subscription = favorite$.subscribe(favorite => {
        updateUserFavorite(favorite);
    });
    let subscriptionToken = token$.subscribe(token => {
        updateUserToken(token);
    });

    return () => {
        subscriptionToken.unsubscribe();
        subscription.unsubscribe();
    };
  }, []);  


  if (!userToken) {
    return <Redirect to="/auth" />; //om usertoken är false redirectas vi till inlognings sida.
  }

  return (
    <> 
      <Helmet>
        <title>AmazingBox/Favorites</title>
      </Helmet>
      <ItemList files={favorites}/>
    </>
  );
}

export default Favorites;