import React, { useEffect, useState} from "react";
import "./menuPopUp.css";
import {token$, updateToken} from "../../store/authToken";
import Dropbox from "dropbox";
import fetch from "isomorphic-fetch";

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

    function move(e){
        console.log('move');
        console.log(props.path);
        console.log(props.files);
        console.log(select);



       /* dbx
        .filesMove({from_path:`/${props.path}`}, {to_path: `${select}`}) // funkar inte
            .then(response=>{
                console.log(response);
                props.updateFiles();
            })*/
    }

    function remove() {
        console.log('remove');
        
    }
    
        if(props.sendId === "rename"){
            return(
                <div className="popUp">
                    <div className="popUp-content">
                        <button onClick={closePop} className="popUp-content-btn">&times;</button>
                        <form onSubmit={rename} className="popUp-content-box">
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
                        <p>Select where to move item</p>
                        <select className="moveItemList" onChange={(e)=> {updateSelect(e.target.value); console.log(select)}}>
                            {props.files.map(function moveFunc (file) {
                                let number = Math.random();         //unique key to moveSelections
                                number.toString(36);
                                let id = number.toString(36).substr(2, 9); 

                                let dbx = new Dropbox.Dropbox({ fetch, accessToken: userToken });    
                                dbx
                                    .filesListFolder({ path: "" })
                                    .then(function(response) {
                                        let getFolder = response.entries;
                                       // getFolder.map()
                                        
                                    })

                                return(
                                    file[".tag"] === "folder"? <option className="moveItemList-option" key={id} value={file.path_lower}>{file.name}</option> : null 
                                )  
                            })}
                        </select>
                        <button onClick={move}>Move</button>
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
                        <button onClick={remove}>Yes</button>
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
                        <p>Are you sure you wanna Copy this item?</p>

                    </div>
                </div>
            </div>
            )
        }
    }

export default PopUp;