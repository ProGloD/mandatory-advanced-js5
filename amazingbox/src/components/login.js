import React from "react";
import { Redirect } from "react-router-dom";

import { login } from "../utils";
import { token$ } from "../store/authToken";

function Login() {
  if (token$.value) {
    return <Redirect to="/" />;
  }

  let auth = login();

  return (
    <>
      <a href={auth}>
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
}

export default Login;
