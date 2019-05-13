import React from "react";

import { logout } from "../utils";

function Logout() {
  return (
    <button className="logout-button" onClick={logout}>
      Log out
    </button>
  );
}

export default Logout;
