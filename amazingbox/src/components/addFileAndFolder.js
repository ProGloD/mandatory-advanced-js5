import React, {useReducer, useState} from "react";
import Dropbox from "dropbox";
import fetch from "isomorphic-fetch";
import { token$, updateToken } from "../store/authToken";

function reducer(state, action){
    switch(action.type){
        case "showMenu": //toggle addMenu
        return{
            ...state,
            showMenu: !state.showMenu? true : false,
            showCreateFolder: false,
            inputValue: ""
        };

        case "show_create_folder": //show input for adding folder
            console.log(state);
        return{
            ...state,
            showCreateFolder: true,
        }

        case "cancle_folder": //cancle input for foler 
        return{
            ...state,
            showCreateFolder: false,
            inputValue: ""
        }
    }
}


let AddFileButton = (props)=>{
    const [state, dispatch] = useReducer(reducer, {showMenu: false, showCreateFolder: false, inputValue: ""});
    const [userToken, updateUserToken] = useState(token$.value); 
    
    let dbx = new Dropbox.Dropbox({ fetch, accessToken: userToken });

    function onFileChange(e){ //flytta till reducer
        let array = Array.from(e.target.files)
        for(let file of array){
            dbx
            .filesUpload({path: `${props.path}/${file.name}`, contents: file})
                .then((response)=>{
                    console.log(response);
                    props.updateFiles();
                }) 
        }
    }

    function createFolder(){ //flytta till reducer, får fel i reducer, kolla med andreas
        dbx
        .filesCreateFolder({path: `${props.path}/${state.inputValue}`}) //add folder name 
            .then((response)=>{
                console.log(response);
                props.updateFiles();
            })
    }

    return(
        <div>
            {state.showCreateFolder? 
            <div className="modal__shadow">
                <div className="modal__shadow__container">
                    <input type="text" onChange={(e)=> {state.inputValue = e.target.value; console.log(state.inputValue)}} required></input>
                    <span className="modal__shadow__container__buttonBox">
                        <button className="modal__shadow__container__buttonBox__button" onClick={createFolder}>Create</button>
                        <button className="modal__shadow__container__buttonBox__button" onClick={()=>dispatch({type: "cancle_folder"})}>Cancle</button>
                    </span>
                </div>
            </div> : null}

            {state.showMenu? <div><input type="file" multiple onChange={onFileChange}></input><button onClick={()=>dispatch({type: "show_create_folder"})}>Create folder</button></div>: null}
            <button onClick={()=>dispatch({type:"showMenu"})}>Add</button>
        </div>
    )
}
export default AddFileButton;