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
                <button onClick={onClick} className="itemMenu-button openfirst" id="rename" >Rename</button>
                <button onClick={onClick} className="itemMenu-button opensecond" id="move" >Move</button>
                <button onClick={onClick} className="itemMenu-button openthird" id="remove" >Remove</button>
                <button onClick={onClick} className="itemMenu-button openfourth" id="copy" >Copy</button>

            </div>
            {showPop ? <ShowPop list={props.list} file={props.file} path={props.path} showState={updateShowPop} updateFiles={props.updateFiles} className="showPop" sendId={id} remove={props.remove} /> : null}
        </div>

    )  
}

export default ItemMenu;