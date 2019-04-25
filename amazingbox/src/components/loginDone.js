import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import { token$, updateToken } from "../store/authToken";
import { parseQueryString } from "../utils";

const LoginDone = () => {
  let [token, update] = useState(token$.value);

  useEffect(() => {
    let subscription = token$.subscribe(token => {
      update(token);
    });

    updateToken(parseQueryString(window.location.hash).access_token);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (token) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <p>Success!</p>
      <span className="material-icons">check</span>
    </>
  );
};

export default LoginDone;
