import React, {useReducer, useState} from "react";
import Dropbox from "dropbox";
import fetch from "isomorphic-fetch";
import { token$, updateToken } from "../../store/authToken";
import "./copyFiles.css";

//importera pathen genom store?? Bättre?

const CopyFilesAndFolders = (props) =>{
    const [target, updateTarget] = useState(undefined); //filen jag vill kopiera
    const [userToken, updateUserToken] = useState(token$.value); 
    let dbx = new Dropbox.Dropbox({ fetch, accessToken: userToken });

    function copyTarget(e){
        e.preventDefault();
        dbx
            .filesCopy({from_path:`${props.file.path_lower}`, to_path:`${props.path}/${props.file.name}`, autorename:true})
                .then((response)=>{
                    console.log(response);
                    props.updateFiles();
                })
    }

    //skippa input och bara döpan kopian till copy??
    return(
        <form onSubmit={copyTarget}>

            <span>  
                <button className="copyButtons" type="submit">Copy</button>
                
            </span>
        </form>
    )
}
export default CopyFilesAndFolders;