import React from "react";
import PopUp from "./menuPopUp";

function itemMenu() {
    
    function rename(e) {
        <PopUp clickedBtn={e} />
    }
    function move(e) {
        <PopUp clickedBtn={e}/>
    }
    function remove(e) {
        <PopUp clickedBtn={e}/>
    }
    
    return(
        <div>
            <button key="rename" onClick={rename}>Rename</button>
            <button key="move" onClick={move}>Move</button>
            <button key="remove" onClick={remove}>Remove</button>
        </div>
    )
}

export default itemMenu;