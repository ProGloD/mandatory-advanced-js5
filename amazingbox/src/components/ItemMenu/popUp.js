import React, {useState} from "react";
import {remove, getAllFiles, move, submitRename, copyTarget} from "../../utils";
import "./menuPopUp.css";
import {path$} from "../../store/path";

function PopUp(props) {
    const [name, updateName] = useState(props.file.name); 
    const [folders, updateFolders] = useState(null);
    const {file, cb, showState} = props;
    const [errorMsg, updateErrorMsg] = useState("");
    
     function closePop() { //stäner popup-rutan när kommandot är klart
         showState(false)
     }

     function rename(event){ //sparar värdet från inputet för rename
         updateName(event.target.value);
     }

     function checkPath(folder) {  //förfinar displayen av alla move-alternativen, behövs ens denna längre?
        let arr = folder.path_display.split("/");
        arr.pop();

        if(arr.length === 1){
            return <>
                <p className="move-filePathLower">/</p><p className="move-fileName">{folder.name}</p>
            </>;  
        } else {
            return <>
                <p className="move-filePathLower">{`${arr.join("/")}/`}</p><p className="move-fileName">{folder.name}</p>
            </>;
        }
     }
    
    
    if(props.sendId === "rename"){
         return(
             <div className="popUp">
                 <div className="popUp-content">
                     <button onClick={closePop} className="popUp-content-btn">&times;</button>
                     <form onSubmit={(event) =>{
                        event.preventDefault();
                        submitRename(file.path_lower, `${path$.value}/${name}`, cb, updateErrorMsg);
                        closePop();
                        }}
                         className="popUp-content-box">
                         {errorMsg ? <p style={{color: "red"}}>Filename has already been taken</p> : <p>Rename item</p>}
                         <p>{file.name}</p>
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
                         <h4>{file.name}</h4>
                         <p>Select where to move item</p>  
                         <ul className="move-ul">
                             <li className="move-li move-fileName" onClick={()=>move(file.path_lower, `/${file.name}`, cb)}>AmazingBox</li>
                             {!folders ? getAllFiles(updateFolders) : folders.map(folder=>{
                                 return file.name === folder.name ? null : <li className="move-li" key={folder.id} onClick={() => move(file.path_lower, `${folder.path_lower}/${file.name}`, cb)}>{checkPath(folder)}</li>
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
                         <button onClick={()=> remove(file.path_lower, cb)}>Yes</button>
                         <button onClick={closePop}>Cancel</button>
                     </div>
                 </div>
             </div>
             ) 
         }
         else if(props.sendId === "copy"){
             return(
                 <div className="popUp">
                 <div className="popUp-content">
                     <button onClick={closePop} className="popUp-content-btn">&times;</button>
                     <div className="popUp-content-box">
                        <p>Are you sure you wanna copy this item?</p>
                         <form onSubmit={(event)=> {
                             event.preventDefault();
                             copyTarget(file.path_lower, `${path$.value}/${file.name}`, cb)
                            }}>
                            <span>
                                <button className="copyButtons" type="submit">
                                    Copy
                                </button>
                            </span>
                        </form>
                     </div>
                 </div>
           </div>
             )
         }
    }

export default PopUp;


