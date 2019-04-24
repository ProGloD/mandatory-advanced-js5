import React from "react";
import Dropbox from "dropbox";


let key = "kvms35pmp4vwz5n";

let dbx = new Dropbox.Dropbox({clientId:key});
var authUrl = dbx.getAuthenticationUrl('http://localhost:3000');

const Login = ()=>{

    return(
        <>  
            <a href={authUrl}>Login</a>
        </>
        
    );
}

export default Login;