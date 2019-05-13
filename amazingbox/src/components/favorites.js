import React, { useEffect, useState } from "react";
import { favorite$, updateFavorite } from "../store/favoriteStore";
import ItemList from "./itemList";

function Favorites(props) {
  console.log(props);  
  const [favorites, updateFavorite] = useState(favorite$.value);  

  function renderFavorites(favoriteItem) {
      return(
        <td>{favoriteItem.name}</td>
      );
  }
  return (
    <>
        {favorites.map(favorite => (
            <tr>
                {renderFavorites(favorite)}
            </tr>
        ))} 
    </>
  );
}

export default Favorites;