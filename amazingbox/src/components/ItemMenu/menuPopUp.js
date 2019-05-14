import React, { useEffect, useState} from "react";
import "./menuPopUp.css";
import {token$, updateToken} from "../../store/authToken";
import Dropbox from "dropbox";
import fetch from "isomorphic-fetch";
import CopyFilesAndFolders from "./copyFiles"


let PopUp = (props) => {    
        console.log(props.file);
    const [name, updateName] = useState(props.file.name); 
    const [files, updateFiles] = useState([]);
    const [errorMsg, updateErrorMsg] = useState("");
    let itemName = props.file.name; 
    let dbx = new Dropbox.Dropbox({ fetch, accessToken: token$.value});
    
    function closePop() {
        props.showState(false)
    }

    function rename(e){
        updateName(e.target.value);
    }

    function move(toPath){
        console.log(`FROM: ${props.file.path_lower}`,`TO:${toPath}`);
        
        dbx
        .filesMove({from_path:`${props.file.path_lower}`, to_path: `${toPath}`, autorename: true})
        .then(_=> props.updateFiles())
        .catch(error => console.log(error));
    }

    function getAllFiles(){
        dbx
            .filesListFolder({path: "", recursive: true})
                .then(response=>{
                        let files = response.entries;
                    updateFiles(files.filter(element => element[".tag"] === "folder").sort((a,b) => a.path_lower.localeCompare(b.path_lower)));                    
                })
            .catch(error=>{
                console.log(error);
            })
    }


    function submitRename(event){
        event.preventDefault();        
        dbx
        .filesMove({from_path: `${props.file.path_lower}`, to_path: `${props.path}/${name}`})
        .then(function(response) {            
        props.updateFiles();
        })
        .catch(function(error) {
        updateErrorMsg(error)
        })
    }

    function checkPath(path) {
        console.log(path);

        return(
            <p>hej</p>
        )
        
    }
    
        if(props.sendId === "rename"){
            return(
                <div className="popUp">
                    <div className="popUp-content">
                        <button onClick={closePop} className="popUp-content-btn">&times;</button>
                        <form onSubmit={submitRename} className="popUp-content-box">
                            {errorMsg ? <p style={{color: "red"}}>Filename has already been taken</p> : <p>Rename item</p>}
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
                    <div className="popUp-content-box move-div">
                        <h4>{itemName}</h4>
                        <p>Select where to move item</p>
                        <ul className="move-ul">
                            <li className="move-li" onClick={()=>move(`/${props.file.name}`)}>AmazingBox</li>
                        {files.length === 0? getAllFiles() : files.map(file=>{
                            return <li className="move-li" key={file.id} onClick={() => move(`${file.path_lower}/${props.file.name}`)}>{checkPath(file)}</li>
                        })}
                        </ul>
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
                        <p>Are you sure you wanna delete this item?</p>
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
                        <CopyFilesAndFolders /*path={props.path}*/ file={props.file} /*updateFiles={props.updateFiles}*/></CopyFilesAndFolders>
                    </div>
                </div>
            </div>
            )
        }
    }

export default PopUp;


