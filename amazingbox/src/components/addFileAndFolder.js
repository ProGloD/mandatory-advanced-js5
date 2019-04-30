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
    const [state, dispatch] = useReducer(reducer, {showMenu: false,});
    const [userToken, updateUserToken] = useState(token$.value);


    function onFileChange(e){
        console.log(props.path);
        console.log(e.target.files);

        let array = Array.from(e.target.files)
        
        
        let dbx = new Dropbox.Dropbox({ fetch, accessToken: userToken });


        for(let file of array){
            console.log(props.path, file);

            dbx
            .filesUpload({path: `${props.path}/${file.name}`, contents: file})
                .then((respons)=>{
                    console.log(respons);
                    props.updateFiles();
                }) 
        }
    }

    function createFolder(){
        
    }

    return(
        <div>
            {state.showMenu? <div><input type="file" multiple onChange={onFileChange}></input><button>Add folder</button></div>: null}
            <button onClick={()=>dispatch({type:"showMenu"})}>Add</button>
        </div>
    )
}
export default AddFileButton;