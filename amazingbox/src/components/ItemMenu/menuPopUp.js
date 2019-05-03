import React, {useState} from "react";
import "./menuPopUp.css";

let PopUp = (props) => {
    console.log(props.name);
    console.log(props.list);
    
    const [name, updateName] = useState(props.name); 
    let itemName = props.name; 
    
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
                        <select>
                            <option>{props.name}</option>
                            <option>då</option>
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