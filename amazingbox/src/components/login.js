import React from "react";
import Dropbox from "dropbox";

let key = "kvms35pmp4vwz5n";

let dbx = new Dropbox.Dropbox({ clientId: key });
var authUrl = dbx.getAuthenticationUrl("http://localhost:3000/auth-done");

const Login = () => {
  return (
    <>
      <a href={authUrl}>
        <button>Login using Dropbox</button>
      </a>
    </>
  );
};

export default Login;
