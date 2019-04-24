import React, {useState} from "react";
import {Redirect} from "react-router-dom";

const Home =()=>{
    const [auth, updateAuth] = useState(false);



    if (!auth){
        return <Redirect to="/auth" />
    }


    return(
        <div>
            <p>Home</p>
        </div>
    )
}
export default Home;