import React, {useState} from "react";
import "./menuPopUp.css";
import {token$} from "../../store/authToken";
import Dropbox from "dropbox";
import fetch from "isomorphic-fetch";
import CopyFilesAndFolders from "./copyFiles"
import {remove, getFiles} from "../../utils";


let PopUp = (props) => {    
    console.log(props)
    const [name, updateName] = useState(props.file.name); 
    const [files, updateFiles] = useState([]);
    const [errorMsg, updateErrorMsg] = useState("");
    let itemName = props.file.name; 
    let dbx = new Dropbox.Dropbox({ fetch, accessToken: token$.value}); // taborrt sen när alla functioner är borta 
    
    function closePop() { //stäner popup-rutan när kommandot är klart
        props.showState(false)
    }

    function rename(e){ //sparar värdet från inputet för rename
        updateName(e.target.value);
    }

    function move(toPath){ //SKA FLYTTAS TILL UTILS
        console.log(`FROM: ${props.file.path_lower}`,`TO:${toPath}`);
        
        dbx
        .filesMove({from_path:`${props.file.path_lower}`, to_path: `${toPath}`, autorename: true})
        .then(_=> props.updateFiles())
        .catch(error => console.log(error));
    }

    function getAllFiles(){ //SKA FLYTTAS TILL UTILS
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


    function submitRename(event){ //SKA FLYTTAS TILL UTILS
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

    function checkPath(path) {  //förfinar displayen av alla move-alternativen, behövs ens denna längre?
        if(path.path_lower !== path.name){
            let splitPath = path.path_display.split(`${path.name}`);         
            
            return(
                <>
                  <p className="move-filePathLower">{splitPath}</p><p className="move-fileName">{path.name}</p>  
                </>
            )
        }
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
                            <li className="move-li move-fileName" onClick={()=>move(`/${props.file.name}`)}>AmazingBox</li>
                            {files.length === 0 ? getAllFiles() : files.map(file=>{
                                return itemName === file.name ? null : <li className="move-li" key={file.id} onClick={() => move(`${file.path_lower}/${props.file.name}`)}>{checkPath(file)}</li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        ) 
    }else if(props.sendId === "remove"){
        
            function cbGetFiles(newFiles){ //används för att uppdatera files efter remove
                props.updateFiles(newFiles)
            }
      
        return(
            <div className="popUp">
                <div className="popUp-content">
                    <button onClick={closePop} className="popUp-content-btn">&times;</button>
                    <div className="popUp-content-box">
                        <p>Are you sure you wanna delete this item?</p>
                        <button onClick={()=> remove(cbGetFiles, getFiles, props.file.path_lower)}>Yes</button>
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
                        <CopyFilesAndFolders file={props.file} /*updateFiles={props.updateFiles}*/></CopyFilesAndFolders>
                    </div>
                </div>
            </div>
            )
        }
    }

export default PopUp;


