import React, {useState} from "react";
import "./menuPopUp.css";

let PopUp = (props) => {
    const [name, updateName] = useState(props.name); 
    let itemName = props.name; 
    
    function closePop() {
        props.showState(false)
    }

    function rename(e){
        updateName(e.target.value);

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
                            <option>hej</option>
                            <option>då</option>
                        </select>
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
                        <p>Are U sure U wanna remove this item?</p>
                        <button>Yes</button>
                        <button>Cancel</button>
                    </div>
                </div>
            </div>
            ) 
        }
    }

export default PopUp;