import React, {useState} from "react";
import "./itemMenu.css";
import ShowPop from "./menuPopUp"

function ItemMenu(props) {            
    const [id, upDateId] = useState(''); //skickar med id:et för den knappen du tryckt på nere på rad 23ish
    const [showPop, updateShowPop] = useState(false);
    
    function onClick(e) {
        upDateId(e.target.id);
        !showPop ? updateShowPop(true) : updateShowPop(false)     //function som ändrar state för en popup-ruta   
    }
    

    return(
        <div>
            <div className="itemMenu">
                <button onClick={onClick} className="itemMenu-button openfirst" id="rename" >Rename</button>
                <button onClick={onClick} className="itemMenu-button opensecond" id="move" >Move</button>
                <button onClick={onClick} className="itemMenu-button openthird" id="remove" >Remove</button>
                <button onClick={onClick} className="itemMenu-button openfourth" id="copy" >Copy</button>
            </div>
            {showPop ? <ShowPop  file={props.file} updateFiles={props.updateFiles} showState={updateShowPop}  className="showPop" sendId={id} /> : null}  
        </div>

    )  
}

export default ItemMenu;