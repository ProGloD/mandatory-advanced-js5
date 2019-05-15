import React, { useEffect, useState } from "react";
import { favorite$ } from "../store/favoriteStore";
import ItemList from "./itemList";
import { Helmet } from "react-helmet";


function Favorites(props) {    
  const [favorites, updateUserFavorite] = useState(favorite$.value);  

  useEffect(() => { //här håller useEffect koll på våra filer. Den koller vilken sorts fil det är.
    let subscription = favorite$.subscribe(favorite => {
        updateUserFavorite(favorite);
    });

    return () => {
        subscription.unsubscribe();
    };
  }, []);  

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