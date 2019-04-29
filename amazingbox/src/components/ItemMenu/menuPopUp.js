import react from "react";

let PopUp = (props) => {
    let content = () => {
        if(props.key === rename){
            return(
                <p>hej</p>
            )   
    } 
}

    return (
        <div className="popup">
            <div className="popup-container">
                <button className="popup-container-closeBtn">&times;</button>
                {content}
            </div>
        </div>
    )
}

export default PopUp;