import React, {useReducer, useState} from "react";
import Dropbox from "dropbox";
import fetch from "isomorphic-fetch";
import { token$} from "../store/authToken";

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

        case "cancel_folder": //cancle input for foler 
        return{
            ...state,
            showCreateFolder: false,
            inputValue: ""
        }
    }
}


let AddFileButton = (props)=>{
    const [state, dispatch] = useReducer(reducer, {showMenu: false, showCreateFolder: false, inputValue: ""}); 
    let dbx = new Dropbox.Dropbox({ fetch, accessToken: token$ });

    function onFileChange(e){ //flytta till reducer
        let array = Array.from(e.target.files)
        for(let file of array){
            dbx
            .filesUpload({path: `${props.path}/${file.name}`, contents: file})
                .then(_=>props.updateFiles())
                .catch(_=>{
                    //error
                })
        }
    }

    function createFolder(){ //flytta till reducer, får fel i reducer, kolla med andreas
        dbx
        .filesCreateFolder({path: `${props.path}/${state.inputValue}`, autorename: true}) //add folder name 
            .then(_=>props.updateFiles())
            .catch(_=>{
                //error
            })
    }

    return(
        <div className="add-menuContainer">
            {state.showCreateFolder? 
            <div className="modal__shadow">
                <div className="modal__shadow__container">
                    <input className="modal__shadow__input" type="text" spellCheck="false" onChange={(e)=> state.inputValue = e.target.value}  required></input>
                    <span className="modal__shadow__container__buttonBox">
                        <button className="modal__shadow__container__buttonBox__button" onClick={createFolder}>Create</button>
                        <button className="modal__shadow__container__buttonBox__button" onClick={()=>dispatch({type: "cancel_folder"})}>Cancel</button>
                    </span>
                </div>
            </div> : null}

            {state.showMenu ? <div className="add-popupMenu"><input className="add-fileButton material-icons" type="file" multiple onChange={onFileChange}></input>   
            <label className="custom-file-label material-icons openfirst" htmlFor="inputGroupFile01">insert_drive_file</label>
            <button className="add-folderButton material-icons opensecond" onClick={()=>dispatch({type: "show_create_folder"})}>create_new_folder</button></div> : null}
            <button className="add-button add-icon material-icons" onClick={()=>dispatch({type: "showMenu"})}>add_circle_outline</button>
        </div>
    )
}
export default AddFileButton;