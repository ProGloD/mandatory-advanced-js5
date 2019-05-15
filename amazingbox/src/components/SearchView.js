import React, {useState} from "react";

import Search from "./Search";
import ItemList from "./itemList";

function SearchView(){
    const[files, updateFiles]=useState([]);

    return<>
        <Search cb={updateFiles} />
        <ItemList files={files} />
    </>;
}

export default SearchView;