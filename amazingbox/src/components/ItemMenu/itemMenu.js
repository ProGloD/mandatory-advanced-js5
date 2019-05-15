import React, {useState} from "react";
import "../../css/itemMenu.css";
import PopUp from "./popUp"

function ItemMenu(props) {            
    const [id, upDateId] = useState(''); //skickar med id:et för den knappen du tryckt på nere på rad 23ish
    const [showPop, updateShowPop] = useState(false);
    
    function onClick(event) {
        upDateId(event.target.id);
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
            {showPop ? <PopUp className="showPop" file={props.file} cb={props.cb} showState={updateShowPop} sendId={id} /> : null}  
        </div>
    )  
}

export default ItemMenu;