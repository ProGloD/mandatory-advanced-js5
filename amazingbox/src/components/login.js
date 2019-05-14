import React from "react";
import { Redirect } from "react-router-dom";
import "../css/login.css"
import { login } from "../utils";
import { token$ } from "../store/authToken";

function Login() {
  if (token$.value) {
    return <Redirect to="/" />;
  }

  let auth = login();

  return (
    <div className="login">
              <img
            src="/images/Dropbox_Windows.png"
            width={24}
            alt="Dropbox Logo"
          />
      <a href={auth} className="login_link">
        <button className="login_link_button">
          Login using Dropbox{" "}
        </button>
      </a>
    </div>
  );
}

export default Login;
