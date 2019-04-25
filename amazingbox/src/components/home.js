import React from "react";
import { Redirect } from "react-router-dom";

import { token$ } from "../store/authToken";

const Home = () => {
  const token = token$.value;

  if (!token) {
    return <Redirect to="/auth" />;
  }

  return (
    <div>
      <p>Home</p>
    </div>
  );
};
export default Home;
