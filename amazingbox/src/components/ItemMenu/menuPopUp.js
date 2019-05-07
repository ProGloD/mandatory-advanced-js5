import React, { useEffect, useState} from "react";
import "./menuPopUp.css";
import {token$, updateToken} from "../../store/authToken";
import Dropbox from "dropbox";
import fetch from "isomorphic-fetch";


import CopyFilesAndFolders from "./copyFiles"

let PopUp = (props) => {    
    
    const [name, updateName] = useState(props.name); 
    const [select, updateSelect] = useState("");
    const [userToken, updateUserToken] = useState(token$.value); 
    
    let itemName = props.name;     
    
    function closePop() {
        props.showState(false)
    }

    function rename(e){
        updateName(e.target.value);
    }

    function submitRename(event){
        event.preventDefault();        
        let dbx = new Dropbox.Dropbox({ fetch, accessToken: userToken });
        dbx
        .filesMove({from_path: `${props.path}/${itemName}`, to_path: `${props.path}/${name}`})
        .then(function(response) {
            props.updateFiles();
        })
    }
    
        if(props.sendId === "rename"){
            return(
                <div className="popUp">
                    <div className="popUp-content">
                        <button onClick={closePop} className="popUp-content-btn">&times;</button>
                        <form onSubmit={submitRename} className="popUp-content-box">
                            <p>Rename item</p>
                            <p>{itemName}</p>
                            <input onChange={rename} placeholder="New name"/>
                            <button type="submit">Ok</button>
                        </form>
                    </div>
                </div>
            ) 
    }else if(props.sendId === "move"){
        return(
            <div className="popUp">
                <div className="popUp-content">
                    <button onClick={closePop} className="popUp-content-btn">&times;</button>
                    <div className="popUp-content-box">
                        <ul>
                            <li></li>
                        </ul>

                        <button>Move</button>
                    </div>
                </div>
            </div>
        ) 
    }else if(props.sendId === "remove"){
        return(
            <div className="popUp">
                <div className="popUp-content">
                    <button onClick={closePop} className="popUp-content-btn">&times;</button>
                    <div className="popUp-content-box">
                        <p>Are you sure you wanna remove this item?</p>
                        <button onClick={props.remove}>Yes</button>
                        <button onClick={closePop}>Cancel</button>
                    </div>
                </div>
            </div>
            ) 
        }else if(props.sendId === "copy"){
            return(
                <div className="popUp">
                <div className="popUp-content">
                    <button onClick={closePop} className="popUp-content-btn">&times;</button>
                    <div className="popUp-content-box">
                        <p>Are you sure you wanna copy this item?</p>
                        <CopyFilesAndFolders path={props.path} name={props.name} updateFiles={props.updateFiles}></CopyFilesAndFolders>
                    </div>
                </div>
            </div>
            )
        }
    }

export default PopUp;