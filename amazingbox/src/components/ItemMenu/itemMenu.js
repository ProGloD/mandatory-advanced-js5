import React, {useState} from "react";
import "./itemMenu.css";
import ShowPop from "./menuPopUp"

function ItemMenu(props) {
    
    const [id, upDateId] = useState('');
    const [showPop, updateShowPop] = useState(false);
    
    function onClick(e) {
        upDateId(e.target.id);
        !showPop ? updateShowPop(true) : updateShowPop(false)        
    }

    return(
        <div>
            <div className="itemMenu">
                <button onClick={onClick} className="itemMenu-button" id="rename" >Rename</button>
                <button onClick={onClick} className="itemMenu-button" id="move" >Move</button>
                <button onClick={onClick} className="itemMenu-button" id="remove" >Remove</button>
            </div>
            {showPop ? <ShowPop name={props.name} showState={updateShowPop} className="showPop" sendId={id} /> : null}

        </div>

    )  
}

export default ItemMenu;