import React from "react";
import { Redirect } from "react-router-dom";
import Dropbox from "dropbox";
import fetch from "isomorphic-fetch";

import { token$ } from "../store/authToken";

let key = "kvms35pmp4vwz5n";

let dbx = new Dropbox.Dropbox({ fetch, clientId: key });
let authUrl = dbx.getAuthenticationUrl("http://localhost:3000/auth-done");

const Login = () => {
  if (token$.value) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <a href={authUrl}>
        <button>
          Login using Dropbox{" "}
          <img
            src="/images/Dropbox_Windows.png"
            width={24}
            alt="Dropbox Logo"
          />
        </button>
      </a>
    </>
  );
};

export default Login;
