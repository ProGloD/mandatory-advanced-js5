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
        <>
            {state.showMenu? <div><button>Add file</button><button>Add folder</button></div>: null}
            <button onClick={()=>dispatch({type:"showMenu"})}>Add</button>
        </>
    )
}
export default AddFileButton;