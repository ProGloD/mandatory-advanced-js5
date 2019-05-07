import React, {useState} from "react";
import Dropbox from "dropbox";
import "./menuPopUp.css";
import CopyFilesAndFolders from "./copyFiles"
import { token$, updateToken } from "../../store/authToken";

let PopUp = (props) => {
    console.log(props.name);
    console.log(props.list);
    console.log(props);
    
    const [name, updateName] = useState(props.name); 
    const [files, updateFiles] = useState([]);
    let itemName = props.name; 
    let dbx = new Dropbox.Dropbox({ fetch, accessToken: token$.value});
    
    function closePop() {
        props.showState(false)
    }

    function rename(e){
        updateName(e.target.value);
        console.log(name);
        
    }

    function move(){
        console.log('move');
        
    }

    function getAllFiles(){
        dbx
            .filesListFolder({path: "", recursive: true})
                .then(response=>{
                    console.log(response);
                        let files = response.entries
                    updateFiles(files);
                })
            .catch(error=>{
                console.log(error);
            })
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
                        <ul>
                        {files.length === 0? getAllFiles() : files.map(file=>{
                            if(file[".tag"] === "folder"){
                                return <li key={file.id}>{file.name}</li>
                            }
                        })}
                        </ul>
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
                        <CopyFilesAndFolders path={props.path} name={props.name} updateFiles={props.updateFiles}></CopyFilesAndFolders>
                    </div>
                </div>
            </div>
            )
        }
    }

export default PopUp;