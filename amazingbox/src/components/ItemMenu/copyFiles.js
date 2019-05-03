import React, {useReducer, useState} from "react";
import Dropbox from "dropbox";
import fetch from "isomorphic-fetch";
import { token$, updateToken } from "../store/authToken";

//importera pathen genom store?? Bättre?

const CopyFilesAndFolders = () =>{
    const [target, updateTarget] = useState(undefined); //filen jag vill kopiera
    let dbx = new Dropbox.Dropbox({ fetch, accessToken: userToken });

    function copyTarget(){
        dbx
            .filesCopy({path:`${{/*path*/}}/${{/*filename*/}}`})
                .then((response)=>{
                    console.log(response);
                    //props.updatefiles();
                })
    }

    //skippa input och bara döpan kopian till copy??
    return(
        <form onSubmit={copyTarget}>
            <input type="text" required></input> 
            <span>  
                <button type="submit"></button>
                <button>Cancle</button>
            </span>
        </form>
    )
}
export default CopyFilesAndFolders;