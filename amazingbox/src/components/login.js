import React from "react";
import { Redirect } from "react-router-dom";
import "../css/login.css"
import { login } from "../utils";
import { token$ } from "../store/authToken";
import { Helmet } from "react-helmet";


function Login() {
  if (token$.value) {
    return <Redirect to="/" />;
  }

  let auth = login();

  return (
    <div className="login">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <img
        src="https://www.mktv.mx/wp-content/uploads/2017/07/letter_sending.gif"
        width={400}
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
