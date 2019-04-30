import React, {setState} from "react";
import "./itemMenu.css";

function ItemMenu() {
    
    function rename(e) {   
        console.log('rename');
             
        return (
            <div className="popup">
                <div className="popup-container">
                    <button className="popup-container-closeBtn">&times;</button>
                    <form>
                        <input placeholder="New name"></input>
                        <button>Ok!</button>
                    </form>
                </div>
            </div>
        )
        
    }
    function move(e) {
        console.log('move');
        
        return (
            <div className="popup">
                <div className="popup-container">
                    <button className="popup-container-closeBtn">&times;</button>
                    <div>

                    </div>
                </div>
            </div>
        )
        
    }
    function remove(e) {
        console.log('remove');
        
        return (
            <div className="popup">
                <div className="popup-container">
                    <button className="popup-container-closeBtn">&times;</button>
                    <div>

                    </div>
                </div>
            </div>
        )
        
    }
    
    return(
        <div className="itemMenu">
            <button className="itemMenu-button" id="rename" onClick={rename}>Rename</button>
            <button className="itemMenu-button" id="move" onClick={move}>Move</button>
            <button className="itemMenu-button" id="remove" onClick={remove}>Remove</button>
        </div>
    )
}

export default ItemMenu;