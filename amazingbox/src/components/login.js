import React from "react";
import Dropbox from "dropbox";
import fetch from "isomorphic-fetch";

let key = "kvms35pmp4vwz5n";

let dbx = new Dropbox.Dropbox({ fetch, clientId: key });
let authUrl = dbx.getAuthenticationUrl("http://localhost:3000/auth-done");

const Login = () => {
  return (
    <>
      <a href={authUrl}>
        <button>Login using Dropbox <img src="/images/Dropbox_Windows.png" width={24} alt="Dropbox Logo" ></img></button>
      </a>
    </>
  );
};

export default Login;
