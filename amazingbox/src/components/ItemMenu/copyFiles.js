import React, {useReducer, useState} from "react";
import Dropbox from "dropbox";
import fetch from "isomorphic-fetch";
import { token$, updateToken } from "../../store/authToken";

//importera pathen genom store?? Bättre?

const CopyFilesAndFolders = (props) =>{
    console.log(token$);
    console.log(props.path);
    console.log(props.name);
    const [target, updateTarget] = useState(undefined); //filen jag vill kopiera
    const [userToken, updateUserToken] = useState(token$.value); 
    let dbx = new Dropbox.Dropbox({ fetch, accessToken: userToken });

    function copyTarget(e){
        e.preventDefault();
        dbx
            .filesCopy({path:`${props.path}/${props.name}`})
                .then((response)=>{
                    console.log(response);
                    props.updatefiles();
                })
    }

    //skippa input och bara döpan kopian till copy??
    return(
        <form onSubmit={copyTarget}>

            <span>  
                <button type="submit">Copy</button>
                <button>Cancle</button>
            </span>
        </form>
    )
}
export default CopyFilesAndFolders;