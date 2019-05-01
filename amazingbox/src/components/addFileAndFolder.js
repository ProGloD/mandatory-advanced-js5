import React, {useReducer, useState} from "react";
import { Redirect } from "react-router-dom";
import Dropbox from "dropbox";
import fetch from "isomorphic-fetch";
import { token$, updateToken } from "../store/authToken";



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
    const [state, dispatch] = useReducer(reducer, {showMenu: false, showCreateFolder: false});
    const [userToken, updateUserToken] = useState(token$.value);


    function onFileChange(e){ //flytta till reducer
        console.log(props.path);
        console.log(e.target.files);

        let array = Array.from(e.target.files)
        
        
        let dbx = new Dropbox.Dropbox({ fetch, accessToken: userToken });


        for(let file of array){
            console.log(props.path, file);

            dbx
            .filesUpload({path: `${props.path}/${file.name}`, contents: file})
                .then((response)=>{
                    console.log(response);
                    props.updateFiles();
                }) 
        }
    }

    function createFolder(){ //flytta till reducer
        let dbx = new Dropbox.Dropbox({ fetch, accessToken: userToken });
        dbx
        .filesCreateFolder({path: `${props.path}/${/*folder name*/}`})
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
                    <input type="text" onChange={dispatch({type: "input_change", value: e.target.value})} required></input>
                    <span className="modal__shadow__container__buttonBox">
                        <button className="modal__shadow__container__buttonBox__button" onClick={dispatch({type: "create_folder"})}>Create</button>
                        <button className="modal__shadow__container__buttonBox__button" onClick={dispatch({type: "cancle_folder"})}>Cancle</button>
                    </span>
                </div>
            </div> : null}

            {state.showMenu? <div><input type="file" multiple onChange={onFileChange}></input><button>Create folder</button></div>: null}
            <button onClick={()=>dispatch({type:"showMenu"})}>Add</button>
        </div>
    )
}
export default AddFileButton;