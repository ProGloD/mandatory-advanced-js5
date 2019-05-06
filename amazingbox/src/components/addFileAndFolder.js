import React, {useReducer} from "react";
import { Redirect } from "react-router-dom";
import Dropbox from "dropbox";
import fetch from "isomorphic-fetch";

function reducer(state, action){
    switch(action.type){
        case "showMenu":
        return{
            ...state,
            showMenu: !state.showMenu? state.showMenu = true : state.showMenu = false,
        };
    }
}

let AddFileButton = (props)=>{
    const [state, dispatch] = useReducer(reducer, {showMenu: false,});



    return(
        <div className='add-menuContainer'>
            {state.showMenu? <div className='add-popupMenu'><button className='add-fileButton material-icons'>note_add</button><button className='add-folderButton material-icons'>create_new_folder</button></div>: null}
            <button className="add-icon material-icons" onClick={()=>dispatch({type:"showMenu"})}>add_circle_outline</button>
        </div>
    )
}
export default AddFileButton;